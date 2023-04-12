import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RadioButton, Text, useTheme } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { useContext } from "react";
import { ImoveisContext } from "../../context";
import moneyMask from "../../masks/moneyMask";

export default function Register({ navigation }) {
  const theme = useTheme();

  const listaImoveis = useContext(ImoveisContext);

  const [tipoContrato, setTipoContrato] = useState("Locação");
  const [tipoImovel, setTipoImovel] = useState("Apartamento");
  const [enderecoImovel, setEnderecoImovel] = useState("");
  const [valor, setValor] = useState("");
  const [valorCondominio, setValorCondominio] = useState("");
  const [numeroQuartos, setNumeroQuartos] = useState("");
  const [numeroBanheiros, setNumeroBanheiros] = useState("");
  const [fotoImovel, setFotoImovel] = useState("");
  const [statusLocacao, setStatusLocacao] = useState("");

  const cadastro = () => {
    alert("Imóvel cadastrado com sucesso!");

    const novoImovel = {
      tipoContrato,
      tipoImovel,
      enderecoImovel,
      valor,
      valorCondominio,
      numeroQuartos,
      numeroBanheiros,
      fotoImovel,
      statusLocacao,
    };

    listaImoveis.addImovel({
      ...novoImovel,
      valor: Number(
        Number(
          moneyMask(valor).replace(",", ".").replace("R$", "")
        ).toFixed(2)
      ),
      valorCondominio: Number(
        Number(
          moneyMask(valorCondominio).replace("R$", "").replace(",", ".")
        ).toFixed(2)
      ),
    });

    navigation.navigate("List");
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
          CADASTRE AQUI O SEU IMÓVEL
        </Text>
        <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
          Contrato
        </Text>
        <RadioButton.Group
          onValueChange={(novoTipoContrato) =>
            setTipoContrato(novoTipoContrato)
          }
          value={tipoContrato}
        >
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="Locação"
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.secondary }}>Locação</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Venda"
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.secondary }}>Venda</Text>
            </View>
          </View>
        </RadioButton.Group>
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
                value="Apartamento"
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.secondary }}>Apartamento</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="Casa"
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.secondary }}>Casa</Text>
            </View>
          </View>
        </RadioButton.Group>
        <TextInput
          placeholder="Endereço do imóvel"
          style={styles.textInput}
          onChangeText={(text) => setEnderecoImovel(text)}
        />
        <TextInput
          placeholder="Valor (R$)"
          style={styles.textInput}
          value={valor ? moneyMask(valor) : ""}
          onChangeText={(text) => setValor(text)}
        />

        {tipoImovel === "Apartamento" && (
          <TextInput
            placeholder="Valor do condomínio (R$)"
            value={valorCondominio ? moneyMask(valorCondominio) : ""}
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
            color={theme.colors.primary}
            labelStyle={{ color: theme.colors.secondary }}
            uncheckedColor={theme.colors.primary}
            onPress={() => setStatusLocacao((checked) => !checked)}
          />
        </View>

        <TouchableOpacity style={styles.btnCadastro} onPress={() => cadastro()}>
          <Text style={{ color: "white", textAlign: "center" }}>CADASTRAR</Text>
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
    fontSize: 18,
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
