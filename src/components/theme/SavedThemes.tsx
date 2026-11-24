import { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useStyles, useSavedThemes, SavedTheme } from "@/context/ThemeContext";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";
import CustomModal from "../global/CustomModal";
import CustomList from "../global/CustomList";

type ModalState = null | "create" | SavedTheme;

export default function SavedThemes() {
   const { COLORS, LIST_ITEM_STYLES, MODAL_STYLES } = useStyles();
   const { savedThemes, saveTheme, renameTheme, loadTheme, deleteTheme } = useSavedThemes();
   const keyboardHeight = useKeyboardHeight();

   const [modal, setModal] = useState<ModalState>(null);
   const [name, setName] = useState("");

   const renaming = modal !== null && modal !== "create" ? modal : null;
   const fallbackName = `Тема ${savedThemes.length + 1}`;
   const disabled = renaming !== null && !name.trim();

   function openCreate() {
      setName("");
      setModal("create");
   }

   function openRename(theme: SavedTheme) {
      setName(theme.name);
      setModal(theme);
   }

   function close() {
      setModal(null);
      setName("");
   }

   function submit() {
      if (disabled) return;

      if (renaming) renameTheme(renaming.id, name);
      else saveTheme(name.trim() || fallbackName);

      close();
   }

   return (
      <View style={styles.wrap}>
         <View style={styles.header}>
            <Text style={{ color: COLORS.textPrimary, fontSize: 15, fontWeight: "600" }}>Сохранённые темы</Text>

            <Pressable onPress={openCreate} hitSlop={8}>
               <Text style={{ color: COLORS.accent, fontSize: 14 }}>＋ Сохранить текущую</Text>
            </Pressable>
         </View>

         {savedThemes.length === 0 ? (
            <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>Пока нет сохранённых тем</Text>
         ) : (
            <View style={styles.list}>
               <CustomList<SavedTheme>
                  data={savedThemes}
                  keyExtractor={(item) => item.id}
                  onPress={(item) => loadTheme(item.id)}
                  onEdit={openRename}
                  onDelete={(item) => deleteTheme(item.id)}
                  renderItem={({ item }) => (
                     <View style={styles.row}>
                        <Text style={LIST_ITEM_STYLES.title} numberOfLines={1}>
                           {item.name}
                        </Text>

                        <View style={styles.dots}>
                           {[item.colors.accent, item.colors.heavy, item.colors.light].map((color, i) => (
                              <View
                                 key={i}
                                 style={[styles.dot, { backgroundColor: color, borderColor: COLORS.border }]}
                              />
                           ))}
                        </View>
                     </View>
                  )}
               />
            </View>
         )}

         <CustomModal
            visible={modal !== null}
            onClose={close}
            title={renaming ? "Переименовать тему" : "Название темы"}
         >
            <TextInput
               value={name}
               onChangeText={setName}
               placeholder={fallbackName}
               placeholderTextColor={COLORS.textSecondary}
               maxLength={30}
               autoFocus
               selectTextOnFocus={renaming !== null}
               onSubmitEditing={submit}
               style={[
                  styles.input,
                  {
                     color: COLORS.textPrimary,
                     backgroundColor: COLORS.surfaceMuted,
                     borderColor: COLORS.border,
                  },
               ]}
            />

            <Pressable
               onPress={submit}
               disabled={disabled}
               style={[MODAL_STYLES.createButton, disabled && MODAL_STYLES.createButtonDisabled]}
            >
               <Text style={MODAL_STYLES.createButtonText}>Сохранить</Text>
            </Pressable>

            {/* поднимает содержимое над клавиатурой */}
            <View style={{ height: keyboardHeight }} />
         </CustomModal>
      </View>
   );
}

const styles = StyleSheet.create({
   wrap: { gap: 8 },
   header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
   list: { maxHeight: 220 },
   row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
   dots: { flexDirection: "row", gap: 4 },
   dot: { width: 14, height: 14, borderRadius: 7, borderWidth: 1 },
   input: {
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 48,
      marginBottom: 12,
   },
});
