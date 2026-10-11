from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.crud import tag as tag_crud
from app.db.session import get_db
from app.schemas.tag import TagCreate, TagRead, TagUpdate

router = APIRouter(prefix="/tags", tags=["Теги"])


@router.get("", response_model=list[TagRead])
def list_tags(
    db: Session = Depends(get_db),
    offset: int = Query(0, ge=0),
    limit: int = Query(200, ge=1, le=500),
) -> list[TagRead]:
    return tag_crud.list_tags(db, offset=offset, limit=limit)


@router.post("", response_model=TagRead, status_code=status.HTTP_201_CREATED)
def create_tag(payload: TagCreate, db: Session = Depends(get_db)) -> TagRead:
    return tag_crud.create_tag(db, payload)


@router.get("/{tag_id}", response_model=TagRead)
def get_tag(tag_id: int, db: Session = Depends(get_db)) -> TagRead:
    return tag_crud.get_tag(db, tag_id)


@router.patch("/{tag_id}", response_model=TagRead)
def update_tag(
    tag_id: int,
    payload: TagUpdate,
    db: Session = Depends(get_db),
) -> TagRead:
    return tag_crud.update_tag(db, tag_id, payload)


@router.delete("/{tag_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_tag(tag_id: int, db: Session = Depends(get_db)) -> None:
    tag_crud.delete_tag(db, tag_id)
