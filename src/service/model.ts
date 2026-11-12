import * as SQLite from "expo-sqlite";

export async function initdb() {
   const db = await SQLite.openDatabaseAsync("test2");
   await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS workout (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dateWorkout TEXT NOT NULL,
            lightOrHeavy TEXT NOT NULL,
            exercisesKey TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS exercise (
            id TEXT NOT NULL,
            nameExercise TEXT NOT NULL,
            replaceExerciseKey TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Set (
            id TEXT NOT NULL,
            replace INTEGER,
            count INTEGER
      );
      `);
   return db;
}
