import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Register from "../pages/Register";
import List from "../pages/List";
import Pessoa from "../pages/People";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import NewAccount from "../pages/NewAccount";
import NotFound from "../pages/NotFound";

const Stack = createStackNavigator();

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Nova Conta" component={NewAccount} />
      <Stack.Screen
        name="Listagem"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edição" component={Edit} />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthNavigation"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
