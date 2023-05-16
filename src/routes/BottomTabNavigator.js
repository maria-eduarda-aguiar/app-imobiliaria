import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Register from "../pages/Register";
import List from "../pages/List";
import Pessoa from "../pages/People";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LoginContext } from "../context/LoginProvider";
import NotFound from "../pages/NotFound";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { login } = React.useContext(LoginContext);
  console.log({ login });
  if (!login) {
    return <NotFound />;
  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cadastro"
        component={Register}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#baa360",
          tabBarShowLabel: false,
          //tabBarInactiveTintColor: "#000",
          tabBarLabel: "Imóvel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lista"
        component={List}
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#baa360",
          //tabBarInactiveTintColor: "#000",
          tabBarLabel: "Lista",
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
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#baa360",
          //tabBarInactiveTintColor: "#000",
          tabBarLabel: "Pessoa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
