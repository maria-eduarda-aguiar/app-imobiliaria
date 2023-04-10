import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Register from "../pages/Register";
import List from "../pages/List";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import Edit from "../pages/Edit";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cadastro"
        component={Register}
        options={{
          headerShown: false,
          tabBarLabel: "Cadastro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={OutNavigation}
        options={{
          headerShown: false,
          tabBarLabel: "Imóveis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function OutNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listagem"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Edição" component={Edit} />
    </Stack.Navigator>
  );
}
