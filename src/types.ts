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
export interface IRepResult {
   id: number;
   exercise_id: number;
   reps: number;
   weight: number;
}
export interface IExerciseCatalogResult {
   id: number;
   nameExercise: string;
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
export interface IDtoRep {
   exercise_id: number;
   reps: number;
   weight: number;
}
export interface IDtoExerciseCatalog {
   nameExercise: string;
}
