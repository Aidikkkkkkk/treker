export interface IWorkoutResult {
   id: number;
   dateWorkout: string;
   intensity: "light" | "heavy";
}
export interface IExerciseResult {
   id: string;
   workout_id: number;
   nameExercise: string;
}
export interface ISetResult {
   id: string;
   exercise_id: number;
   replace: number;
   count: number;
}
export interface IDtoWorkout {
   dateWorkout: string;
   intensity: "light" | "heavy";
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
