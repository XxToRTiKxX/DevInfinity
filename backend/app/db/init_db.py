import app.models
from app.db.base import Base
from app.db.session import engine


def init_models() -> None:
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_models()
    print("Таблицы созданы в базе данных.")
