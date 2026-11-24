import { useMemo, useState } from "react";
import { rainbow, shades, harmony, neutrals, Scheme } from "./color";
import Tag from "./Tag";
import { Token } from "@/styles";
import CustomModal from "../global/CustomModal";
import { useColorPicker } from "@/hooks/useColorPicker";
import { useStyles } from "@/context/ThemeContext";
import { View, Text, Pressable, ScrollView, useWindowDimensions } from "react-native";

interface BaseProps {
   children: React.ReactNode;
   title: string;
   tokens: Token[];
}

function Row({
   title,
   colors,
   onPick,
   onApply,
}: {
   title: string;
   colors: string[];
   onPick: (hex: string) => void;
   onApply?: () => void;
}) {
   const { COLORS } = useStyles();
   return (
      <View style={{ gap: 4 }}>
         <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: COLORS.textPrimary, fontSize: 13 }}>{title}</Text>
            <Pressable onPress={onApply} hitSlop={8}>
               <Text
                  style={{
                     color: COLORS.textPrimary,
                     borderRadius: 4,
                     borderWidth: 1,
                     borderColor: COLORS.border,
                     padding: 2,
                  }}
               >
                  🎨 Применить схему
               </Text>
            </Pressable>
         </View>
         <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
            {colors.map((color, i) => (
               <Pressable
                  key={i}
                  onPress={() => onPick(color)}
                  style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: color }}
               />
            ))}
         </View>
      </View>
   );
}

export default function PaletteForm({ children, title, tokens }: BaseProps) {
   const [visibility, setVisibility] = useState(false);
   const { selected, current, hsl, baseHue, select, pick, applyScheme, reset } = useColorPicker(tokens);
   const { height } = useWindowDimensions();

   const sections = useMemo(() => {
      const h = harmony(baseHue);
      return [
         { title: "Радуга", colors: rainbow(72) },
         { title: "Оттенки", colors: shades(baseHue, 10), scheme: "mono" as Scheme },
         { title: "Комплементарные", colors: h.complementary, scheme: "complementary" as Scheme },
         { title: "Триадные", colors: h.triadic, scheme: "triadic" as Scheme },
         { title: "Соседние", colors: h.analogous, scheme: "analogous" as Scheme },
         { title: "Нейтральные", colors: neutrals(10) },
      ];
   }, [baseHue]);

   return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
         <View style={{ flex: 1 }}>{children}</View>
         <Pressable onPress={() => setVisibility(true)} hitSlop={8}>
            <Text>✏️</Text>
         </Pressable>

         <CustomModal visible={visibility} onClose={() => setVisibility(false)} title={title}>
            <ScrollView style={{ maxHeight: height * 0.7 }} showsVerticalScrollIndicator={false}>
               <View style={{ gap: 12 }}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                     {tokens.map((t) => (
                        <Pressable
                           key={t}
                           onPress={() => select(t)}
                           style={{
                              borderWidth: 2,
                              borderRadius: 10,
                              paddingHorizontal: 6,
                              paddingVertical: 4,
                              borderColor: t === selected ? "#fff" : "transparent",
                           }}
                        >
                           <Tag tokens={[t]} />
                        </Pressable>
                     ))}
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                     <Text style={{ fontSize: 12 }}>
                        {current} · H {hsl.h} S {hsl.s} L {hsl.l}
                     </Text>
                     <Pressable onPress={reset} hitSlop={8}>
                        <Text style={{ fontSize: 12 }}>Сбросить</Text>
                     </Pressable>
                  </View>

                  {sections.map((s) => (
                     <Row
                        key={s.title}
                        title={s.title}
                        colors={s.colors}
                        onPick={pick}
                        onApply={s.scheme ? () => applyScheme(s.scheme) : undefined}
                     />
                  ))}
               </View>
            </ScrollView>
         </CustomModal>
      </View>
   );
}
