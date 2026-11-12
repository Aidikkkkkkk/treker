import { TrekerRepository } from "@/service/repository";
import { initdb } from "@/service/model";
import { TrekerService } from "@/service/service";
import { IDtoWorkout, IDtoExercise, IDtoSet } from "@/types";

import { Button, View, Text, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

function useInitDb() {
   const [trekerService, setTrekerService] = useState<TrekerService | null>(null);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function handlerInit() {
         try {
            const db = await initdb();
            const repository = new TrekerRepository(db);
            const service = new TrekerService(repository);

            setTrekerService(service);
         } catch (error) {
            console.error("Ошибка инициализации БД:", error);
         } finally {
            setLoading(false);
         }
      }

      handlerInit();
   }, []);

   return { trekerService, loading };
}

export default function TestButton2() {
   const { trekerService, loading } = useInitDb();

   const [result, setResult] = useState("");

   if (loading) {
      return <ActivityIndicator size="large" />;
   }

   if (!trekerService) {
      return <Text>Не удалось подключиться к БД</Text>;
   }

   // Тест создания тренировки
   async function testCreateWorkout() {
      try {
         const dto: IDtoWorkout = {
            dateWorkout: new Date().toISOString(),
            intensity: "heavy",
         };
         if (!trekerService) return;
         const workout = await trekerService.createWorkout(dto);

         console.log("Создана тренировка:", workout);
         setResult(JSON.stringify(workout, null, 2));
      } catch (error) {
         console.error(error);
         setResult(String(error));
      }
   }

   // Тест создания упражнения
   async function testCreateExercise() {
      try {
         // Указываем ID существующей тренировки
         const dto: IDtoExercise = {
            workout_id: 1,
            nameExercise: "Жим лёжа",
         };
         if (!trekerService) return;

         const exercise = await trekerService.createExercise(dto);

         console.log("Создано упражнение:", exercise);
         setResult(JSON.stringify(exercise, null, 2));
      } catch (error) {
         console.error(error);
         setResult(String(error));
      }
   }

   // Тест создания подхода
   async function testCreateSet() {
      try {
         const dto: IDtoSet = {
            exercise_id: 1,
            replace: 60,
            count: 12,
         };
         if (!trekerService) return;

         const set = await trekerService.createSet(dto);

         console.log("Создан подход:", set);
         setResult(JSON.stringify(set, null, 2));
      } catch (error) {
         console.error(error);
         setResult(String(error));
      }
   }

   // Получение всех записей
   async function testGetAll() {
      if (!trekerService) return;

      try {
         const workouts = await trekerService.getAllWorkouts();
         const exercises = await trekerService.getAllExercises();
         const sets = await trekerService.getAllSets();

         console.log("\n========== ТРЕНИРОВКИ ==========");

         workouts.forEach((item, index) => {
            console.log(`
   Тренировка №${index + 1}
   ID: ${item.id}
   Дата: ${item.dateWorkout}
   Интенсивность: ${item.intensity === "heavy" ? "Тяжёлая" : "Лёгкая"}
   ------------------------------`);
         });

         console.log("\n========== УПРАЖНЕНИЯ ==========");

         exercises.forEach((item, index) => {
            console.log(`
   Упражнение №${index + 1}
   ID: ${item.id}
   Название: ${item.nameExercise}
   ID тренировки: ${item.workout_id}
   ------------------------------`);
         });

         console.log("\n========== ПОДХОДЫ ==========");

         sets.forEach((item, index) => {
            console.log(`
   Подход №${index + 1}
   ID: ${item.id}
   ID упражнения: ${item.exercise_id}
   Вес: ${item.replace} кг
   Количество повторений: ${item.count}
   ------------------------------`);
         });

         setResult(
            `Загружено:
   Тренировок: ${workouts.length}
   Упражнений: ${exercises.length}
   Подходов: ${sets.length}`,
         );
      } catch (error) {
         console.error("Ошибка получения данных:", error);
         setResult(String(error));
      }
   }

   return (
      <View style={{ padding: 20, gap: 15 }}>
         <Button title="1. Создать тренировку" onPress={testCreateWorkout} />

         <Button title="2. Создать упражнение" onPress={testCreateExercise} />

         <Button title="3. Создать подход" onPress={testCreateSet} />

         <Button title="4. Получить все записи" onPress={testGetAll} />

         <Text>{result}</Text>
      </View>
   );
}
