export interface IWeekResult {
   id: number;
   intensity: "light" | "heavy";
}

export interface IWorkoutResult {
   id: number;
   dateWorkout: string;
}

export interface IExerciseResult {
   id: number;
   workout_id: number;
   nameExercise: string;
}

export interface IRepResult {
   id: number;
   exercise_id: number;
   reps: number;
   weight: number;
}

export interface IExerciseCatalogResult {
   id: number;
   nameExercise: string;
}

export interface IDtoWeek {
   intensity: "light" | "heavy";
}

export interface IDtoWorkout {
   dateWorkout: string;
   week_id: number;
}

export interface IDtoExercise {
   workout_id: number;
   nameExercise: string;
}

export interface IDtoRep {
   exercise_id: number;
   reps: number;
   weight: number;
}

export interface IDtoExerciseCatalog {
   nameExercise: string;
}

export interface IDtoWeekChange {
   id: number;
   intensity: "light" | "heavy";
}

export interface IDtoWorkoutChange {
   id: number;
   dateWorkout: string;
}

export interface IDtoExerciseChange {
   id: number;
   nameExercise: string;
}

export interface IDtoRepChange {
   id: number;
   reps: number;
   weight: number;
}

export interface IDtoExerciseCatalogChange {
   id: number;
   nameExercise: string;
}
export interface BaseModalProps {
   visible: boolean;
   onClose: () => void;
}
export type CreateModalProps<TCreate> = BaseModalProps & {
   mode: "create";
   onCreate: (dto: TCreate) => void;
};
export type EditModalProps<TEdit> = BaseModalProps & {
   mode: "edit";
   initialData: TEdit;
   onChange: (dto: TEdit) => void;
};
export type EntityModalProps<TCreate, TEdit> = CreateModalProps<TCreate> | EditModalProps<TEdit>;

export interface BaseListProps<T extends { id: number }> {
   items: T[];
   onDelete: (id: number) => void;
   onEdit?: (item: T) => void;
}
export interface IServiceError {
   message: string;
   error: string;
}
