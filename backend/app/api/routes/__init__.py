from app.api.routes import applications, projects, tags, teams, users

routers = [
    users.router,
    projects.router,
    tags.router,
    teams.router,
    applications.router,
]

__all__ = ["routers", "applications", "projects", "tags", "teams", "users"]
