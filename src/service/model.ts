// import * as SQLite from "expo-sqlite";

// export async function initdb() {
//    const db = await SQLite.openDatabaseAsync("test5");

//    await db.execAsync(`
//       PRAGMA foreign_keys = ON;
//       PRAGMA journal_mode = WAL;

//       CREATE TABLE IF NOT EXISTS week (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           intensity TEXT NOT NULL CHECK (intensity IN ('light','heavy'))
//       );

//       CREATE TABLE IF NOT EXISTS workout (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           week_id INTEGER NOT NULL,
//           dateWorkout TEXT NOT NULL,
//           FOREIGN KEY (week_id) REFERENCES week(id) ON DELETE CASCADE
//       );

//       CREATE TABLE IF NOT EXISTS exercise (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           dateWorkout TEXT NOT NULL,
//           workout_id INTEGER NOT NULL,
//           nameExercise TEXT NOT NULL,
//           FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE
//       );

//       CREATE TABLE IF NOT EXISTS "set" (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           exercise_id INTEGER NOT NULL,
//           "replace" INTEGER,
//           count INTEGER,
//           FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
//       );
//    `);

//    return db;
// }

import * as SQLite from "expo-sqlite";

export async function initdb() {
   const db = await SQLite.openDatabaseAsync("test6");

   // Включаем внешние ключи
   await db.execAsync(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
   `);

   // Создаём таблицы и заполняем их тестовыми данными
   await db.withTransactionAsync(async () => {
      // 1. Создание таблиц
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
            dateWorkout TEXT NOT NULL,
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
            FOREIGN KEY (exercise_id)
               REFERENCES exercise(id) ON DELETE CASCADE
         );
      `);

      // 2. Полная очистка таблиц
      await db.execAsync(`
         DELETE FROM "set";
         DELETE FROM exercise;
         DELETE FROM workout;
         DELETE FROM week;
      `);

      // 3. Сброс AUTOINCREMENT
      await db.execAsync(`
         DELETE FROM sqlite_sequence
         WHERE name IN ('week', 'workout', 'exercise', 'set');
      `);

      // 4. Тестовые недели
      await db.runAsync(`INSERT INTO week (id, intensity) VALUES (?, ?)`, 100, "light");

      await db.runAsync(`INSERT INTO week (id, intensity) VALUES (?, ?)`, 101, "heavy");

      // 5. Тестовые тренировки
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

      // 6. Тестовые упражнения
      await db.runAsync(
         `INSERT INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (?, ?, ?, ?)`,
         10001,
         "2026-11-15",
         1001,
         "Жим лёжа",
      );

      await db.runAsync(
         `INSERT INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (?, ?, ?, ?)`,
         10002,
         "2026-11-15",
         1001,
         "Приседания",
      );

      await db.runAsync(
         `INSERT INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (?, ?, ?, ?)`,
         10003,
         "2026-11-17",
         1002,
         "Подтягивания",
      );

      await db.runAsync(
         `INSERT INTO exercise
          (id, dateWorkout, workout_id, nameExercise)
          VALUES (?, ?, ?, ?)`,
         10004,
         "2026-11-16",
         1003,
         "Тяга штанги",
      );

      // 7. Тестовые подходы
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
