import { FlatList, StyleSheet } from "react-native";

import { IWorkoutResult } from "@/types";

import WorkoutCard from "./ WorkoutCard";

interface WorkoutListProps {
   workouts: IWorkoutResult[];
   loading: boolean;
}

export default function WorkoutList({ workouts, loading }: WorkoutListProps) {
   if (loading) return null;

   return (
      <FlatList
         data={workouts}
         keyExtractor={(item) => item.id.toString()}
         contentContainerStyle={styles.list}
         showsVerticalScrollIndicator={false}
         renderItem={({ item, index }) => <WorkoutCard workout={item} weekNumber={workouts.length - index} />}
      />
   );
}

const styles = StyleSheet.create({
   list: {
      flexGrow: 1,
      justifyContent: "center",
      paddingTop: 22,
      paddingBottom: 16,
   },
});
