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
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PessoasContext } from "../../context/PessoasProvider";
import { ImoveisContext } from "../../context/ImoveisProvider";

export default function Pessoa({ navigation }) {
  
  const theme = useTheme();

  const pessoasContexto = useContext(PessoasContext);
  const listaImoveis = useContext(ImoveisContext);

  useEffect(() => {
    listaImoveis.getLista();
  }, []);

  const [nomeLocatario, setNomeLocatario] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [diaVencimentoAluguel, setDiaVencimentoAluguel] = useState("");
  const [dataInicioContrato, setDataInicioContrato] = useState("");
  const [dataTerminoContrato, setDataTerminoContrato] = useState("");
  const [imovelVinculado, setImovelVinculado] = useState("");

  const cadastrar = () => {
    alert("Pessoa cadastrada com sucesso!");

    const novaPessoa = {
      nomeLocatario,
      cpf,
      dataNascimento,
      rendaMensal,
      diaVencimentoAluguel,
      dataInicioContrato,
      dataTerminoContrato,
      imovelVinculado,
    };

    pessoasContexto.addPessoa({
      ...novaPessoa,
    });

    listaImoveis.getLista();

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

          <SelectDropdown
            data={listaImoveis.localImoveis.filter(
              (imovel) =>
                imovel.tipoContrato !== "Venda" &&
                imovel.statusLocacao === "false"
            )}
            onSelect={(selectedItem, index) => {
              setImovelVinculado(selectedItem.id);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.enderecoImovel;
            }}
            rowTextForSelection={(item, index) => {
              return item.enderecoImovel;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <Ionicons
                  name={isOpened ? "arrow-up" : "arrow-down"}
                  color={"#000"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition="right"
            defaultButtonText="Selecionar Imóvel"
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          <TouchableOpacity
            style={styles.btnCadastroPessoa}
            onPress={() => cadastrar()}
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

  textInput: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10
  },

  btnCadastroPessoa: {
    width: "100%",
    height: 40,
    backgroundColor: "#066799",
    borderRadius: 20,
    justifyContent: "center"
  },

  dropdown1BtnStyle: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginBottom: 8
  },

  dropdown1BtnTxtStyle: { 
    color: "#444", 
    textAlign: "left", 
    fontSize: 14
  },

  dropdown1DropdownStyle: { 
    backgroundColor: "#EFEFEF"
  },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomWidth: 0,
    paddingTop: 4,
    paddingBottom: 4
  },

  dropdown1RowTxtStyle: { 
    color: "#444", 
    textAlign: "left", 
    fontSize: 16 
  },

});
