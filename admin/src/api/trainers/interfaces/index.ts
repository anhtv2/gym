export interface TrainerWorkout {
  id?: string;
  name?: string;
}
export interface CreateTrainerRequest {
  name?: string;
  avatar?: any;
  birth_date?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  specialty?: string;
  experience?: string;
  trainerWorkouts?: TrainerWorkout[];
}
export interface CreateTrainerResponse {
  name?: string;
  avatar?: any;
  birth_date?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  specialty?: string;
  experience?: string;
  trainerWorkouts?: TrainerWorkout[];
}

export interface GetTrainersRequest {
  page?: number;
  take?: number;
  sort_enum?: string;
  sort_by?: string;
  status?: string;
  field?: string;
  type?: string;
  value?: string;
}
