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

export default function NewAccount({ route, navigation }) {
  const theme = useTheme();

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  async function criarConta () {
    const novaConta = {
      nomeUsuario,
      email,
      senha,
    };
    const token = await salvarUsuario(usuario);
    console.log(token);
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
            CRIE SUA CONTA AQUI
          </Text>

          <TextInput
            placeholder="Nome"
            style={styles.textInput}
            onChangeText={(text) => setNomeUsuario(text)}
          />

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
            style={styles.btnCriarConta}
            onPress={() => criarConta()}
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

  btnCriarConta: {
    width: "100%",
    height: 40,
    backgroundColor: "#066799",
    borderRadius: 20,
    justifyContent: "center",
  },

});
