import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BingoLayout from "../components/BingoLayout"; // Adjust the path according to your file structure

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [patterns, setPatterns] = useState(1);

  return (
    <SafeAreaView
      className={`${
        colorScheme === "dark" ? "bg-slate-900" : "bg-slate-100"
      } h-full`}
    >
      <ScrollView>
        <View className="flex justify-center items-center mt-6">
          <Text className="text-lg font-bold text-cyan-700">
            KIRA BINGO CHECKER
          </Text>
          <View className="w-full px-4 mt-4 flex justify-center items-center flex-row gap-2">
            <Text className="border-cyan-950 border-b-2 text-black dark:text-white">
              How many patterns :
            </Text>
            <TextInput
              className="w-16 border-cyan-950 border-b-2 border-l-2 text-black dark:text-white"
              placeholder="How many patterns"
              keyboardType="numeric"
              value={patterns.toString()}
              onChangeText={(num) => setPatterns(+num)}
            />
          </View>
        </View>

        {/* Bingo Layout */}
        <View className="mt-3">
          <BingoLayout patternsToCheck={patterns} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
