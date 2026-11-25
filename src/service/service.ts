import { TrekerRepository } from "./repository";
import {
   IDtoWorkout,
   IDtoExercise,
   IDtoWeek,
   IDtoExerciseCatalog,
   IDtoRep,
   IDtoExerciseCatalogChange,
   IDtoExerciseChange,
   IDtoRepChange,
   IDtoWeekChange,
   IDtoWorkoutChange,
   IServiceError,
} from "@/types";

export class ServiceError extends Error implements IServiceError {
   public error: string;

   constructor(message: string, error: string = "") {
      super(message);

      this.name = "ServiceError";
      this.error = error;

      Object.setPrototypeOf(this, ServiceError.prototype);
   }
}

export class TrekerService {
   private trekerRepository: TrekerRepository;
   constructor(trekerRepository: TrekerRepository) {
      this.trekerRepository = trekerRepository;
   }

   private handleError(message: string, error: unknown): never {
      throw new ServiceError(message, error instanceof Error ? error.message : String(error));
   }

   private validateDate(dateString: string): string {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
         throw new ServiceError("Указана некорректная дата");
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
         throw new ServiceError("Число должно быть больше 0");
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
         this.handleError("Не удалось создать новую неделю", error);
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
         this.handleError("Не удалось создать новую тренировку", error);
      }
   }

   async createExercise(dto: IDtoExercise) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new ServiceError("Название упражнения не может быть пустым");
      }
      const validatedDto = {
         workout_id: this.validateNumber(dto.workout_id),
         nameExercise: validateNameExercise,
      };
      try {
         return await this.trekerRepository.insertToExercise(validatedDto);
      } catch (error) {
         this.handleError("Не удалось создать новое упражнение", error);
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
         this.handleError("Не удалось создать новый подход", error);
      }
   }
   async createExerciseCatalog(dto: IDtoExerciseCatalog) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new ServiceError("Название упражнения не может быть пустым");
      }
      const validatedDto = {
         nameExercise: validateNameExercise,
      };
      let existing;
      try {
         existing = await this.trekerRepository.getRowExerciseCatalogByName(validatedDto.nameExercise);
      } catch (error) {
         this.handleError("Не удалось проверить каталог упражнений", error);
      }
      if (existing) {
         throw new ServiceError("Упражнение с таким названием уже есть в каталоге");
      }
      try {
         return await this.trekerRepository.insertToExerciseCatalog(validatedDto);
      } catch (error) {
         this.handleError("Не удалось добавить упражнение в каталог", error);
      }
   }
   async getAllWeeks() {
      try {
         return await this.trekerRepository.getAllRowsWeeks();
      } catch (error) {
         this.handleError("Не удалось получить список недель", error);
      }
   }
   async getAllWorkouts(week_id: number) {
      const validatedId = this.validateNumber(week_id);
      try {
         return await this.trekerRepository.getAllRowsWorkouts(validatedId);
      } catch (error) {
         this.handleError("Не удалось получить список тренировок", error);
      }
   }

   async getAllExercises(workout_id: number) {
      const validatedId = this.validateNumber(workout_id);
      try {
         return await this.trekerRepository.getAllRowsExercises(validatedId);
      } catch (error) {
         this.handleError("Не удалось получить список упражнений", error);
      }
   }

   async getAllReps(exercise_id: number) {
      const validatedId = this.validateNumber(exercise_id);
      try {
         return await this.trekerRepository.getAllRowsReps(validatedId);
      } catch (error) {
         this.handleError("Не удалось получить список подходов", error);
      }
   }

   async getAllExerciseCatalog() {
      try {
         return await this.trekerRepository.getAllRowsExerciseCatalog();
      } catch (error) {
         this.handleError("Не удалось получить каталог упражнений", error);
      }
   }

   async deleteWorkout(id: number) {
      const validatedId = this.validateNumber(id);
      try {
         return await this.trekerRepository.deleteWorkout(validatedId);
      } catch (error) {
         this.handleError("Не удалось удалить тренировку", error);
      }
   }

   async deleteWeek(id: number) {
      const validatedId = this.validateNumber(id);
      try {
         return await this.trekerRepository.deleteWeek(validatedId);
      } catch (error) {
         this.handleError("Не удалось удалить неделю", error);
      }
   }

   async deleteExercise(id: number) {
      const validatedId = this.validateNumber(id);
      try {
         return await this.trekerRepository.deleteExercise(validatedId);
      } catch (error) {
         this.handleError("Не удалось удалить упражнение", error);
      }
   }

   async deleteRep(id: number) {
      const validatedId = this.validateNumber(id);
      try {
         return await this.trekerRepository.deleteRep(validatedId);
      } catch (error) {
         this.handleError("Не удалось удалить подход", error);
      }
   }

   async deleteFromExerciseCatalog(id: number) {
      const validatedId = this.validateNumber(id);
      try {
         return await this.trekerRepository.deleteFromExerciseCatalog(validatedId);
      } catch (error) {
         this.handleError("Не удалось удалить упражнение из каталога", error);
      }
   }

   async changeWeek(dto: IDtoWeekChange) {
      const validatedIntensity = (dto.intensity === "light" ? "light" : "heavy") as "light" | "heavy";
      const validatedDto: IDtoWeekChange = {
         id: this.validateNumber(dto.id),
         intensity: validatedIntensity,
      };
      try {
         return await this.trekerRepository.changeDataWeek(validatedDto);
      } catch (error) {
         this.handleError("Не удалось изменить неделю", error);
      }
   }

   async changeWorkout(dto: IDtoWorkoutChange) {
      const validatedDto: IDtoWorkoutChange = {
         id: this.validateNumber(dto.id),
         dateWorkout: this.validateDate(dto.dateWorkout),
      };
      try {
         return await this.trekerRepository.changeDataWorkout(validatedDto);
      } catch (error) {
         this.handleError("Не удалось изменить тренировку", error);
      }
   }

   async changeExercise(dto: IDtoExerciseChange) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new ServiceError("Название упражнения не может быть пустым");
      }
      const validatedDto: IDtoExerciseChange = {
         id: this.validateNumber(dto.id),
         nameExercise: validateNameExercise,
      };
      try {
         return await this.trekerRepository.changeDataExercise(validatedDto);
      } catch (error) {
         this.handleError("Не удалось изменить упражнение", error);
      }
   }
   async changeRep(dto: IDtoRepChange) {
      const validatedDto: IDtoRepChange = {
         id: this.validateNumber(dto.id),
         reps: this.validateNumber(dto.reps),
         weight: this.validateNumber(dto.weight),
      };
      try {
         return await this.trekerRepository.changeDataRep(validatedDto);
      } catch (error) {
         this.handleError("Не удалось изменить подход", error);
      }
   }

   async changeExerciseCatalog(dto: IDtoExerciseCatalogChange) {
      const validateNameExercise = String(dto.nameExercise).trim();
      if (!validateNameExercise) {
         throw new ServiceError("Название упражнения не может быть пустым");
      }
      const validatedDto: IDtoExerciseCatalogChange = {
         id: this.validateNumber(dto.id),
         nameExercise: validateNameExercise,
      };
      try {
         return await this.trekerRepository.changeDataExerciseCatalog(validatedDto);
      } catch (error) {
         this.handleError("Не удалось изменить упражнение в каталоге", error);
      }
   }
}
