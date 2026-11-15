export interface IWeekResult {
   id: number;
   intensity: "light" | "heavy";
}
export interface IWorkoutResult {
   id: number;
   dateWorkout: string;
}
export interface IExerciseResult {
   id: number;
   workout_id: number;
   nameExercise: string;
}
export interface ISetResult {
   id: number;
   exercise_id: number;
   replace: number;
   count: number;
}

export interface IDtoWeek {
   intensity: "light" | "heavy";
}
export interface IDtoWorkout {
   dateWorkout: string;
   week_id: number;
}
export interface IDtoExercise {
   workout_id: number;
   nameExercise: string;
}
export interface IDtoSet {
   exercise_id: number;
   replace: number;
   count: number;
}
