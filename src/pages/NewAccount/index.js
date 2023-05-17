import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ProgressBar, Text, useTheme } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";

export default function NewAccount({ navigation }) {
  const theme = useTheme();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { addUser, loading } = useContext(UserContext);

  async function criarConta() {
    const novaConta = {
      nome,
      email,
      senha,
    };
    await addUser(novaConta);
    navigation.navigate("Login");
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
            Realize aqui o seu cadastro
          </Text>

          <TextInput
            placeholder="Nome"
            style={styles.textInput}
            onChangeText={(text) => setNome(text)}
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

          {loading ? (
            <View>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Criando usuário...
              </Text>
              <ProgressBar style={{ width: "100%" }} indeterminate />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.btnCriarConta}
              onPress={() => criarConta()}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                CRIAR CONTA
              </Text>
            </TouchableOpacity>
          )}
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
    textAlign: "justify",
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
    backgroundColor: "#baa360",
    borderRadius: 20,
    justifyContent: "center",
  },
});
