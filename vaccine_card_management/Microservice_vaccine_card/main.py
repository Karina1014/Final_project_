from fastapi import FastAPI
from src.presentation.api import router
from src.infrastructure.repositories.initdatabase import init_db

app = FastAPI(title="Pet Management API")

init_db()

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=9000, reload=True)






