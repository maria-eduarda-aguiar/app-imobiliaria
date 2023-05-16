import * as React from "react";
import "react-native-gesture-handler";
import List from "../pages/List";
import { createStackNavigator } from "@react-navigation/stack";
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import NewAccount from "../pages/NewAccount";
import NotFound from "../pages/NotFound";
import { LoginContext } from "../context/LoginProvider";

const Stack = createStackNavigator();

export default function StackNavigator(){
  const { login } = React.useContext(LoginContext);
  console.log({ login });

  if (login) {
    return <BottomTabNavigator />
  }
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
      </Stack.Navigator>
  );
}
