import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  Vibration,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";

// Define row, column, diagonal, and corner patterns
const ROW_PATTERNS = [
  [0, 1, 2, 3, 4], // First row
  [5, 6, 7, 8, 9], // Second row
  [10, 11, 12, 13, 14], // Third row (including the "Free" space in the center)
  [15, 16, 17, 18, 19], // Fourth row
  [20, 21, 22, 23, 24], // Fifth row
];
const COL_PATTERNS = [
  [0, 5, 10, 15, 20], // B column
  [1, 6, 11, 16, 21], // I column
  [2, 7, 12, 17, 22], // N column (with the "Free" space)
  [3, 8, 13, 18, 23], // G column
  [4, 9, 14, 19, 24], // O column
];
const DIAGONAL_PATTERNS = [
  [0, 6, 12, 18, 24], // Top-left to bottom-right diagonal
  [4, 8, 12, 16, 20], // Top-right to bottom-left diagonal
];
const CORNER_PATTERN = [[0, 4, 20, 24]]; // Four corners

export default function BingoLayout({
  patternsToCheck,
}: {
  patternsToCheck: number;
}) {
  const BINGO_COLUMNS = ["B", "I", "N", "G", "O"];

  // Correctly destructure the useState array
  const [BINGO_NUMBERS, setBingoNumbers] = useState([
    [1, 2, 3, 4, 5], // B column numbers
    [16, 17, 18, 19, 20], // I column numbers
    [31, 33, "⭐", 34, 35], // N column with "Free" in the center
    [46, 47, 48, 49, 50], // G column numbers
    [61, 62, 63, 64, 65], // O column numbers
  ]);
  const [BNPlaceholder, setBNPlaceholder] = useState([
    [1, 2, 3, 4, 5], // B column numbers
    [16, 17, 18, 19, 20], // I column numbers
    [31, 33, "⭐", 34, 35], // N column with "Free" in the center
    [46, 47, 48, 49, 50], // G column numbers
    [61, 62, 63, 64, 65], // O column numbers
  ]);

  const [selectedCells, setSelectedCells] = useState<Array<string>>(["2-2"]); // Always include center (Free) cell
  const [patternCount, setPatternCount] = useState(0);
  const [matchedPatterns, setMatchedPatterns] = useState<number[][]>([]);
  const [modal, setModal] = useState(false);

  // Function to handle cell click
  const handleCellPress = (colIndex: number, rowIndex: number) => {
    const cellKey = `${colIndex}-${rowIndex}`;
    // Do not allow the "Free" space to be unselected
    if (cellKey === "2-2") return;

    setSelectedCells((prevSelected) =>
      prevSelected.includes(cellKey)
        ? prevSelected.filter((key) => key !== cellKey) // Unselect if already selected
        : [...prevSelected, cellKey]
    );
  };

  // Function to reset the game
  const resetGame = () => {
    setSelectedCells(["2-2"]); // Reset to only have the Free space selected
    setPatternCount(0); // Reset pattern count
    setMatchedPatterns([]); // Clear matched patterns
  };

  // Check if a pattern is completed
  const checkPatterns = () => {
    const selectedIndexes = selectedCells.map((key) => {
      const [colIndex, rowIndex] = key.split("-").map(Number);
      return colIndex * 5 + rowIndex; // Convert to a linear index from 0 to 24
    });

    let matchedPatterns = [];
    const allPatterns = [
      ...ROW_PATTERNS,
      ...COL_PATTERNS,
      ...DIAGONAL_PATTERNS,
      ...CORNER_PATTERN,
    ];

    allPatterns.forEach((pattern) => {
      if (pattern.every((index) => selectedIndexes.includes(index))) {
        matchedPatterns.push(pattern);
      }
    });

    setMatchedPatterns(matchedPatterns);
    setPatternCount(matchedPatterns.length);

    if (matchedPatterns.length >= patternsToCheck) {
      Vibration.vibrate(500); // Vibrate for 500ms when Bingo is achieved
    }
  };

  // ? /////////////////////////////////////////////////////////////////////
  const handleNumberChange = (
    column: number,
    row: number,
    value: number | string
  ) => {
    setBNPlaceholder((prevNumbers) => {
      const updatedNumbers = [...prevNumbers];
      updatedNumbers[column][row] = value;
      return updatedNumbers;
    });
  };

  const handleSubmit = () => {
    setBingoNumbers(BNPlaceholder);
    setModal(false);
  };

  // Use effect to check for patterns whenever selectedCells changes
  useEffect(() => {
    checkPatterns();
  }, [selectedCells]);

  return (
    <View className="flex items-center justify-center mt-2 ">
      {/* Display Pattern Count */}
      <View className="flex flex-row items-center justify-center mb-1 gap-2">
        <Text className="text-2xl font-bold dark:text-slate-200">
          Pattern: <Text className="text-red-600">{patternCount}</Text>
        </Text>
        <Button title="Add" onPress={() => setModal(true)} />
        <Button title="Reset" onPress={resetGame} />
      </View>

      {/* Render BINGO letters and change color to red when pattern count is fulfilled */}
      <View className="flex flex-col items-center mb-1">
        <View className="flex flex-row">
          {BINGO_COLUMNS.map((letter, index) => (
            <View
              key={index}
              className={`w-10 h-10 justify-center items-center border border-gray-600 ${
                patternCount >= patternsToCheck ? "bg-red-500" : "bg-slate-300"
              }`}
            >
              <Text className="text-lg font-bold">{letter}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Render Bingo numbers in vertical columns */}
      <View className="flex flex-col items-center mb-1">
        <View className="flex flex-row">
          {BINGO_NUMBERS.map((column, colIndex) => (
            <View key={colIndex} className="flex flex-col items-center">
              {column.map((number, rowIndex) => {
                const cellKey = `${colIndex}-${rowIndex}`;
                const isSelected = selectedCells.includes(cellKey);
                const isInMatchedPattern = matchedPatterns.some((pattern) =>
                  pattern.includes(colIndex * 5 + rowIndex)
                );

                return (
                  <Pressable
                    key={rowIndex}
                    onPress={() => handleCellPress(colIndex, rowIndex)}
                    className={`w-10 h-10 justify-center items-center border ${
                      number === "Free"
                        ? "bg-yellow-300"
                        : isSelected
                          ? "bg-blue-400"
                          : "bg-slate-100"
                    } ${
                      isInMatchedPattern ? "border-red-600" : "border-gray-600"
                    } `}
                  >
                    <Text className="text-lg">{number}</Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Reset Button */}
      {/* <Button title="Reset Game" onPress={resetGame} /> */}

      <ReactNativeModal
        isVisible={modal}
        onBackdropPress={() => setModal(false)}
      >
        <View className="bg-white p-6 rounded-lg flex items-center justify-center">
          <Text className="text-center text-xl font-bold mb-4">
            Enter Bingo Numbers
          </Text>

          {/* Bingo Number Input Fields */}
          <View className="flex flex-row justify-between mb-4">
            {BINGO_NUMBERS.map((column, colIndex) => (
              <View key={colIndex} className="flex flex-col items-center">
                <Text className="font-bold">{BINGO_COLUMNS[colIndex]}</Text>
                {/* {console.log(column)} */}
                {column.map((_, rowIndex) => (
                  <TextInput
                    key={rowIndex}
                    className="border-b-2 w-12 text-center mb-2"
                    keyboardType="number-pad"
                    placeholder="-"
                    // value={BINGO_NUMBERS[colIndex][rowIndex].toString()}
                    editable={!(rowIndex === 2 && colIndex === 2)}
                    value={
                      rowIndex === 2 && colIndex === 2
                        ? "⭐"
                        : BNPlaceholder[colIndex][rowIndex].toString()
                    }
                    onChangeText={(text) =>
                      handleNumberChange(colIndex, rowIndex, text)
                    }
                  />
                ))}
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <View className="mt-4">
            <Button title="Submit" onPress={handleSubmit} />
          </View>

          {/* Close Modal Button */}
          <Pressable onPress={() => setModal(false)} className="mt-2">
            <Text className="text-center text-blue-500">Close</Text>
          </Pressable>
        </View>
      </ReactNativeModal>
    </View>
  );
}
