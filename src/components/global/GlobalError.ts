import { Alert } from "react-native";

interface GlobalErrorPayload {
   message: string;
   error?: string;
}

export const GlobalError = {
   show({ message, error }: GlobalErrorPayload) {
      Alert.alert(message, error);
   },
};
