import { useEffect, useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { EntityModalProps, IDtoExerciseCatalog, IDtoExerciseCatalogChange } from "@/types";
import CustomModal from "../global/CustomModal";
import { useStyles } from "@/context/ThemeContext";

type Props = EntityModalProps<IDtoExerciseCatalog, IDtoExerciseCatalogChange>;

export default function ExerciseCatalogModal(props: Props) {
   const { COLORS } = useStyles();
   const initial = props.mode === "edit" ? props.initialData.nameExercise : "";
   const [text, setText] = useState(initial);

   useEffect(() => {
      if (props.visible) setText(initial);
   }, [props.visible, initial]);

   const styles = StyleSheet.create({
      input: {
         minHeight: 110,
         padding: 16,
         borderRadius: 17,
         backgroundColor: COLORS.surfaceMuted,
         borderWidth: 1,
         borderColor: COLORS.border,
         color: COLORS.textPrimary,
         fontSize: 16,
         textAlignVertical: "top",
         marginBottom: 18,
      },
   });

   function handleSubmit() {
      const nameExercise = text.trim();
      if (!nameExercise) return;
      if (props.mode === "edit") props.onChange({ id: props.initialData.id, nameExercise });
      else props.onCreate({ nameExercise });
      props.onClose();
   }

   const isEditing = props.mode === "edit";

   return (
      <CustomModal
         visible={props.visible}
         title={isEditing ? "Изменить упражнение" : "Добавить упражнение"}
         onClose={props.onClose}
         submit={{
            title: isEditing ? "Сохранить" : "Добавить в каталог",
            onPress: handleSubmit,
            disabled: !text.trim(),
         }}
      >
         <TextInput
            style={styles.input}
            placeholder="Например, жим лёжа"
            placeholderTextColor={COLORS.textSecondary}
            value={text}
            onChangeText={setText}
            multiline
         />
      </CustomModal>
   );
}
