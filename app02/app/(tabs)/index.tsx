import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";

import IcedCoffee from "@/assets/images/iced-coffee.png";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IcedCoffee}
        resizeMode="cover"
        // className="h-full w-full bg-cover"
        style={styles.image}
      >
        <Text
          // className="text-6xl text-white font-bold p-2 w-full text-center"
          // style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          style={styles.text}
        >
          Coffie shopp
        </Text>
        <Link href={"/contact"} style={{ marginHorizontal: "auto" }} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 42,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: 120,
  },
  link: {
    fontSize: 42,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
  },
});

export default Index;

// setting up tailwindcss in react-native

// npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
// npx tailwindcss init
