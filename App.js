import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import theme from "./src/style/theme";
import ImoveisProvedor from "./src/context";
import { createTables } from "./src/database/db";


export default function App() {
  async function init() {
    await createTables();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <ImoveisProvedor>
          <StatusBar backgroundColor="#545454" barStyle="light-content" />
          <Routes />
        </ImoveisProvedor>
      </NavigationContainer>
    </PaperProvider>
  );
}
