import * as SQLite from "expo-sqlite";

export async function initdb() {
   const db = await SQLite.openDatabaseAsync("test5");

   await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS week (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          intensity TEXT NOT NULL CHECK (intensity IN ('light','heavy'))
      );

      CREATE TABLE IF NOT EXISTS workout (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_id INTEGER NOT NULL,
          dateWorkout TEXT NOT NULL,
          FOREIGN KEY (week_id) REFERENCES week(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS exercise (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          dateWorkout TEXT NOT NULL,
          workout_id INTEGER NOT NULL,
          nameExercise TEXT NOT NULL,
          FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "set" (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          exercise_id INTEGER NOT NULL,
          "replace" INTEGER,
          count INTEGER,
          FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
      );
   `);

   // Тестовые данные
   await db.withTransactionAsync(async () => {
      // Неделя
      await db.runAsync(
         `INSERT OR IGNORE INTO week (id, intensity)
          VALUES (100, 'light')`,
      );

      // Тренировки
      await db.runAsync(
         `INSERT OR IGNORE INTO workout (id, week_id, dateWorkout)
          VALUES (1001, 100, '2026-11-15')`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO workout (id, week_id, dateWorkout)
          VALUES (1002, 100, '2026-11-17')`,
      );

      // Упражнения первой тренировки
      await db.runAsync(
         `INSERT OR IGNORE INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (10001, '2026-11-15', 1001, 'Жим лёжа')`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (10002, '2026-11-15', 1001, 'Приседания')`,
      );

      // Упражнения второй тренировки
      await db.runAsync(
         `INSERT OR IGNORE INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (10003, '2026-11-17', 1002, 'Подтягивания')`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (10004, '2026-11-17', 1002, 'Тяга штанги')`,
      );

      // Подходы для жима лёжа
      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100001, 10001, 40, 12)`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100002, 10001, 45, 10)`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100003, 10001, 50, 8)`,
      );

      // Подходы для приседаний
      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100004, 10002, 60, 12)`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100005, 10002, 70, 10)`,
      );

      // Подходы для подтягиваний
      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100006, 10003, 0, 10)`,
      );

      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100007, 10003, 0, 8)`,
      );

      // Подходы для тяги штанги
      await db.runAsync(
         `INSERT OR IGNORE INTO "set" (id, exercise_id, "replace", count)
          VALUES (100008, 10004, 40, 12)`,
      );
   });

   return db;
}
