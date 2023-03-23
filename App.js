import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import theme from "./src/style/theme";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar backgroundColor="#545454" barStyle="light-content" />
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
