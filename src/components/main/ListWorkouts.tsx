import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";

import { useWorkouts } from "@/hooks/useWorkouts";
import { IWorkoutResult } from "@/types";

function TrashIcon({ active }: { active: boolean }) {
   const color = active ? "#ff8a8a" : "#6f6a80";

   return (
      <View style={trash.wrap}>
         {/* крышка + ручка: при нажатии приоткрывается */}
         <View
            style={[
               trash.lidGroup,
               active && { transform: [{ translateX: -2 }, { translateY: -2 }, { rotate: "-16deg" }] },
            ]}
         >
            <View style={[trash.handle, { borderColor: color }]} />
            <View style={[trash.lid, { backgroundColor: color }]} />
         </View>

         {/* корпус с двумя полосками */}
         <View style={[trash.body, { borderColor: color }]}>
            <View style={[trash.line, { backgroundColor: color }]} />
            <View style={[trash.line, { backgroundColor: color }]} />
         </View>
      </View>
   );
}

export default function ListWorkouts() {
   const { workouts, deleteWorkout } = useWorkouts();

   function confirmDelete(item: IWorkoutResult, weekNumber: number) {
      Alert.alert("Удалить неделю?", `Неделя ${weekNumber} будет удалена без возможности восстановления.`, [
         { text: "Отмена", style: "cancel" },
         { text: "Удалить", style: "destructive", onPress: () => deleteWorkout(item.id) },
      ]);
   }

   function renderWorkout({ item, index }: { item: IWorkoutResult; index: number }) {
      const weekNumber = workouts.length - index;
      const isHeavy = item.intensity === "heavy";

      return (
         <View style={styles.card}>
            <View style={styles.header}>
               <Text style={styles.title}>Неделя {weekNumber}</Text>

               <View style={[styles.badge, isHeavy ? styles.heavyBadge : styles.lightBadge]}>
                  <Text style={[styles.badgeText, isHeavy ? styles.heavyText : styles.lightText]}>
                     {isHeavy ? "Тяжёлая" : "Лёгкая"}
                  </Text>
               </View>
            </View>

            <View style={styles.footer}>
               <Text style={styles.date}>{new Date(item.dateWorkout).toLocaleDateString()}</Text>

               <Pressable
                  onPress={() => confirmDelete(item, weekNumber)}
                  hitSlop={10}
                  style={({ pressed }) => [styles.deleteBtn, pressed && styles.deleteBtnPressed]}
               >
                  {({ pressed }) => <TrashIcon active={pressed} />}
               </Pressable>
            </View>
         </View>
      );
   }

   return (
      <FlatList
         data={workouts}
         keyExtractor={(item) => item.id.toString()}
         contentContainerStyle={styles.list}
         showsVerticalScrollIndicator={false}
         renderItem={renderWorkout}
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
      backgroundColor: "#1b1924",
      borderColor: "#302c40",
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 17,
      borderRadius: 26,
      marginBottom: 14,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 7,
   },
   footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   title: {
      color: "#ece8f4",
      fontSize: 20,
      fontWeight: "700",
   },
   date: {
      color: "#a59fb5",
      fontSize: 15,
   },
   deleteBtn: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#23202e",
      alignItems: "center",
      justifyContent: "center",
   },
   deleteBtnPressed: {
      backgroundColor: "#3a2229",
   },
   badge: {
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 30,
   },
   heavyBadge: {
      backgroundColor: "#382519",
   },
   lightBadge: {
      backgroundColor: "#2c214d",
   },
   badgeText: {
      fontSize: 14,
      fontWeight: "700",
   },
   heavyText: {
      color: "#efb18d",
   },
   lightText: {
      color: "#c5b3ff",
   },
});
