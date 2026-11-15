import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { COLORS } from "@/styles";

interface BaseModalProps {
   visible: boolean;
   title: string;
   onClose: () => void;
   children: React.ReactNode;
}
export default function CustomModal({ visible, title, onClose, children }: BaseModalProps) {
   return (
      <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
         <View style={styles.overlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            <View style={styles.modal}>
               <View style={styles.indicatorContainer}>
                  <View style={styles.indicator} />
               </View>
               <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <Pressable
                     onPress={onClose}
                     hitSlop={12}
                     style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
                  >
                     <Text style={styles.closeText}>×</Text>
                  </Pressable>
               </View>
               {children}
            </View>
         </View>
      </Modal>
   );
}

const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "transparent",
   },
   modal: {
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 24,
   },
   indicatorContainer: {
      alignItems: "center",
      marginBottom: 16,
   },
   indicator: {
      width: 52,
      height: 6,
      borderRadius: 10,
      backgroundColor: COLORS.handle,
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
   },
   title: {
      color: COLORS.textPrimary,
      fontSize: 22,
      fontWeight: "700",
   },
   closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: COLORS.surfaceMuted,
      justifyContent: "center",
      alignItems: "center",
   },
   closeButtonPressed: {
      opacity: 0.6,
   },
   closeText: {
      color: COLORS.textSecondary,
      fontSize: 25,
      lineHeight: 28,
      fontWeight: "400",
   },
});
