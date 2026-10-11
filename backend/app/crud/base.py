from typing import TypeVar

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.exceptions import ConflictError, NotFoundError
from app.db.base import Base

ModelT = TypeVar("ModelT", bound=Base)

MODEL_LABELS = {
    "User": "Пользователь",
    "Project": "Проект",
    "Tag": "Тег",
    "Team": "Команда",
    "TeamMember": "Участник команды",
    "Application": "Заявка",
}


def commit(db: Session) -> None:
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise ConflictError(
            "Нарушение целостности данных: запись с такими значениями уже существует "
            "или ссылается на несуществующую запись"
        ) from exc


def get_or_raise(db: Session, model: type[ModelT], obj_id: int) -> ModelT:
    obj = db.get(model, obj_id)
    if obj is None:
        label = MODEL_LABELS.get(model.__name__, model.__name__)
        raise NotFoundError(f"{label} с id={obj_id} не найдена")
    return obj


def refresh(db: Session, obj: ModelT) -> ModelT:
    db.refresh(obj)
    return obj
