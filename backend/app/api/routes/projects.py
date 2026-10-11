from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.crud import project as project_crud
from app.db.session import get_db
from app.models.project import ProjectStatus
from app.schemas.project import ProjectCreate, ProjectRead, ProjectUpdate

router = APIRouter(prefix="/projects", tags=["Проекты"])


@router.get("", response_model=list[ProjectRead])
def list_projects(
    db: Session = Depends(get_db),
    status_filter: ProjectStatus | None = Query(None, alias="status"),
    tag: str | None = Query(None, description="Фильтр по тегу"),
    search: str | None = Query(None, description="Поиск по названию и описанию"),
    author_id: int | None = Query(None, description="Фильтр по автору"),
    offset: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
) -> list[ProjectRead]:
    return project_crud.list_projects(
        db,
        status=status_filter,
        tag=tag,
        search=search,
        author_id=author_id,
        offset=offset,
        limit=limit,
    )


@router.post("", response_model=ProjectRead, status_code=status.HTTP_201_CREATED)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)) -> ProjectRead:
    return project_crud.create_project(db, payload)


@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: int, db: Session = Depends(get_db)) -> ProjectRead:
    return project_crud.get_project(db, project_id)


@router.patch("/{project_id}", response_model=ProjectRead)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
) -> ProjectRead:
    return project_crud.update_project(db, project_id, payload)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session = Depends(get_db)) -> None:
    project_crud.delete_project(db, project_id)
