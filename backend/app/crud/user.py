from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError
from app.crud.base import commit, get_or_raise, refresh
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def list_users(db: Session, *, offset: int = 0, limit: int = 100) -> list[User]:
    stmt = select(User).order_by(User.id).offset(offset).limit(limit)
    return list(db.scalars(stmt))


def get_user(db: Session, user_id: int) -> User:
    return get_or_raise(db, User, user_id)


def _ensure_unique(
    db: Session,
    *,
    username: str | None = None,
    email: str | None = None,
    exclude_id: int | None = None,
) -> None:
    if username is not None:
        stmt = select(User).where(User.username == username)
        if exclude_id is not None:
            stmt = stmt.where(User.id != exclude_id)
        if db.scalar(stmt) is not None:
            raise ConflictError(f"Пользователь с username «{username}» уже существует")
    if email is not None:
        stmt = select(User).where(User.email == email)
        if exclude_id is not None:
            stmt = stmt.where(User.id != exclude_id)
        if db.scalar(stmt) is not None:
            raise ConflictError(f"Пользователь с email «{email}» уже существует")


def create_user(db: Session, payload: UserCreate) -> User:
    _ensure_unique(db, username=payload.username, email=payload.email)
    user = User(**payload.model_dump())
    db.add(user)
    commit(db)
    return refresh(db, user)


def update_user(db: Session, user_id: int, payload: UserUpdate) -> User:
    user = get_or_raise(db, User, user_id)
    data = payload.model_dump(exclude_unset=True)
    _ensure_unique(
        db,
        username=data.get("username"),
        email=data.get("email"),
        exclude_id=user_id,
    )
    for field, value in data.items():
        setattr(user, field, value)
    commit(db)
    return refresh(db, user)


def delete_user(db: Session, user_id: int) -> None:
    user = get_or_raise(db, User, user_id)
    db.delete(user)
    commit(db)
