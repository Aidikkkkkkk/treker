import * as SQLite from "expo-sqlite";
import { type IWorkoutResult, type IExerciseResult, type IReplaceResult } from "@/types/types";

interface IDtoWorkout {
   dateWorkout: string;
   intensity: "light" | "heavy";
}
interface IDtoExercise {
   workout_id: number;
   nameExercise: string;
}
interface IDtoSet {
   exercise_id: number;
   replace: number;
   count: number;
}

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
   async seedInitialData() {
      const existing = await this.getAllRowsWorkouts();
      if (existing.length > 0) return;

      const w1Id = await this.insertToWorkout({ dateWorkout: "2026-11-10", intensity: "heavy" });

      const e1Id = await this.insertToExercise({ workout_id: w1Id, nameExercise: "Жим лежа" });
      await this.insertToSet({ exercise_id: e1Id, replace: 0, count: 10 });
      await this.insertToSet({ exercise_id: e1Id, replace: 0, count: 8 });

      const e2Id = await this.insertToExercise({ workout_id: w1Id, nameExercise: "Приседания" });
      await this.insertToSet({ exercise_id: e2Id, replace: 0, count: 12 });

      const w2Id = await this.insertToWorkout({ dateWorkout: "2026-11-12", intensity: "light" });

      const e3Id = await this.insertToExercise({ workout_id: w2Id, nameExercise: "Подтягивания" });
      await this.insertToSet({ exercise_id: e3Id, replace: 0, count: 8 });
      await this.insertToSet({ exercise_id: e3Id, replace: 1, count: 6 });
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
