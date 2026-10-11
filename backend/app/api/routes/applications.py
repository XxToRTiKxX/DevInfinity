from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.crud import application as application_crud
from app.db.session import get_db
from app.models.application import ApplicationStatus
from app.schemas.application import (
    ApplicationCreate,
    ApplicationRead,
    ApplicationUpdate,
)

router = APIRouter(prefix="/applications", tags=["Заявки"])


@router.get("", response_model=list[ApplicationRead])
def list_applications(
    db: Session = Depends(get_db),
    project_id: int | None = Query(None),
    user_id: int | None = Query(None),
    status_filter: ApplicationStatus | None = Query(None, alias="status"),
    offset: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
) -> list[ApplicationRead]:
    return application_crud.list_applications(
        db,
        project_id=project_id,
        user_id=user_id,
        status=status_filter,
        offset=offset,
        limit=limit,
    )


@router.post("", response_model=ApplicationRead, status_code=status.HTTP_201_CREATED)
def create_application(
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
) -> ApplicationRead:
    return application_crud.create_application(db, payload)


@router.get("/{application_id}", response_model=ApplicationRead)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
) -> ApplicationRead:
    return application_crud.get_application(db, application_id)


@router.patch("/{application_id}", response_model=ApplicationRead)
def update_application(
    application_id: int,
    payload: ApplicationUpdate,
    db: Session = Depends(get_db),
) -> ApplicationRead:
    return application_crud.update_application(db, application_id, payload)


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
) -> None:
    application_crud.delete_application(db, application_id)
