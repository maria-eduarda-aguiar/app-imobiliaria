import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, Text, useTheme } from "react-native-paper";

export default function List() {
  const listaImoveis = JSON.parse(localStorage.getItem("listaImoveis")) ?? [];
  const [filtroTipoContrato, setFiltroTipoContrato] = useState("locacao");
  const theme = useTheme();

  console.log({ listaImoveis });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imóveis Cadastrados</Text>
      <Text variant="bodyLarge" style={{ color: theme.colors.tertiary }}>
        Filtrar por Contrato
      </Text>
      <RadioButton.Group
        onValueChange={(novoFiltroTipoContrato) =>
          setFiltroTipoContrato(novoFiltroTipoContrato)
        }
        value={filtroTipoContrato}
      >
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value="locacao"
              color={theme.colors.primary}
              uncheckedColor={theme.colors.primary}
            />
            <Text style={{ color: theme.colors.tertiary }}>Locação</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              value="venda"
              color={theme.colors.primary}
              uncheckedColor={theme.colors.primary}
            />
            <Text style={{ color: theme.colors.tertiary }}>Venda</Text>
          </View>
        </View>
      </RadioButton.Group>
      <View style={styles.listContainer}>
        {listaImoveis.map((imovel, index) => (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainer}>
              <View key={index} style={styles.homeContainer}>
                <Text>Contrato: {imovel.tipoContrato}</Text>
                <Text>Tipo de imóvel: {imovel.tipoImovel}</Text>
                <Text>Endereço: {imovel.enderecoImovel}</Text>
                <Text>Valor do aluguel: {imovel.valorAluguel}</Text>
                <Text>Valor do condomínio: {imovel.valorCondominio}</Text>
                <Text>Número de banheiros: {imovel.numeroBanheiros}</Text>
                <Text>Número de quartos: {imovel.numeroQuartos}</Text>
                {imovel.fotoImovel && (
                  <Image
                    source={imovel.fotoImovel}
                    style={styles.fotoUrl}
                    resizeMode="contain"
                  />
                )}
                <Text>
                  Status da locação:{" "}
                  {imovel.statusLocacao ? "Locado" : "Não locado"}
                </Text>
              </View>
              <View style={styles.iconsContainer}>
                <Ionicons name="create-outline" size={25} color="black" />
                <Ionicons name="trash-outline" size={25} color="black" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },

  listContainer: {
    gap: 16,
  },

  homeContainer: {},

  dataContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 8,
    border: "1px solid",
    justifyContent: "space-between",
  },

  iconsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
  },

  fotoUrl: {
    width: 200,
    height: 200,
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
