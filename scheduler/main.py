from pydantic import BaseModel
from solver import solve_scheduling
from fastapi import FastAPI, __version__
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

html = f"""
<!DOCTYPE html>
<html>
    <head>
        <title>FastAPI on Vercel</title>
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
    </head>
    <body>
        <div class="bg-gray-200 p-4 rounded-lg shadow-lg">
            <h1>Hello from FastAPI@{__version__}</h1>
            <ul>
                <li><a href="/docs">/docs</a></li>
                <li><a href="/redoc">/redoc</a></li>
            </ul>
            <p>Powered by <a href="https://vercel.com" target="_blank">Vercel</a></p>
        </div>
    </body>
</html>
"""

class SchedulingRequest(BaseModel):
    trainers: list
    workouts: list
    bookings: list
    bookeds: list
    trainer_workout: list
    trainer_schedule: list
    
class SchedulingResponse(BaseModel):
    status: bool
    solution: list
    violations: list

@app.get("/")
async def root():
    return HTMLResponse(html)

@app.post("/solve-schedule/", response_model=SchedulingResponse)
async def solve_scheduling_api(request: SchedulingRequest):
    return solve_scheduling(request)