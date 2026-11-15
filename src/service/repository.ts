import * as SQLite from "expo-sqlite";
import {
   IWorkoutResult,
   IExerciseResult,
   ISetResult,
   IDtoExercise,
   IDtoWorkout,
   IDtoSet,
   IDtoWeek,
   IWeekResult,
} from "@/types";
export class TrekerRepository {
   private db: SQLite.SQLiteDatabase;

   constructor(db: SQLite.SQLiteDatabase) {
      this.db = db;
   }
   async insertToWeek(dto: IDtoWeek) {
      const result = await this.db.runAsync(`INSERT INTO week (intensity) VALUES (?)`, [dto.intensity]);
      return result.lastInsertRowId;
   }
   async insertToWorkout(dto: IDtoWorkout) {
      const result = await this.db.runAsync(`INSERT INTO workout (dateWorkout,week_id) VALUES (?,?)`, [
         dto.dateWorkout,
         dto.week_id,
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
   async getAllRowsWeeks() {
      return (await this.db.getAllAsync("SELECT * FROM week")) as IWeekResult[];
   }
   async getAllRowsWorkouts(week_id: number) {
      return (await this.db.getAllAsync(`SELECT * FROM workout WHERE week_id = ?`, [week_id])) as IWorkoutResult[];
   }

   async getAllRowsExercises(workout_id: number): Promise<IExerciseResult[]> {
      return (await this.db.getAllAsync(
         "SELECT * FROM exercise as e LEFT OUTER JOIN workout as w ON e.workout_id = w.id WHERE e.workout_id = ?",
         [workout_id],
      )) as IExerciseResult[];
   }
   async getAllRowsSets() {
      return (await this.db.getAllAsync(
         'SELECT * FROM "set" as s LEFT OUTER JOIN exercise as e ON s.exercise_id = e.id',
      )) as ISetResult[];
   }
   async deleteWeek(id: number) {
      return await this.db.runAsync("DELETE FROM week WHERE id = ?", [id]);
   }
   async deleteWorkout(id: number) {
      return await this.db.runAsync("DELETE FROM workout WHERE id = ?", [id]);
   }
   async deleteExercise(id: number) {
      return await this.db.runAsync("DELETE FROM exercise WHERE id = ?", [id]);
   }
   async deleteSet(id: number) {
      return await this.db.runAsync("DELETE FROM set WHERE id = ?", [id]);
   }
}
