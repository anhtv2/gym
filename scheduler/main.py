from fastapi import FastAPI
from pydantic import BaseModel
from solver import solve_scheduling
import uvicorn

app = FastAPI()

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

@app.post("/solve-schedule/", response_model=SchedulingResponse)
async def solve_scheduling_api(request: SchedulingRequest):
    return solve_scheduling(request)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
