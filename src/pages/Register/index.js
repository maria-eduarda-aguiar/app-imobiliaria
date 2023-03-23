import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton, Text, useTheme } from "react-native-paper";
import { Checkbox } from "react-native-paper";

export default function Register() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [enderecoImovel, setEnderecoImovel] = useState("");
  const [tipoImovel, setTipoImovel] = useState("apartamento");
  const [valorAluguel, setValorAluguel] = useState("");
  const [valorCondominio, setValorCondominio] = useState("");
  const [numeroQuartos, setNumeroQuartos] = useState("");
  const [numeroBanheiros, setNumeroBanheiros] = useState("");
  const [fotoImovel, setFotoImovel] = useState("");
  const [statusLocacao, setStatusLocacao] = useState("");

  const cadastro = () => {
    alert("Imóvel cadastrado com sucesso!");

    const listaImoveis = JSON.parse(localStorage.getItem("listaImoveis")) ?? [];

    const novoImovel = {
      enderecoImovel,
      tipoImovel,
      valorAluguel,
      valorCondominio,
      numeroQuartos,
      numeroBanheiros,
      fotoImovel,
      statusLocacao,
    };

    listaImoveis.push(novoImovel);

    console.log(listaImoveis);

    localStorage.setItem("listaImoveis", JSON.stringify(listaImoveis));
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Image
        source={require("../../../assets/logo-real-state.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.containerForm}>
        <Text style={{ ...styles.title, color: theme.colors.secondary }}>
          Cadastre seu imóvel
        </Text>

        <TextInput
          placeholder="Endereço do imóvel"
          style={styles.textInput}
          onChangeText={(text) => setEnderecoImovel(text)}
        />
        <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
          Tipo do imóvel
        </Text>
        <RadioButton.Group
          onValueChange={(novoTipoImovel) => setTipoImovel(novoTipoImovel)}
          value={tipoImovel}
        >
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="apartamento"
                color={theme.colors.secondary}
                uncheckedColor={theme.colors.secondary}
              />
              <Text style={{ color: theme.colors.secondary }}>Apartamento</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="casa"
                color={theme.colors.secondary}
                uncheckedColor={theme.colors.secondary}
              />
              <Text style={{ color: theme.colors.secondary }}>Casa</Text>
            </View>
          </View>
        </RadioButton.Group>
        <TextInput
          placeholder="Valor do aluguel"
          style={styles.textInput}
          onChangeText={(text) => setValorAluguel(text)}
        />

        {tipoImovel === "apartamento" && (
          <TextInput
            placeholder="Valor do condomínio"
            style={styles.textInput}
            onChangeText={(text) => setValorCondominio(text)}
          />
        )}

        <TextInput
          placeholder="Número de quartos"
          style={styles.textInput}
          onChangeText={(text) => setNumeroQuartos(text)}
        />
        <TextInput
          placeholder="Número de banheiros"
          style={styles.textInput}
          onChangeText={(text) => setNumeroBanheiros(text)}
        />
        <TextInput
          placeholder="Foto (URL)"
          style={styles.textInput}
          onChangeText={(text) => setFotoImovel(text)}
        />
        <View>
          <Checkbox.Item
            label="Está locado?"
            status={statusLocacao ? "checked" : "unchecked"}
            color={theme.colors.secondary}
            labelStyle={{ color: theme.colors.secondary }}
            uncheckedColor={theme.colors.secondary}
            onPress={() => setStatusLocacao((checked) => !checked)}
          />
        </View>

        <TouchableOpacity style={styles.btnCadastro} onPress={() => cadastro()}>
          <Text style={{ color: "white", textAlign: "center" }}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnListagem}
          onPress={() => navigation.navigate("Listagem")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            LISTAR IMÓVEIS CADASTRADO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
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
    fontSize: 24,
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

  btnCadastro: {
    width: "100%",
    height: 40,
    backgroundColor: "#066799",
    borderRadius: 20,
    justifyContent: "center",
  },

  btnListagem: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
