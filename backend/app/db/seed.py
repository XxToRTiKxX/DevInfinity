from sqlalchemy import select

from app.db.session import SessionLocal
from app.models import (
    Application,
    ApplicationStatus,
    Project,
    ProjectStatus,
    Tag,
    Team,
    TeamMember,
    User,
)

USERS = [
    ("anna", "anna@example.com", "Анна Ковалёва"),
    ("maksim", "maksim@example.com", "Максим Ветров"),
    ("olga", "olga@example.com", "Ольга Григорьева"),
    ("ivan", "ivan@example.com", "Иван Дорохов"),
    ("igor", "igor@example.com", "Игорь Соколов"),
    ("maria", "maria@example.com", "Мария Лебедева"),
    ("dmitry", "dmitry@example.com", "Дмитрий Волков"),
    ("ekaterina", "ekaterina@example.com", "Екатерина Петрова"),
    ("nikita", "nikita@example.com", "Никита Романов"),
]

PROJECTS = [
    {
        "title": "Платформа для волонтёрских акций",
        "summary": "Сервис, который соединяет волонтёров с городскими инициативами.",
        "description": (
            "Платформа позволяет организациям публиковать акции, а участникам — "
            "находить события рядом, выбирать роль и получать напоминания."
        ),
        "status": ProjectStatus.recruiting,
        "author": "anna",
        "tags": ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
    },
    {
        "title": "Сервис предиктивной аналитики для ритейла",
        "summary": "Прогнозирование спроса в розничных сетях на основе истории продаж.",
        "description": (
            "Собираем данные о продажах, погоде и промоактивности, обучаем модели "
            "и показываем прогнозы в дашборде."
        ),
        "status": ProjectStatus.recruiting,
        "author": "igor",
        "tags": ["Python", "ML/AI", "PostgreSQL", "Analytics"],
    },
    {
        "title": "Приложение для совместного изучения языков",
        "summary": "Мобильное приложение с матчингом по интересам и видеочатами.",
        "description": (
            "Люди, изучающие разные языки, помогают друг другу. Матчинг, "
            "игровые упражнения и трекер прогресса."
        ),
        "status": ProjectStatus.forming,
        "author": "maria",
        "tags": ["Mobile", "Flutter", "Design"],
    },
    {
        "title": "Open-source инструмент автоматизации документации",
        "summary": "Генератор живой документации из кода и markdown-файлов.",
        "description": (
            "Инструмент собирает документацию из репозитория, сверяет её с кодом "
            "и указывает устаревшие разделы."
        ),
        "status": ProjectStatus.recruiting,
        "author": "dmitry",
        "tags": ["Node.js", "TypeScript", "Automation", "DevOps"],
    },
    {
        "title": "Кроссплатформенный тайм-менеджер для студентов",
        "summary": "Планирование учебных дедлайнов с учётом нагрузки по предметам.",
        "description": (
            "Приложение раскладывает задачи по нагрузке: учитывает пары, дедлайны "
            "и перерывы, синхронизируется с календарями."
        ),
        "status": ProjectStatus.recruiting,
        "author": "ekaterina",
        "tags": ["React", "TypeScript", "PostgreSQL", "Design"],
    },
    {
        "title": "Агрегатор хакатонов и олимпиад",
        "summary": "Единая база технических событий с фильтрами и напоминаниями.",
        "description": (
            "Собираем информацию о хакатонах и митапах в одном месте, "
            "рекомендуем события под навыки и уведомляем о дедлайнах."
        ),
        "status": ProjectStatus.started,
        "author": "nikita",
        "tags": ["Python", "Automation", "FastAPI"],
    },
]

TEAMS = [
    {
        "name": "Команда «Волонтёр»",
        "description": "Собрали первых пользователей беты и ищем разработчиков.",
        "project_title": "Платформа для волонтёрских акций",
        "members": [
            ("anna", "Project Manager"),
            ("maksim", "Frontend"),
            ("olga", "UI/UX-дизайнер"),
            ("ivan", "QA-инженер"),
        ],
    },
    {
        "name": "Data Crew",
        "description": "Студенты и выпускники с опытом ML, нужны руки для API.",
        "project_title": "Сервис предиктивной аналитики для ритейла",
        "members": [
            ("igor", "Backend"),
            ("maria", "Аналитик"),
        ],
    },
    {
        "name": "DevDocs",
        "description": "Открытая команда любителей хорошей документации.",
        "project_title": "Open-source инструмент автоматизации документации",
        "members": [
            ("dmitry", "Fullstack"),
            ("ekaterina", "QA-инженер"),
        ],
    },
    {
        "name": "Focus Team",
        "description": "Доводим MVP до релиза спринтами раз в неделю.",
        "project_title": "Кроссплатформенный тайм-менеджер для студентов",
        "members": [
            ("ekaterina", "Backend"),
            ("nikita", "DevOps"),
        ],
    },
]

APPLICATIONS = [
    {
        "project_title": "Платформа для волонтёрских акций",
        "username": "nikita",
        "role": "Backend",
        "message": "Готов подключиться к API и интеграциям.",
    },
    {
        "project_title": "Open-source инструмент автоматизации документации",
        "username": "maria",
        "role": "QA-инженер",
        "message": "Могу закрыть тестирование и написать тест-план.",
    },
    {
        "project_title": "Сервис предиктивной аналитики для ритейла",
        "username": "olga",
        "role": "Аналитик",
        "message": "Интересна аналитика данных и визуализация.",
    },
]


def seed() -> None:
    db = SessionLocal()
    try:
        if db.scalar(select(User)) is not None:
            print("База уже содержит данные — наполнение пропущено.")
            return

        users: dict[str, User] = {}
        for username, email, full_name in USERS:
            users[username] = User(username=username, email=email, full_name=full_name)
            db.add(users[username])

        tags: dict[str, Tag] = {}
        projects: dict[str, Project] = {}
        for item in PROJECTS:
            project = Project(
                title=item["title"],
                summary=item["summary"],
                description=item["description"],
                status=item["status"],
                author=users[item["author"]],
            )
            for tag_name in item["tags"]:
                if tag_name not in tags:
                    tags[tag_name] = Tag(name=tag_name)
                project.tags.append(tags[tag_name])
            db.add(project)
            projects[item["title"]] = project

        db.flush()

        for item in TEAMS:
            team = Team(
                name=item["name"],
                description=item["description"],
                project=projects[item["project_title"]],
            )
            for username, role in item["members"]:
                team.members.append(TeamMember(user=users[username], role=role))
            db.add(team)

        for item in APPLICATIONS:
            db.add(
                Application(
                    project=projects[item["project_title"]],
                    applicant=users[item["username"]],
                    role=item["role"],
                    message=item["message"],
                    status=ApplicationStatus.pending,
                )
            )

        db.commit()
        print("Демонстрационные данные добавлены.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
