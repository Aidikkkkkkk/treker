import * as SQLite from "expo-sqlite";

export async function initdb() {
   await SQLite.deleteDatabaseAsync("test6");

   const db = await SQLite.openDatabaseAsync("test6");

   await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
   `);

   await db.withTransactionAsync(async () => {
      await db.execAsync(`
         CREATE TABLE IF NOT EXISTS week (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            intensity TEXT NOT NULL
               CHECK (intensity IN ('light', 'heavy'))
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

         CREATE TABLE IF NOT EXISTS "set" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            exercise_id INTEGER NOT NULL,
            "replace" INTEGER,
            count INTEGER,
            FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
         );
      `);

      await db.runAsync(`INSERT INTO week (id, intensity) VALUES (?, ?)`, 100, "light");

      await db.runAsync(`INSERT INTO week (id, intensity) VALUES (?, ?)`, 101, "heavy");

      await db.runAsync(
         `INSERT INTO workout (id, week_id, dateWorkout)
          VALUES (?, ?, ?)`,
         1001,
         100,
         "2026-11-15",
      );

      await db.runAsync(
         `INSERT INTO workout (id, week_id, dateWorkout)
          VALUES (?, ?, ?)`,
         1002,
         100,
         "2026-11-17",
      );

      await db.runAsync(
         `INSERT INTO workout (id, week_id, dateWorkout)
          VALUES (?, ?, ?)`,
         1003,
         101,
         "2026-11-16",
      );

      await db.runAsync(
         `INSERT INTO exercise (id, workout_id, nameExercise)
          VALUES (?, ?, ?)`,
         10001,
         1001,
         "Жим лёжа",
      );

      await db.runAsync(
         `INSERT INTO exercise (id, workout_id, nameExercise)
          VALUES (?, ?, ?)`,
         10002,
         1001,
         "Приседания",
      );

      await db.runAsync(
         `INSERT INTO exercise (id, workout_id, nameExercise)
          VALUES (?, ?, ?)`,
         10003,
         1002,
         "Подтягивания",
      );

      await db.runAsync(
         `INSERT INTO exercise (id, workout_id, nameExercise)
          VALUES (?, ?, ?)`,
         10004,
         1003,
         "Тяга штанги",
      );

      const sets = [
         [100001, 10001, 40, 12],
         [100002, 10001, 45, 10],
         [100003, 10001, 50, 8],
         [100004, 10002, 60, 12],
         [100005, 10002, 70, 10],
         [100006, 10003, 0, 10],
         [100007, 10003, 0, 8],
         [100008, 10004, 40, 12],
      ];

      for (const [id, exercise_id, replace, count] of sets) {
         await db.runAsync(
            `INSERT INTO "set"
             (id, exercise_id, "replace", count)
             VALUES (?, ?, ?, ?)`,
            id,
            exercise_id,
            replace,
            count,
         );
      }
   });

   return db;
}
