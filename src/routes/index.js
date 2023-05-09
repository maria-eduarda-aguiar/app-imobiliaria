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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={OutNavigationAccount}
        options={{
          headerShown: false,
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="key" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={Register}
        options={{
          headerShown: false,
          tabBarLabel: "Cadastro Imóvel",
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
          tabBarLabel: "Lista Imóveis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Pessoa"
        component={Pessoa}
        options={{
          headerShown: false,
          tabBarLabel: "Locatário",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" color={color} size={size} />
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

function OutNavigationAccount() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Nova Conta" component={NewAccount} />
    </Stack.Navigator>
  );
}
