from pydantic import BaseModel

class SchedulingRequest(BaseModel):
    trainers: list
    workouts: list
    bookings: list
    bookeds: list
    trainer_workout: list
    trainer_schedule: list

class SchedulingResponse(BaseModel):
    status: str
    solution: list
    violations: list
