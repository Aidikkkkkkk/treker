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
   private validateNumber(value: number): boolean {
      return typeof value === "number" && Number.isFinite(value) && value > 0;
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
      if (!this.validateNumber(dto.workout_id)) throw new Error("Данной тренировки не существует");
      const validateNameExercise = String(dto.nameExercise);
      const validatedDto = {
         workout_id: dto.workout_id,
         nameExercise: validateNameExercise,
      };
      try {
         return await this.trekerRepository.insertToExercise(validatedDto);
      } catch (error) {
         console.error("Не удалось создать тренировку");
         throw new Error("Не удалось создать тренировку");
      }
   }
   async createSet(dto: IDtoSet) {
      if (
         !this.validateNumber(dto.exercise_id) ||
         !this.validateNumber(dto.replace) ||
         !this.validateNumber(dto.count)
      ) {
         throw new Error("Некорректное число");
      }

      try {
         return await this.trekerRepository.insertToSet(dto);
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
}
