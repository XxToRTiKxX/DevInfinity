from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.application import ApplicationStatus
from app.schemas.user import UserRead


class ApplicationCreate(BaseModel):
    project_id: int
    user_id: int
    role: str = Field(min_length=1, max_length=80)
    message: str | None = Field(default=None, max_length=1000)


class ApplicationUpdate(BaseModel):
    role: str | None = Field(default=None, min_length=1, max_length=80)
    message: str | None = Field(default=None, max_length=1000)
    status: ApplicationStatus | None = None


class ApplicationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    project_id: int
    user_id: int
    role: str
    message: str | None
    status: ApplicationStatus
    created_at: datetime
    updated_at: datetime
    applicant: UserRead | None = None
