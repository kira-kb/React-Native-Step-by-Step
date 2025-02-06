import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { data } from "@/data/todos";
import { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext, ThemeProvider } from "@/context/ThemeContext";

import Octicons from "@expo/vector-icons/Octicons";

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

const LoadingSpinner = () => {
  return (
    <View style={styles.LoadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading Todos...</Text>
    </View>
  );
};

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [text, setText] = useState("");

  const [loaded, error] = useFonts({ Inter_500Medium });

  // const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadTodo = async () => await setTodo(data.sort((a, b) => -1));

    loadTodo();

    setLoading(false);
  }, []);

  if (!loaded && !error) return null;

  const toggleTodo = (todoId: number) => {
    setTodo(
      todo.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (todoId: number) => {
    setTodo(todo.filter((todoItem) => todoItem.id !== todoId));
  };

  const addTodo = () => {
    const newId = todo.length + 1;
    setTodo([...todo, { id: newId, title: text, completed: false }]);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new todo"
            placeholderTextColor="gray"
            value={text}
            onChangeText={setText}
          />
          <Pressable onPress={addTodo} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
          {/* <Pressable
            onPress={() =>
              setColorScheme(colorScheme === "dark" ? "light" : "dark")
            }
          ></Pressable> */}
        </View>

        <FlatList
          data={todo}
          keyExtractor={(todo) => todo.id.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.todoItem}>
                <Text
                  style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                  ]}
                  onPress={() => toggleTodo(item.id)}
                >
                  {item.title}
                </Text>
                {/* <Pressable onPress={() => removeTodo(item.id)}>
                  <MaterialCommunityIcons
                    name="delete-circle"
                    size={36}
                    color="red"
                    selectable={undefined}
                  />
                  {colorScheme === "dark" ? (
                    <Octicons
                      name="moon"
                      size={36}
                      selectable={undefined}
                      color={theme.text}
                      style={{ width: 36 }}
                    />
                  ) : (
                    <Octicons
                      name="moon"
                      size={36}
                      selectable={undefined}
                      color={theme.text}
                      style={{ width: 36 }}
                    />
                  )}
                </Pressable> */}
              </View>
            );
          }}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    minWidth: 0,
    color: "white",
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  addButtonText: {
    fontSize: 18,
    color: "black",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    maxWidth: 1024,
    marginHorizontal: "auto",
    pointerEvents: "auto",
  },
  todoText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    color: "white",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
