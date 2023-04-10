import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import theme from "./src/style/theme";
import ImoveisProvedor from "./src/context";

export default function App() {
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
