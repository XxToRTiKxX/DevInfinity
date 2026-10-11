from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload

from app.crud import tag as tag_crud
from app.crud.base import commit, get_or_raise, refresh
from app.models.project import Project, ProjectStatus
from app.models.tag import Tag
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectUpdate


def _with_tags():
    return select(Project).options(selectinload(Project.tags))


def list_projects(
    db: Session,
    *,
    status: ProjectStatus | None = None,
    tag: str | None = None,
    search: str | None = None,
    author_id: int | None = None,
    offset: int = 0,
    limit: int = 100,
) -> list[Project]:
    stmt = _with_tags()
    if status is not None:
        stmt = stmt.where(Project.status == status)
    if author_id is not None:
        stmt = stmt.where(Project.author_id == author_id)
    if search:
        pattern = f"%{search.strip()}%"
        stmt = stmt.where(
            or_(Project.title.ilike(pattern), Project.summary.ilike(pattern))
        )
    if tag:
        stmt = stmt.join(Project.tags).where(Tag.name == tag.strip())
    stmt = stmt.order_by(Project.created_at.desc()).offset(offset).limit(limit)
    return list(db.scalars(stmt).unique())


def get_project(db: Session, project_id: int) -> Project:
    stmt = _with_tags().where(Project.id == project_id)
    project = db.scalars(stmt).first()
    if project is None:
        get_or_raise(db, Project, project_id)
    return project


def _apply_tags(db: Session, project: Project, tag_names: list[str]) -> None:
    project.tags = [tag_crud.get_or_create_by_name(db, name) for name in tag_names if name.strip()]


def create_project(db: Session, payload: ProjectCreate) -> Project:
    get_or_raise(db, User, payload.author_id)
    data = payload.model_dump(exclude={"tags"})
    project = Project(**data)
    _apply_tags(db, project, payload.tags)
    db.add(project)
    commit(db)
    return get_project(db, project.id)


def update_project(db: Session, project_id: int, payload: ProjectUpdate) -> Project:
    project = get_or_raise(db, Project, project_id)
    data = payload.model_dump(exclude_unset=True, exclude={"tags"})
    for field, value in data.items():
        setattr(project, field, value)
    if payload.tags is not None:
        _apply_tags(db, project, payload.tags)
    commit(db)
    return get_project(db, project_id)


def delete_project(db: Session, project_id: int) -> None:
    project = get_or_raise(db, Project, project_id)
    db.delete(project)
    commit(db)
