from fastapi import FastAPI
from src.presentation.api import router

app = FastAPI()
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=7500, reload=True)