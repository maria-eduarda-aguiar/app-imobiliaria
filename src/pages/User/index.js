import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import moneyMask from "../../masks/moneyMask";
import { ScrollView } from "react-native-gesture-handler";
import { PaperSelect } from "react-native-paper-select";
import { ImoveisContext } from "../../context";

export default function User({ navigation }) {
  const theme = useTheme();

  const listaImoveis = useContext(ImoveisContext);

  useEffect(() => {
    listaImoveis.getLista()
  }, [])

  const [nomeLocatario, setNomeLocatario] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [diaVencimentoAluguel, setDiaVencimentoAluguel] = useState("");
  const [dataInicioContrato, setDataInicioContrato] = useState("");
  const [dataTerminoContrato, setDataTerminoContrato] = useState("");
  const [imovelSelecionado, setImovelSelecionado] = useState("");

  console.log(listaImoveis)

  const pessoa = () => {
    alert("Pessoa cadastrada com sucesso!");

    const novaPessoa = {
      nomeLocatario,
      cpf,
      dataNascimento,
      rendaMensal,
      diaVencimentoAluguel,
      dataInicioContrato,
      dataTerminoContrato,
      imovelSelecionado,
    };

    // listaImoveis.addImovel({
    //   ...novoImovel,
    //   valor: Number(
    //     Number(moneyMask(valor).replace(",", ".").replace("R$", "")).toFixed(2)
    //   ),
    //   valorCondominio: Number(
    //     Number(
    //       moneyMask(valorCondominio).replace("R$", "").replace(",", ".")
    //     ).toFixed(2)
    //   ),
    // });

    navigation.navigate("User");
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
            CADASTRO DO LOCATÁRIO
          </Text>

          <TextInput
            placeholder="Nome do locatário(a)"
            style={styles.textInput}
            onChangeText={(text) => setNomeLocatario(text)}
          />

          <TextInput
            placeholder="CPF"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setCpf(text)}
          />

          <TextInput
            placeholder="Data de nascimento"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setDataNascimento(text)}
          />

          <TextInput
            placeholder="Renda mensal"
            keyboardType="numeric"
            style={styles.textInput}
            value={rendaMensal ? moneyMask(rendaMensal) : ""}
            onChangeText={(text) => setRendaMensal(text)}
          />

          <TextInput
            placeholder="Dia para vencimento do aluguel"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setDiaVencimentoAluguel(text)}
          />

          <TextInput
            placeholder="Data do início do contrato"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setDataInicioContrato(text)}
          />

          <TextInput
            placeholder="Data do término do contrato"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => setDataTerminoContrato(text)}
          />

          {/* <PaperSelect
            label="Selecione um imóvel"
            value={imovelSelecionado}
            onSelection={setImovelSelecionado}
            arrayList={listaImoveis.localImoveis.map(imovel => ({_id: imovel.id, value: imovel.enderecoImovel}))}
            selectedArrayList={[]}
            errorText={""}
            multiEnable={false}
          /> */}

          <TouchableOpacity
            style={styles.btnCadastroPessoa}
            onPress={() => pessoa()}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              CADASTRAR
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

  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },

  btnCadastroPessoa: {
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
