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
