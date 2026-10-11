from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.crud import team as team_crud
from app.db.session import get_db
from app.schemas.team import (
    TeamCreate,
    TeamMemberCreate,
    TeamRead,
    TeamUpdate,
)

router = APIRouter(prefix="/teams", tags=["Команды"])


@router.get("", response_model=list[TeamRead])
def list_teams(
    db: Session = Depends(get_db),
    project_id: int | None = Query(None),
    offset: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
) -> list[TeamRead]:
    return team_crud.list_teams(db, project_id=project_id, offset=offset, limit=limit)


@router.post("", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
def create_team(payload: TeamCreate, db: Session = Depends(get_db)) -> TeamRead:
    return team_crud.create_team(db, payload)


@router.get("/{team_id}", response_model=TeamRead)
def get_team(team_id: int, db: Session = Depends(get_db)) -> TeamRead:
    return team_crud.get_team(db, team_id)


@router.patch("/{team_id}", response_model=TeamRead)
def update_team(
    team_id: int,
    payload: TeamUpdate,
    db: Session = Depends(get_db),
) -> TeamRead:
    return team_crud.update_team(db, team_id, payload)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_team(team_id: int, db: Session = Depends(get_db)) -> None:
    team_crud.delete_team(db, team_id)


@router.post(
    "/{team_id}/members",
    response_model=TeamRead,
    status_code=status.HTTP_201_CREATED,
)
def add_team_member(
    team_id: int,
    payload: TeamMemberCreate,
    db: Session = Depends(get_db),
) -> TeamRead:
    return team_crud.add_member(db, team_id, payload)


@router.delete("/{team_id}/members/{user_id}", response_model=TeamRead)
def remove_team_member(
    team_id: int,
    user_id: int,
    db: Session = Depends(get_db),
) -> TeamRead:
    return team_crud.remove_member(db, team_id, user_id)
