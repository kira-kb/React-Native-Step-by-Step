import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import { data } from "@/data/todos";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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

  useEffect(() => {
    const loadTodo = async () => await setTodo(data.sort((a, b) => -1));

    loadTodo();

    setLoading(false);
  }, []);

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
              <Pressable onPress={() => removeTodo(item.id)}>
                <MaterialCommunityIcons
                  name="delete-circle"
                  size={36}
                  color="red"
                  selectable={undefined}
                />
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
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
    color: "white",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
