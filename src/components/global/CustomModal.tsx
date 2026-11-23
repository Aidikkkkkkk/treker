import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import { useStyles } from "@/context/ThemeContext";
import { useMemo } from "react";
interface BaseModalProps {
   visible: boolean;
   title: string;
   onClose: () => void;
   children: React.ReactNode;
}

export default function CustomModal({ visible, title, onClose, children }: BaseModalProps) {
   const { COLORS, MODAL_STYLES } = useStyles();
   const styles = useMemo(
      () =>
         StyleSheet.create({
            header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
            closeButton: {
               width: 30,
               height: 30,
               borderRadius: 15,
               backgroundColor: COLORS.surfaceMuted,
               justifyContent: "center",
               alignItems: "center",
            },
            closeButtonPressed: { opacity: 0.6 },
            closeText: { color: COLORS.textSecondary, fontSize: 23, lineHeight: 26, fontWeight: "400" },
         }),
      [COLORS, MODAL_STYLES],
   );

   return (
      <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={onClose}>
         <View style={MODAL_STYLES.overlay}>
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
            <View style={MODAL_STYLES.modal}>
               <View style={MODAL_STYLES.indicatorContainer}>
                  <View style={MODAL_STYLES.indicator} />
               </View>
               <View style={styles.header}>
                  <Text style={MODAL_STYLES.title}>{title}</Text>
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
