import { View, FlatList, StyleSheet, Pressable, ListRenderItem } from "react-native";

import { COLORS } from "@/styles";

type ListProps<T> = {
   data: T[];
   renderItem: ListRenderItem<T>;
   keyExtractor: (item: T) => string;
   onDelete?: (item: T) => void;
   onPress?: (item: T) => void;
   contentContainerStyle?: object;
};

function TrashIcon({ active }: { active: boolean }) {
   const color = active ? COLORS.danger : COLORS.iconMuted;

   return (
      <View style={trash.wrap}>
         <View
            style={[
               trash.lidGroup,
               active && {
                  transform: [{ translateX: -2 }, { translateY: -2 }, { rotate: "-16deg" }],
               },
            ]}
         >
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

export default function List<T>({
   data,
   renderItem,
   keyExtractor,
   onDelete,
   onPress,
   contentContainerStyle,
}: ListProps<T>) {
   return (
      <FlatList
         data={data}
         keyExtractor={keyExtractor}
         contentContainerStyle={[styles.list, contentContainerStyle]}
         showsVerticalScrollIndicator={false}
         renderItem={({ item, index }) => (
            <Pressable
               onPress={() => onPress?.(item)}
               style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
               <View style={styles.content}>{renderItem({ item, index, separators: {} as any })}</View>

               {onDelete && (
                  <Pressable
                     onPress={() => onDelete(item)}
                     hitSlop={10}
                     style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
                  >
                     {({ pressed }) => <TrashIcon active={pressed} />}
                  </Pressable>
               )}
            </Pressable>
         )}
      />
   );
}

const trash = StyleSheet.create({
   wrap: {
      width: 14,
      height: 16,
      alignItems: "center",
   },
   lidGroup: {
      alignItems: "center",
   },
   handle: {
      width: 6,
      height: 3,
      borderWidth: 1.5,
      borderBottomWidth: 0,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
   },
   lid: {
      width: 14,
      height: 1.5,
      borderRadius: 1,
   },
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
   line: {
      width: 1.2,
      height: 5,
      borderRadius: 1,
   },
});

const styles = StyleSheet.create({
   list: {
      flexGrow: 1,
      justifyContent: "center",
      paddingTop: 22,
      paddingBottom: 16,
   },
   card: {
      width: "100%",
      backgroundColor: COLORS.surface,
      borderColor: COLORS.border,
      borderWidth: 1,
      borderLeftWidth: 4,
      borderLeftColor: COLORS.accent,
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 26,
      marginBottom: 14,
   },
   cardPressed: {
      opacity: 0.85,
   },
   content: {
      flex: 1,
   },
   deleteBtn: {
      position: "absolute",
      right: 12,
      bottom: 12,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: COLORS.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
   },
   deleteBtnPressed: {
      backgroundColor: COLORS.dangerSoft,
   },
});
