import { Redirect } from "expo-router";
import "react-native-get-random-values";

export default function Home() {
  return <Redirect href="/(auth)/welcome" />;
}

// "expo": "~52.0.27",
// "expo-blur": "~14.0.2",
// "expo-constants": "~17.0.4",
// "expo-linking": "~7.0.4",
// "expo-symbols": "~0.2.1",
