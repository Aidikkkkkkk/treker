import * as SQLite from "expo-sqlite";
import {
   type IWorkoutResult,
   type IExerciseResult,
   type IReplaceResult,
   type IDtoExercise,
   type IDtoWorkout,
   type IDtoSet,
} from "@/types/index";

export class TrekerRepository {
   private db: SQLite.SQLiteDatabase;

   constructor(db: SQLite.SQLiteDatabase) {
      this.db = db;
   }
   async insertToWorkout(dto: IDtoWorkout) {
      const result = await this.db.runAsync(`INSERT INTO workout (dateWorkout, intensity) VALUES (?, ?)`, [
         dto.dateWorkout,
         dto.intensity,
      ]);
      return result.lastInsertRowId;
   }

   async insertToExercise(dto: IDtoExercise) {
      const result = await this.db.runAsync(`INSERT INTO exercise (workout_id, nameExercise) VALUES (?, ?)`, [
         dto.workout_id,
         dto.nameExercise,
      ]);
      return result.lastInsertRowId;
   }

   async insertToSet(dto: IDtoSet) {
      const result = await this.db.runAsync(`INSERT INTO "set" (exercise_id, replace, count) VALUES (?, ?, ?)`, [
         dto.exercise_id,
         dto.replace,
         dto.count,
      ]);
      return result.lastInsertRowId;
   }

   async getAllRowsWorkouts() {
      return (await this.db.getAllAsync("SELECT * FROM workout")) as IWorkoutResult[];
   }

   async getAllRowsExercises() {
      return (await this.db.getAllAsync(
         "SELECT * FROM exercise as e LEFT OUTER JOIN workout as w ON e.workout_id = w.id",
      )) as IExerciseResult[];
   }

   async getAllRowsSets() {
      return (await this.db.getAllAsync(
         'SELECT * FROM "set" as s LEFT OUTER JOIN exercise as e ON s.exercise_id = e.id',
      )) as IReplaceResult[];
   }
}
