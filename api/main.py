from fastapi import FastAPI
from routers import userRouter
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="MiBand Docs",
        version="2.5.0",
        description="This is a documentation for MiBand Backend",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Include the software router
app.include_router(userRouter.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the appropriate origins
    allow_credentials=True,
    allow_methods=["*"],  # Replace "*" with the appropriate HTTP methods
    allow_headers=["*"],  # Replace "*" with the appropriate headers
)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9009)
