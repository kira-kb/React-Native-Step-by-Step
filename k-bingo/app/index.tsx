import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BingoLayout from "../components/BingoLayout";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [patterns, setPatterns] = useState(1);
  const [cards, setCards] = useState(1);

  const renderBingoCards = () => {
    return Array.from({ length: cards }).map((_, index) => (
      <View key={index} className="my-2">
        <BingoLayout patternsToCheck={patterns} />
      </View>
    ));
  };

  return (
    <SafeAreaView
      className={`${
        colorScheme === "dark" ? "bg-slate-900" : "bg-slate-100"
      } h-full`}
    >
      <ScrollView>
        <View className="flex justify-center items-center mt-3">
          <Text className="text-lg font-bold text-cyan-700">
            KIRA BINGO CHECKER
          </Text>

          <View className="w-full px-4 mt-4 flex flex-row justify-around">
            <View className="flex flex-row gap-2 justify-center items-center">
              <Text className="border-cyan-950 border-b-2 text-black dark:text-white">
                X Patterns:
              </Text>
              <TextInput
                className="w-16 px-2 border-cyan-950 border-b-2 text-black dark:text-white"
                placeholder="Patterns"
                keyboardType="numeric"
                value={patterns.toString()}
                onChangeText={(num) => setPatterns(+num)}
              />
            </View>

            <View className="flex flex-row gap-2 justify-center items-center">
              <Text className="border-red-500 border-b-2 text-black dark:text-white">
                X Cards:
              </Text>
              <TextInput
                className="w-16 px-2 border-red-500 border-b-2 text-black dark:text-white"
                placeholder="Cards"
                keyboardType="numeric"
                value={cards.toString()}
                onChangeText={(num) => setCards(+num)}
              />
            </View>
          </View>
        </View>

        <View className="mt-4 px-4">{renderBingoCards()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
