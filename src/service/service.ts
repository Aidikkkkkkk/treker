import { TrekerRepository } from "./repository";
import { IDtoWorkout, IDtoExercise, IDtoWeek, IDtoExerciseCatalog, IDtoRep } from "@/types";

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
   async createWeek(dto: IDtoWeek) {
      const validatedIntensity = (dto.intensity === "light" ? "light" : "heavy") as "light" | "heavy";
      const validatedDto = {
         intensity: validatedIntensity,
      };
      try {
         return await this.trekerRepository.insertToWeek(validatedDto);
      } catch (error) {
         console.error("Не удалось создать неделю", error);
         throw new Error("Не удалось создать неделю");
      }
   }
   async createWorkout(dto: IDtoWorkout) {
      const validatedDto = {
         dateWorkout: this.validateDate(dto.dateWorkout),
         week_id: this.validateNumber(dto.week_id),
      };
      try {
         return await this.trekerRepository.insertToWorkout(validatedDto);
      } catch (error) {
         console.error("Не удалось создать тренировку", error);
         throw new Error("Не удалось создать тренировку");
      }
   }
   async createExercise(dto: IDtoExercise) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new Error("Название упражнения не может быть пустым");
      }
      const validatedDto = {
         workout_id: this.validateNumber(dto.workout_id),
         nameExercise: validateNameExercise,
      };
      try {
         return await this.trekerRepository.insertToExercise(validatedDto);
      } catch (error) {
         console.error("Не удалось создать упражнение", error);
         throw new Error("Не удалось создать упражнение");
      }
   }
   async createRep(dto: IDtoRep) {
      const validatedDto = {
         exercise_id: this.validateNumber(dto.exercise_id),
         reps: this.validateNumber(dto.reps),
         weight: this.validateNumber(dto.weight),
      };
      try {
         return await this.trekerRepository.insertToRep(validatedDto);
      } catch (error) {
         console.error("Не удалось создать подход", error);
         throw new Error("Не удалось создать подход");
      }
   }
   async createExerciseCatalog(dto: IDtoExerciseCatalog) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new Error("Название упражнения не может быть пустым");
      }
      const validatedDto = {
         nameExercise: validateNameExercise,
      };
      const existing = await this.trekerRepository.getRowExerciseCatalogByName(validatedDto.nameExercise);
      if (existing) {
         throw new Error("Упражнение с таким названием уже есть в каталоге");
      }
      try {
         return await this.trekerRepository.insertToExerciseCatalog(validatedDto);
      } catch (error) {
         console.error("Не удалось добавить упражнение в каталог", error);
         throw new Error("Не удалось добавить упражнение в каталог");
      }
   }
   async getAllWeeks() {
      return this.trekerRepository.getAllRowsWeeks();
   }
   async getAllWorkouts(week_id: number) {
      const validatedId = this.validateNumber(week_id);
      return this.trekerRepository.getAllRowsWorkouts(validatedId);
   }
   async getAllExercises(workout_id: number) {
      const validateId = this.validateNumber(workout_id);
      return this.trekerRepository.getAllRowsExercises(validateId);
   }
   async getAllReps(exercise_id: number) {
      const validatedId = this.validateNumber(exercise_id);
      return this.trekerRepository.getAllRowsReps(validatedId);
   }
   async getAllExerciseCatalog() {
      return this.trekerRepository.getAllRowsExerciseCatalog();
   }
   async deleteWorkout(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteWorkout(validatedId);
   }
   async deleteWeek(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteWeek(validatedId);
   }
   async deleteExercise(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteExercise(validatedId);
   }
   async deleteRep(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteRep(validatedId);
   }
   async deleteFromExerciseCatalog(id: number) {
      const validatedId = this.validateNumber(id);
      return this.trekerRepository.deleteFromExerciseCatalog(validatedId);
   }
}
