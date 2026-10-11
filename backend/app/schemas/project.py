from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.project import ProjectStatus
from app.schemas.tag import TagRead


class ProjectCreate(BaseModel):
    title: str = Field(min_length=3, max_length=150)
    summary: str = Field(min_length=3, max_length=300)
    description: str = Field(min_length=3)
    status: ProjectStatus = ProjectStatus.recruiting
    author_id: int
    tags: list[str] = Field(default_factory=list)


class ProjectUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=150)
    summary: str | None = Field(default=None, min_length=3, max_length=300)
    description: str | None = Field(default=None, min_length=3)
    status: ProjectStatus | None = None
    tags: list[str] | None = None


class ProjectRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    summary: str
    description: str
    status: ProjectStatus
    author_id: int
    created_at: datetime
    updated_at: datetime
    tags: list[TagRead] = Field(default_factory=list)
