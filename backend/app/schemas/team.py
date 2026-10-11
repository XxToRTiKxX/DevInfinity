from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class TeamMemberCreate(BaseModel):
    user_id: int
    role: str = Field(min_length=1, max_length=80)


class TeamMemberRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    role: str
    joined_at: datetime


class TeamCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=1000)
    project_id: int


class TeamUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    description: str | None = Field(default=None, max_length=1000)


class TeamRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    project_id: int
    created_at: datetime
    members: list[TeamMemberRead] = Field(default_factory=list)
