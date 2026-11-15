import * as SQLite from "expo-sqlite";

// export async function initdb() {
//    const db = await SQLite.openDatabaseAsync("test2");
//    await db.execAsync(`
//       PRAGMA foreign_keys = ON;
//       PRAGMA journal_mode = WAL;

//       CREATE TABLE IF NOT EXISTS week (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           intensity TEXT NOT NULL CHECK (intensity IN ('light','heavy'))
//       );
//       CREATE TABLE IF NOT EXISTS workout (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             week_id INTEGER NOT NULL,
//             dateWorkout TEXT NOT NULL,
//             FOREIGN KEY (week_id) REFERENCES week(id) ON DELETE CASCADE
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
//           replace INTEGER,
//           count INTEGER,
//           FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
//       );
//    `);

//    return db;
// }

export async function initdb() {
   const db = await SQLite.openDatabaseAsync("test3");

   await db.execAsync(`
      PRAGMA foreign_keys = OFF;

      DROP TABLE IF EXISTS "set";
      DROP TABLE IF EXISTS exercise;
      DROP TABLE IF EXISTS workout;
      DROP TABLE IF EXISTS week;

      PRAGMA foreign_keys = ON;

      CREATE TABLE week (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          intensity TEXT NOT NULL CHECK (intensity IN ('light','heavy'))
      );

      CREATE TABLE workout (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_id INTEGER NOT NULL,
          dateWorkout TEXT NOT NULL,
          FOREIGN KEY (week_id) REFERENCES week(id) ON DELETE CASCADE
      );

      CREATE TABLE exercise (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          dateWorkout TEXT NOT NULL,
          workout_id INTEGER NOT NULL,
          nameExercise TEXT NOT NULL,
          FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE
      );

      CREATE TABLE "set" (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          exercise_id INTEGER NOT NULL,
          "replace" INTEGER,
          count INTEGER,
          FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
      );
   `);

   type SetData = [number, number];
   type ExerciseData = { name: string; sets: SetData[] };
   type DayData = { offset: number; exercises: ExerciseData[] };

   const weeks: ("heavy" | "light")[] = ["heavy", "light", "heavy", "light"];

   const workoutDays: Record<"heavy" | "light", DayData[]> = {
      heavy: [
         {
            offset: 0,
            exercises: [
               {
                  name: "Жим лёжа",
                  sets: [
                     [60, 10],
                     [70, 8],
                     [80, 6],
                     [85, 4],
                  ],
               },
               {
                  name: "Жим гантелей на наклонной",
                  sets: [
                     [24, 12],
                     [26, 10],
                     [28, 8],
                  ],
               },
               {
                  name: "Отжимания на брусьях",
                  sets: [
                     [0, 15],
                     [10, 10],
                     [10, 8],
                  ],
               },
            ],
         },
         {
            offset: 2,
            exercises: [
               {
                  name: "Приседания со штангой",
                  sets: [
                     [80, 8],
                     [90, 6],
                     [100, 5],
                     [110, 3],
                  ],
               },
               {
                  name: "Румынская тяга",
                  sets: [
                     [70, 10],
                     [80, 8],
                     [90, 6],
                  ],
               },
               {
                  name: "Жим ногами",
                  sets: [
                     [140, 12],
                     [160, 10],
                     [180, 8],
                  ],
               },
            ],
         },
         {
            offset: 4,
            exercises: [
               {
                  name: "Становая тяга",
                  sets: [
                     [100, 5],
                     [120, 4],
                     [140, 3],
                     [150, 2],
                  ],
               },
               {
                  name: "Подтягивания",
                  sets: [
                     [0, 10],
                     [5, 8],
                     [10, 6],
                  ],
               },
               {
                  name: "Тяга штанги в наклоне",
                  sets: [
                     [60, 10],
                     [70, 8],
                     [75, 6],
                  ],
               },
            ],
         },
      ],

      light: [
         {
            offset: 0,
            exercises: [
               {
                  name: "Жим лёжа",
                  sets: [
                     [40, 15],
                     [40, 15],
                     [40, 12],
                  ],
               },
               {
                  name: "Разводка гантелей",
                  sets: [
                     [10, 15],
                     [12, 12],
                     [12, 12],
                  ],
               },
            ],
         },
         {
            offset: 3,
            exercises: [
               {
                  name: "Приседания со штангой",
                  sets: [
                     [50, 15],
                     [50, 15],
                     [50, 12],
                  ],
               },
               {
                  name: "Выпады с гантелями",
                  sets: [
                     [12, 12],
                     [12, 12],
                     [14, 10],
                  ],
               },
            ],
         },
      ],
   };

   const pad = (n: number) => String(n).padStart(2, "0");

   const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

   // Начало: понедельник 3 недели назад
   const start = new Date();
   const dow = (start.getDay() + 6) % 7;
   start.setDate(start.getDate() - dow - 7 * (weeks.length - 1));

   // Полное удаление и повторное заполнение
   await db.withTransactionAsync(async () => {
      // Удаляем старые данные
      await db.execAsync(`
         DELETE FROM "set";
         DELETE FROM exercise;
         DELETE FROM workout;
         DELETE FROM week;
      `);

      // Сбрасываем AUTOINCREMENT
      await db.execAsync(`
         DELETE FROM sqlite_sequence
         WHERE name IN ('week', 'workout', 'exercise', 'set');
      `);

      // Заполняем заново
      for (let w = 0; w < weeks.length; w++) {
         const intensity = weeks[w];

         const weekRes = await db.runAsync("INSERT INTO week (intensity) VALUES (?)", intensity);

         const weekId = weekRes.lastInsertRowId;

         for (const day of workoutDays[intensity]) {
            const date = new Date(start);
            date.setDate(start.getDate() + w * 7 + day.offset);

            const dateStr = fmtDate(date);

            const workoutRes = await db.runAsync(
               "INSERT INTO workout (week_id, dateWorkout) VALUES (?, ?)",
               weekId,
               dateStr,
            );

            const workoutId = workoutRes.lastInsertRowId;

            for (const ex of day.exercises) {
               const exRes = await db.runAsync(
                  `INSERT INTO exercise
                   (dateWorkout, workout_id, nameExercise)
                   VALUES (?, ?, ?)`,
                  dateStr,
                  workoutId,
                  ex.name,
               );

               const exerciseId = exRes.lastInsertRowId;

               for (const [weight, reps] of ex.sets) {
                  await db.runAsync(
                     `INSERT INTO "set"
                      (exercise_id, "replace", count)
                      VALUES (?, ?, ?)`,
                     exerciseId,
                     weight,
                     reps,
                  );
               }
            }
         }
      }
   });

   // Проверка заполнения
   console.log("База данных заполнена:");

   console.log("Weeks:", await db.getAllAsync("SELECT * FROM week"));

   console.log("Workouts:", await db.getAllAsync("SELECT * FROM workout"));

   console.log("Exercises:", await db.getAllAsync("SELECT * FROM exercise"));

   console.log("Sets:", await db.getAllAsync('SELECT * FROM "set"'));

   return db;
}
