import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  Appearance,
  FlatList,
  ColorSchemeName,
  Image,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { MENU_ITEMS } from "@/constants/MenuItems";
import MenuImages from "@/constants/MenuImages";

interface ITheme {
  text: string;
  background: string;
  headerBackground: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

const Menu = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const style = createStyle(theme, colorScheme);

  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const SeparatorComponent = <View style={style.separator}></View>;
  // const HeaderComponent = <Text>Top of List</Text>;
  const FooterComponent = (
    <Text style={{ color: theme.text }}>End of Menu</Text>
  );
  const EmptyComponent = <Text>No Menu Items Found!</Text>;
  return (
    <Container>
      <FlatList
        data={MENU_ITEMS}
        // data={[]}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.contentContainer}
        ItemSeparatorComponent={() => SeparatorComponent}
        // ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
        ListFooterComponentStyle={style.footerComp}
        ListEmptyComponent={EmptyComponent}
        renderItem={({ item, index }) => {
          // <View key={item.id}>
          return (
            <View style={style.row}>
              <View style={style.menuTextRow}>
                <Text style={style.menuItemTitle}>{item.title}</Text>
                <Text style={style.menuItemText}>{item.description}</Text>
              </View>
              <Image source={MenuImages[index]} style={style.menuImage} />
            </View>
          );
        }}
      />
    </Container>
  );
};

const createStyle = (theme: ITheme, colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    contentContainer: {
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 12,
      backgroundColor: theme.background,
    },
    separator: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "papayawhip" : "#333",
      width: "50%",
      maxWidth: 300,
      marginHorizontal: "auto",
      marginBottom: 10,
      // marginTop: 5,
    },
    footerComp: {
      marginHorizontal: "auto",
    },
    row: {
      flexDirection: "row",
      width: "100%",
      maxWidth: 600,
      height: 100,
      marginBottom: 10,
      borderStyle: "solid",
      borderColor: colorScheme === "dark" ? "papayawhip" : "#000",
      borderWidth: 1,
      borderRadius: 20,
      overflow: "hidden",
      marginHorizontal: "auto",
    },
    menuTextRow: {
      width: "65%",
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 5,
      flexGrow: 1,
    },
    menuItemTitle: {
      fontSize: 18,
      textDecorationLine: "underline",
    },
    menuItemText: {
      color: theme.text,
    },
    menuImage: {
      width: 100,
      height: 100,
    },
  });

export default Menu;
