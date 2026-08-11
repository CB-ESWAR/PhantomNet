from fastapi import FastAPI

from api.middleware import register
from api.routes import router

app = FastAPI(
    title="PhantomNet API",
    version="1.0.0"
)

register(app)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "PhantomNet API Running"
    }