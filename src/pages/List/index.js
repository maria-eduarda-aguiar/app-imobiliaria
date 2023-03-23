import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function List() {
  const listaImoveis = JSON.parse(localStorage.getItem("listaImoveis"));

  console.log({ listaImoveis });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Imóveis Cadastrados</Text>
      <View style={styles.listContainer}>
        {listaImoveis.map((imovel, index) => (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainer}>
              <View key={index} style={styles.homeContainer}>
                <Text>Endereço: {imovel.enderecoImovel}</Text>
                <Text>Tipo de imóvel: {imovel.tipoImovel}</Text>
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
});
