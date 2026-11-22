import { Alert } from "react-native";

export default function ConfirmDelete<T extends { id: number }>(
   item: T,
   textAboutComponent: string,
   onDelete: (id: number) => void,
) {
   Alert.alert(`Удалить ${textAboutComponent}?`, null, [
      { text: "Отмена", style: "cancel" },
      {
         text: "Удалить",
         style: "destructive",
         onPress: () => onDelete(item.id),
      },
   ]);
}
