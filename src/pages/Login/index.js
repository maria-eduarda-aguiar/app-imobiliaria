import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ navigation }) {

  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logar = () => {
    alert("Usuário logado com sucesso!");

    const login = {
      email,
      senha,
    };
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        <Image
          source={require("../../../assets/logo-real-state.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.containerForm}>
          <Text style={{ ...styles.title, color: theme.colors.secondary }}>
            REALIZE O SEU LOGIN
          </Text>

          <TextInput
            placeholder="E-mail"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            placeholder="Senha"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setSenha(text)}
          />

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => logar()}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              LOGIN
            </Text>
          </TouchableOpacity>

          <Text style={{ ...styles.text, color: theme.colors.secondary }}>
            Ainda não possui conta?
          </Text>

          <TouchableOpacity
            style={styles.btnCriarConta}
            onPress={() => navigation.navigate("Nova Conta")}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              CRIAR CONTA
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },

  scrollView: {
    backgroundColor: "#1b1b1b"
  },

  logo: {
    width: "100%",
    height: 100
  },

  containerForm: {
    flex: 1,
    gap: 8
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center"
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center"
  },

  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10
  },

  btnLogin: {
    width: "100%",
    height: 40,
    backgroundColor: "#066799",
    borderRadius: 20,
    justifyContent: "center"
  },

  btnCriarConta: {
    width: "100%",
    height: 40,
    backgroundColor: "#066799",
    borderRadius: 20,
    justifyContent: "center"
  },

});