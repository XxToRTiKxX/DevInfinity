from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.exceptions import BusinessRuleError, ConflictError
from app.crud.base import commit, get_or_raise, refresh
from app.models.application import Application, ApplicationStatus
from app.models.project import Project
from app.models.team import Team, TeamMember
from app.models.user import User
from app.schemas.application import ApplicationCreate, ApplicationUpdate


def _with_applicant():
    return select(Application).options(joinedload(Application.applicant))


def list_applications(
    db: Session,
    *,
    project_id: int | None = None,
    user_id: int | None = None,
    status: ApplicationStatus | None = None,
    offset: int = 0,
    limit: int = 100,
) -> list[Application]:
    stmt = _with_applicant()
    if project_id is not None:
        stmt = stmt.where(Application.project_id == project_id)
    if user_id is not None:
        stmt = stmt.where(Application.user_id == user_id)
    if status is not None:
        stmt = stmt.where(Application.status == status)
    stmt = stmt.order_by(Application.created_at.desc()).offset(offset).limit(limit)
    return list(db.scalars(stmt).unique())


def get_application(db: Session, application_id: int) -> Application:
    stmt = _with_applicant().where(Application.id == application_id)
    application = db.scalars(stmt).first()
    if application is None:
        get_or_raise(db, Application, application_id)
    return application


def create_application(db: Session, payload: ApplicationCreate) -> Application:
    get_or_raise(db, Project, payload.project_id)
    get_or_raise(db, User, payload.user_id)
    duplicate = db.scalar(
        select(Application).where(
            Application.project_id == payload.project_id,
            Application.user_id == payload.user_id,
            Application.role == payload.role,
        )
    )
    if duplicate is not None:
        raise ConflictError("Заявка на эту роль в проекте уже подана")
    application = Application(**payload.model_dump(), status=ApplicationStatus.pending)
    db.add(application)
    commit(db)
    return get_application(db, application.id)


def update_application(
    db: Session,
    application_id: int,
    payload: ApplicationUpdate,
) -> Application:
    application = get_or_raise(db, Application, application_id)
    data = payload.model_dump(exclude_unset=True)
    new_status = data.get("status")

    if new_status is not None and new_status != application.status:
        if application.status != ApplicationStatus.pending:
            raise BusinessRuleError("Обработанную заявку нельзя изменить")

    for field, value in data.items():
        setattr(application, field, value)

    if new_status == ApplicationStatus.accepted:
        _add_accepted_member(db, application)

    commit(db)
    return get_application(db, application_id)


def delete_application(db: Session, application_id: int) -> None:
    application = get_or_raise(db, Application, application_id)
    db.delete(application)
    commit(db)


def _add_accepted_member(db: Session, application: Application) -> None:
    team = db.scalar(
        select(Team)
        .where(Team.project_id == application.project_id)
        .order_by(Team.id)
    )
    if team is None:
        return
    exists = db.scalar(
        select(TeamMember).where(
            TeamMember.team_id == team.id,
            TeamMember.user_id == application.user_id,
        )
    )
    if exists is None:
        db.add(
            TeamMember(
                team_id=team.id,
                user_id=application.user_id,
                role=application.role,
            )
        )
