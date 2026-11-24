import { View, Text, Pressable } from "react-native";
import CustomModal from "../global/CustomModal";
import { useState } from "react";

interface BaseProps {
   children: React.ReactNode;
}
export default function EditForm({ children }: BaseProps) {
   const [visibility, setVisibility] = useState(false);
   function handlerClose() {
      setVisibility(false);
   }
   return (
      <View>
         <View>
            <Pressable onPress={() => setVisibility(true)}>
               <Text>✏️</Text>
            </Pressable>
         </View>
         <View>{children}</View>
         <CustomModal visible={visibility} onClose={handlerClose} title="карандаш" children={children}></CustomModal>
      </View>
   );
}
