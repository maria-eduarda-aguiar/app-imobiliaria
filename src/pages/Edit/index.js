import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { RadioButton, Text, useTheme } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import { useContext } from "react";
import { ImoveisContext } from "../../context";
import moneyMask from "../../masks/moneyMask";
import { useEffect } from "react";

export default function Edit({ route, navigation }) {
  const theme = useTheme();

  const { editarImovel, getImovel } = useContext(ImoveisContext);

  const imovelSelecionado = getImovel(route.params.idImovel);

  const [tipoContrato, setTipoContrato] = useState(
    imovelSelecionado.tipoContrato
  );
  const [tipoImovel, setTipoImovel] = useState(imovelSelecionado.tipoImovel);
  const [enderecoImovel, setEnderecoImovel] = useState(
    imovelSelecionado.enderecoImovel
  );
  const [valor, setValor] = useState(imovelSelecionado.valor?.toFixed(2));
  const [valorCondominio, setValorCondominio] = useState(
    imovelSelecionado.valorCondominio?.toFixed(2)
  );
  const [numeroQuartos, setNumeroQuartos] = useState(
    imovelSelecionado.numeroQuartos
  );
  const [numeroBanheiros, setNumeroBanheiros] = useState(
    imovelSelecionado.numeroBanheiros
  );
  const [fotoImovel, setFotoImovel] = useState(imovelSelecionado.fotoImovel);
  const [statusLocacao, setStatusLocacao] = useState(
    imovelSelecionado.statusLocacao
  );

  useEffect(() => {
    getImovel(route.params.idImovel);
  }, []);

  const salvar = () => {
    alert("Imóvel editado com sucesso!");

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

    editarImovel(route.params.idImovel, {
      ...novoImovel,
      valor: Number(
        Number(moneyMask(valor).replace(",", ".").replace("R$", "")).toFixed(2)
      ),
      valorCondominio: Number(
        Number(
          moneyMask(valorCondominio).replace("R$", "").replace(",", ".")
        ).toFixed(2)
      ),
    });
    navigation.navigate("Listagem");
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <View style={styles.containerForm}>
        <Text style={{ ...styles.title, color: theme.colors.secondary }}>
          EDITE OS DADOS DO IMÓVEL
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
          defaultValue={enderecoImovel}
        />

        <TextInput
          placeholder="Valor do aluguel (R$)"
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => setValor(text)}
          value={valor ? moneyMask(valor) : ""}
        />

        {tipoImovel === "Apartamento" && (
          <TextInput
            placeholder="Valor do condomínio (R$)"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setValorCondominio(text)}
            value={valorCondominio ? moneyMask(valorCondominio) : ""}
          />
        )}

        <TextInput
          placeholder="Número de quartos"
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => setNumeroQuartos(text)}
          defaultValue={numeroQuartos}
        />

        <TextInput
          placeholder="Número de banheiros"
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => setNumeroBanheiros(text)}
          defaultValue={numeroBanheiros}
        />

        <TextInput
          placeholder="Foto (URL)"
          style={styles.textInput}
          onChangeText={(text) => setFotoImovel(text)}
          defaultValue={fotoImovel}
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

        <TouchableOpacity style={styles.btnCadastro} onPress={() => salvar()}>
          <Text style={{ color: "white", textAlign: "center" }}>SALVAR</Text>
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
