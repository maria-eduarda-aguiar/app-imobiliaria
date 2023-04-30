import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import theme from "./src/style/theme";
import ImoveisProvedor from "./src/context/ImoveisProvider";
import { createTablesImoveis, createTablesPessoas } from "./src/database/db";
import PessoasProvedor from "./src/context/PessoasProvider";

export default function App() {
  async function init() {
    await createTablesImoveis();
    await createTablesPessoas();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <PessoasProvedor>
          <ImoveisProvedor>
            <StatusBar backgroundColor="#545454" barStyle="light-content" />
            <Routes />
          </ImoveisProvedor>
        </PessoasProvedor>
      </NavigationContainer>
    </PaperProvider>
  );
}
