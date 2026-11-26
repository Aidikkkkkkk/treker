import * as SQLite from "expo-sqlite";

export async function initdb() {
   const db = await SQLite.openDatabaseAsync("test8");
   await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS week (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      intensity TEXT NOT NULL CHECK (intensity IN ('light', 'heavy'))
      );

      CREATE TABLE IF NOT EXISTS workout (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week_id INTEGER NOT NULL,
      dateWorkout TEXT NOT NULL,
      FOREIGN KEY (week_id)
            REFERENCES week(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS exercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workout_id INTEGER NOT NULL,
      nameExercise TEXT NOT NULL,
      FOREIGN KEY (workout_id)
            REFERENCES workout(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS rep (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise_id INTEGER NOT NULL,
      reps INTEGER,
      weight REAL,
      time TEXT NOT NULL,
      FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS exercise_catalog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nameExercise TEXT NOT NULL UNIQUE COLLATE NOCASE
      );

      `);

   return db;
}
