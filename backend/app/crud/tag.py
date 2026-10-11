from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError
from app.crud.base import commit, get_or_raise, refresh
from app.models.tag import Tag
from app.schemas.tag import TagCreate, TagUpdate


def list_tags(db: Session, *, offset: int = 0, limit: int = 200) -> list[Tag]:
    stmt = select(Tag).order_by(Tag.name).offset(offset).limit(limit)
    return list(db.scalars(stmt))


def get_tag(db: Session, tag_id: int) -> Tag:
    return get_or_raise(db, Tag, tag_id)


def get_or_create_by_name(db: Session, name: str) -> Tag:
    normalized = name.strip()
    tag = db.scalar(select(Tag).where(Tag.name == normalized))
    if tag is not None:
        return tag
    tag = Tag(name=normalized)
    db.add(tag)
    db.flush()
    return tag


def create_tag(db: Session, payload: TagCreate) -> Tag:
    if db.scalar(select(Tag).where(Tag.name == payload.name.strip())) is not None:
        raise ConflictError(f"Тег «{payload.name}» уже существует")
    tag = Tag(name=payload.name.strip())
    db.add(tag)
    commit(db)
    return refresh(db, tag)


def update_tag(db: Session, tag_id: int, payload: TagUpdate) -> Tag:
    tag = get_or_raise(db, Tag, tag_id)
    existing = db.scalar(select(Tag).where(Tag.name == payload.name.strip(), Tag.id != tag_id))
    if existing is not None:
        raise ConflictError(f"Тег «{payload.name}» уже существует")
    tag.name = payload.name.strip()
    commit(db)
    return refresh(db, tag)


def delete_tag(db: Session, tag_id: int) -> None:
    tag = get_or_raise(db, Tag, tag_id)
    db.delete(tag)
    commit(db)
