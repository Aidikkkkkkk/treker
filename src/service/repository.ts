import * as SQLite from "expo-sqlite";
import { type IWorkoutResult, type IExerciseResult, type IReplaceResult } from "@/types/types";

export class TrekerRepository {
   private db: SQLite.SQLiteDatabase;
   constructor(db: SQLite.SQLiteDatabase) {
      this.db = db;
   }
   async getAllRowsWorkouts() {
      return (await this.db.getAllAsync("SELECT * FROM workouts")) as IWorkoutResult[];
   }
   async getAllRowsExercise() {
      return (await this.db.getAllAsync("SELECT * FROM exercises")) as IExerciseResult[];
   }
   async getAllRowsReplays() {
      return (await this.db.getAllAsync("SELECT * FROM replaceExercises")) as IReplaceResult[];
   }
   async joinBetweenWorkoutAndExercise() {
      return this.db.runAsync(`SELECT exercisesKey, id FROM workouts INNER JOIN exercises.id = workouts.exercisesKey
               `);
   }
   async joinBetweenExerciseAndReplays() {
      return this.db
         .runAsync(`SELECT replaceExerciseKey, id FROM exercises INNER JOIN replaceExercises.id = exercises.replaceExerciseKey
                     `);
   }
   async insertToWorkouts(dateTime: string, lightOrHeavy: string, uuidForExerciseKey: string) {
      this.db.runAsync(`INSERT INTO workouts (dateWorkout,lightOrHeavy,exercisesKey)
         VALUES ('${dateTime}','${lightOrHeavy}', '${uuidForExerciseKey}')`);
   }
   async insertToExercises(workoutId: string, nameExercise: string, uuidForExerciseKey: string) {
      this.db.runAsync(`INSERT INTO exercises (id , nameExercise, replaceExerciseKey)
      VALUES ('${workoutId}','${nameExercise}' ,'${uuidForExerciseKey}');`);
   }
   async insertToReplays(exerciseId: string, replace: number, count: number) {
      this.db.runAsync(`INSERT INTO replaceExercises (id,replace,count)
            VALUES ('${exerciseId}', ${replace} ,${count});`);
   }
}
