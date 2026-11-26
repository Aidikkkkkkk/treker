import * as SQLite from "expo-sqlite";
import {
   IWorkoutResult,
   IExerciseResult,
   IDtoRep,
   IDtoExercise,
   IDtoWorkout,
   IDtoExerciseCatalog,
   IRepResult,
   IDtoWeek,
   IWeekResult,
   IExerciseCatalogResult,
   IDtoExerciseCatalogChange,
   IDtoExerciseChange,
   IDtoRepChange,
   IDtoWeekChange,
   IDtoWorkoutChange,
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
      const result = await this.db.runAsync(`INSERT INTO exercise (workout_id,nameExercise) VALUES (?, ?)`, [
         dto.workout_id,
         dto.nameExercise,
      ]);
      return result.lastInsertRowId;
   }
   async insertToRep(dto: IDtoRep) {
      const result = await this.db.runAsync(`INSERT INTO rep (exercise_id, reps, weight,time) VALUES (?, ?, ?,?)`, [
         dto.exercise_id,
         dto.reps,
         dto.weight,
         dto.time,
      ]);
      return result.lastInsertRowId;
   }
   async insertToExerciseCatalog(dto: IDtoExerciseCatalog) {
      const result = await this.db.runAsync(`INSERT INTO exercise_catalog (nameExercise) VALUES (?)`, [
         dto.nameExercise,
      ]);
      return result.lastInsertRowId;
   }
   async getAllRowsWeeks() {
      return (await this.db.getAllAsync("SELECT * FROM week")) as IWeekResult[];
   }
   async getAllRowsWorkouts(week_id: number) {
      return (await this.db.getAllAsync("SELECT * FROM workout WHERE week_id = ?", [week_id])) as IWorkoutResult[];
   }
   async getAllRowsExercises(workout_id: number): Promise<IExerciseResult[]> {
      return (await this.db.getAllAsync("SELECT * FROM exercise WHERE workout_id = ?", [
         workout_id,
      ])) as IExerciseResult[];
   }
   async getAllRowsReps(exercise_id: number) {
      return (await this.db.getAllAsync("SELECT * FROM rep WHERE exercise_id = ?", [exercise_id])) as IRepResult[];
   }
   async getAllRowsExerciseCatalog() {
      return (await this.db.getAllAsync("SELECT * FROM exercise_catalog")) as IExerciseCatalogResult[];
   }
   async getRowExerciseCatalogByName(nameExercise: string) {
      return (await this.db.getFirstAsync("SELECT * FROM exercise_catalog WHERE nameExercise = ? COLLATE NOCASE", [
         nameExercise,
      ])) as IExerciseCatalogResult | null;
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
   async deleteRep(id: number) {
      return await this.db.runAsync("DELETE FROM rep WHERE id = ?", [id]);
   }
   async deleteFromExerciseCatalog(id: number) {
      return await this.db.runAsync("DELETE FROM exercise_catalog WHERE id = ?", [id]);
   }
   async changeDataWeek(dto: IDtoWeekChange) {
      return await this.db.runAsync("UPDATE week SET intensity = ? WHERE id = ?", [dto.intensity, dto.id]);
   }
   async changeDataWorkout(dto: IDtoWorkoutChange) {
      return await this.db.runAsync("UPDATE workout SET dateWorkout = ? WHERE id = ?", [dto.dateWorkout, dto.id]);
   }
   async changeDataExercise(dto: IDtoExerciseChange) {
      return await this.db.runAsync("UPDATE exercise SET nameExercise = ? WHERE id = ?", [dto.nameExercise, dto.id]);
   }
   async changeDataExerciseCatalog(dto: IDtoExerciseCatalogChange) {
      return await this.db.runAsync("UPDATE exercise_catalog SET nameExercise = ? WHERE id = ?", [
         dto.nameExercise,
         dto.id,
      ]);
   }
   async changeDataRep(dto: IDtoRepChange) {
      return await this.db.runAsync("UPDATE rep SET reps = ?, weight = ? WHERE id = ?", [dto.reps, dto.weight, dto.id]);
   }
}
