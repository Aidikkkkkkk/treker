import { View } from "react-native";
import CreateButtonDisign from "../global/CreateButton";
import CreateWeekModal from "./CreateWeekModal";
import { useWeeks } from "@/hooks/useWeeks";

export default function CreateButton() {
   const { showCreate, setShowCreate, createWeek } = useWeeks();
   return (
      <>
         <View>
            <CreateButtonDisign title="Новая неделя" onPress={() => setShowCreate(true)}></CreateButtonDisign>
         </View>
         <CreateWeekModal visible={showCreate} onClose={() => setShowCreate(false)} onCreate={createWeek} />
      </>
   );
}
