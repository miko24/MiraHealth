from fastapi import FastAPI
from routers import softRouter
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Include the software router
app.include_router(softRouter.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the appropriate origins
    allow_credentials=True,
    allow_methods=["*"],  # Replace "*" with the appropriate HTTP methods
    allow_headers=["*"],  # Replace "*" with the appropriate headers
)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=3000)
