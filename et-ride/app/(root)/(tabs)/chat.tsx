import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-red-500 font-bold">Chat Page</Text>
    </SafeAreaView>
  );
}
