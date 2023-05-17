import React, { useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ProgressBar, Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { LoginContext } from "../../context/LoginProvider";

export default function Login({ navigation }) {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { addLogin, loading } = useContext(LoginContext);

  async function logar() {
    const login = {
      email,
      senha,
    };
    const token = await addLogin(login);
    console.log(token);
    navigation.navigate("Lista");
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        <Image
          source={require("../../../assets/real-state-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.containerForm}>
          <Text style={{ ...styles.title, color: theme.colors.secondary }}>
            Já possui cadastro? Faça o seu login
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

          {loading ? (
            <View>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Entrando...
              </Text>
              <ProgressBar style={{ width: "100%" }} indeterminate />
            </View>
          ) : (
            <TouchableOpacity style={styles.btnLogin} onPress={() => logar()}>
              <Text style={{ color: "white", textAlign: "center" }}>LOGIN</Text>
            </TouchableOpacity>
          )}

          <Text style={{ ...styles.text, color: theme.colors.secondary }}>
            Ainda não possui cadastro?
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
    padding: 16,
  },

  scrollView: {
    backgroundColor: "#1b1b1b",
  },

  logo: {
    width: "100%",
    height: 100,
  },

  containerForm: {
    flex: 1,
    gap: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center",
  },

  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },

  btnLogin: {
    width: "100%",
    height: 40,
    backgroundColor: "#baa360",
    borderRadius: 20,
    justifyContent: "center",
  },

  btnCriarConta: {
    width: "100%",
    height: 40,
    backgroundColor: "#baa360",
    borderRadius: 20,
    justifyContent: "center",
  },
});
