import { TrekerRepository } from "./repository";
import { IDtoWorkout, IDtoExercise, IDtoSet } from "@/types";

export class TrekerService {
   private trekerRepository: TrekerRepository;
   constructor(trekerRepository: TrekerRepository) {
      this.trekerRepository = trekerRepository;
   }
   private validateDate(dateString: string): string {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
         throw new Error("Указана некорректная дата");
      }
      return date.toISOString();
   }
   private validateNumber(value: unknown): number {
      const num = Number(value);
      if (
         value === null ||
         value === undefined ||
         (typeof value === "string" && value.trim() === "") ||
         typeof value === "boolean" ||
         !Number.isFinite(num) ||
         num <= 0
      ) {
         throw new Error(`Invalid number: ${value}`);
      }

      return num;
   }

   async createWorkout(dto: IDtoWorkout) {
      const validatedDate = this.validateDate(dto.dateWorkout);
      const validatedIntensity = (dto.intensity === "light" ? "light" : "heavy") as "light" | "heavy";
      const validatedDto = {
         dateWorkout: validatedDate,
         intensity: validatedIntensity,
      };

      try {
         return await this.trekerRepository.insertToWorkout(validatedDto);
      } catch (error) {
         console.error("Не удалось создать тренировку", error);
         throw new Error("Не удалось создать тренировку");
      }
   }

   async createExercise(dto: IDtoExercise) {
      const workout_id = this.validateNumber(dto.workout_id);
      const validateNameExercise = String(dto.nameExercise).trim();

      if (!validateNameExercise) {
         throw new Error("Название упражнения не может быть пустым");
      }

      const validatedDto = {
         workout_id,
         nameExercise: validateNameExercise,
      };

      try {
         return await this.trekerRepository.insertToExercise(validatedDto);
      } catch (error) {
         console.error("Не удалось создать упражнение", error);
         throw new Error("Не удалось создать упражнение");
      }
   }

   async createSet(dto: IDtoSet) {
      const validatedDto = {
         exercise_id: this.validateNumber(dto.exercise_id),
         replace: this.validateNumber(dto.replace),
         count: this.validateNumber(dto.count),
      };

      try {
         return await this.trekerRepository.insertToSet(validatedDto);
      } catch (error) {
         console.error("Не удалось создать подход", error);
         throw new Error("Не удалось создать подход");
      }
   }
   async getAllWorkouts() {
      return this.trekerRepository.getAllRowsWorkouts();
   }

   async getAllExercises() {
      return this.trekerRepository.getAllRowsExercises();
   }

   async getAllSets() {
      return this.trekerRepository.getAllRowsSets();
   }
   async deleteWorkout(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteWorkout(validatedId);
   }
}
