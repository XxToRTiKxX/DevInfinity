from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import routers
from app.core.config import settings
from app.core.exceptions import AppError

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Backend API доски проектов и команд DevInfinity",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


@app.get("/api/health", tags=["Служебные"])
def health() -> dict[str, str]:
    return {"status": "ok"}


for router in routers:
    app.include_router(router, prefix=settings.api_prefix)
