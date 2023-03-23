import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Register from "../pages/Register";
import List from "../pages/List";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cadastro"
        component={Register}
        // options={({ navigation }) => {
        //   return {
        //     title: "Cadastro",
        //     headerRight: () => (
        //       <Button
        //         type="clear"
        //         onPress={() => navigation.navigate("Listagem")}
        //       >
        //         <Ionicons name="list" size={30} color="black" />
        //       </Button>
        //     ),
        //   };
        // }}
      ></Stack.Screen>
      <Stack.Screen
        name="Listagem"
        component={List}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
