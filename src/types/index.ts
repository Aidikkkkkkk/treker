export interface IWorkoutResult {
   id: number;
   dateWorkout: string;
   lightOrHeavy: string;
   exercisesKey: string;
}
export interface IExerciseResult {
   id: string;
   nameExercise: string;
   replaceExerciseKey: string;
}
export interface IReplaceResult {
   id: string;
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
