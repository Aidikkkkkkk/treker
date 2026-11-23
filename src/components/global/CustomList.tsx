import { FlatList, Pressable, StyleSheet, View, ListRenderItem } from "react-native";
import { useStyles } from "@/context/ThemeContext";
type ListProps<T> = {
   data: T[];
   renderItem: ListRenderItem<T>;
   keyExtractor: (item: T) => string;
   onDelete: (item: T) => void;
   onPress: (item: T) => void;
   contentContainerStyle?: object;
};

function TrashIcon({ active }: { active: boolean }) {
   const { COLORS } = useStyles();
   const color = active ? COLORS.danger : COLORS.iconMuted;
   return (
      <View style={trash.wrap}>
         <View style={[trash.lidGroup, active && trash.lidActive]}>
            <View style={[trash.handle, { borderColor: color }]} />
            <View style={[trash.lid, { backgroundColor: color }]} />
         </View>
         <View style={[trash.body, { borderColor: color }]}>
            <View style={[trash.line, { backgroundColor: color }]} />
            <View style={[trash.line, { backgroundColor: color }]} />
         </View>
      </View>
   );
}

export default function CustomList<T>({
   data,
   renderItem,
   keyExtractor,
   onDelete,
   onPress,
   contentContainerStyle,
}: ListProps<T>) {
   const { COLORS } = useStyles();
   const styles = StyleSheet.create({
      list: {
         flexGrow: 1,
         justifyContent: "flex-start",
         paddingTop: 12,
         paddingBottom: 12,
      },
      card: {
         width: "100%",
         maxWidth: 560,
         alignSelf: "center",
         backgroundColor: COLORS.surface,
         borderColor: COLORS.border,
         borderWidth: 1,
         borderLeftWidth: 3,
         borderLeftColor: COLORS.accent,
         paddingHorizontal: 16,
         paddingVertical: 12,
         borderRadius: 18,
         marginBottom: 8,
      },
      cardPressed: { opacity: 0.82 },
      content: { flex: 1, minHeight: 38 },
      deleteBtn: {
         position: "absolute",
         right: 10,
         bottom: 9,
         width: 28,
         height: 28,
         borderRadius: 14,
         backgroundColor: COLORS.surfaceMuted,
         alignItems: "center",
         justifyContent: "center",
      },
      deleteBtnPressed: { backgroundColor: COLORS.dangerSoft },
   });

   return (
      <FlatList<T>
         data={data}
         keyExtractor={keyExtractor}
         contentContainerStyle={[styles.list, contentContainerStyle]}
         showsVerticalScrollIndicator={false}
         renderItem={(info) => (
            <Pressable
               onPress={() => onPress(info.item)}
               style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
               <View style={styles.content}>{renderItem(info)}</View>
               <Pressable
                  onPress={() => onDelete(info.item)}
                  hitSlop={10}
                  style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
               >
                  {({ pressed }) => <TrashIcon active={pressed} />}
               </Pressable>
            </Pressable>
         )}
      />
   );
}

const trash = StyleSheet.create({
   wrap: { width: 14, height: 16, alignItems: "center" },
   lidGroup: { alignItems: "center" },
   lidActive: { transform: [{ translateX: -2 }, { translateY: -2 }, { rotate: "-16deg" }] },
   handle: {
      width: 6,
      height: 3,
      borderWidth: 1.5,
      borderBottomWidth: 0,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
   },
   lid: { width: 14, height: 1.5, borderRadius: 1 },
   body: {
      width: 11,
      height: 10,
      marginTop: 1.5,
      borderWidth: 1.5,
      borderTopWidth: 0,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBottom: 1,
   },
   line: { width: 1.2, height: 5, borderRadius: 1 },
});
