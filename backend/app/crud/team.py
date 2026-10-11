from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.exceptions import ConflictError
from app.crud.base import commit, get_or_raise, refresh
from app.models.project import Project
from app.models.team import Team, TeamMember
from app.models.user import User
from app.schemas.team import TeamCreate, TeamMemberCreate, TeamUpdate


def _with_members():
    return select(Team).options(selectinload(Team.members))


def list_teams(
    db: Session,
    *,
    project_id: int | None = None,
    offset: int = 0,
    limit: int = 100,
) -> list[Team]:
    stmt = _with_members()
    if project_id is not None:
        stmt = stmt.where(Team.project_id == project_id)
    stmt = stmt.order_by(Team.id).offset(offset).limit(limit)
    return list(db.scalars(stmt).unique())


def get_team(db: Session, team_id: int) -> Team:
    stmt = _with_members().where(Team.id == team_id)
    team = db.scalars(stmt).first()
    if team is None:
        get_or_raise(db, Team, team_id)
    return team


def create_team(db: Session, payload: TeamCreate) -> Team:
    get_or_raise(db, Project, payload.project_id)
    team = Team(**payload.model_dump())
    db.add(team)
    commit(db)
    return get_team(db, team.id)


def update_team(db: Session, team_id: int, payload: TeamUpdate) -> Team:
    team = get_or_raise(db, Team, team_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(team, field, value)
    commit(db)
    return get_team(db, team_id)


def delete_team(db: Session, team_id: int) -> None:
    team = get_or_raise(db, Team, team_id)
    db.delete(team)
    commit(db)


def add_member(db: Session, team_id: int, payload: TeamMemberCreate) -> Team:
    team = get_or_raise(db, Team, team_id)
    get_or_raise(db, User, payload.user_id)
    exists = db.scalar(
        select(TeamMember).where(
            TeamMember.team_id == team_id,
            TeamMember.user_id == payload.user_id,
        )
    )
    if exists is not None:
        raise ConflictError("Пользователь уже состоит в этой команде")
    member = TeamMember(team_id=team_id, user_id=payload.user_id, role=payload.role)
    db.add(member)
    commit(db)
    return get_team(db, team.id)


def remove_member(db: Session, team_id: int, user_id: int) -> Team:
    team = get_or_raise(db, Team, team_id)
    member = db.scalar(
        select(TeamMember).where(
            TeamMember.team_id == team_id,
            TeamMember.user_id == user_id,
        )
    )
    if member is None:
        raise ConflictError("Этот пользователь не состоит в команде")
    db.delete(member)
    commit(db)
    return get_team(db, team_id)
