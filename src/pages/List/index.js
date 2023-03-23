import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";

export default function List() {
  const listaImoveis = JSON.parse(localStorage.getItem("listaImoveis"));

  console.log({ listaImoveis });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Imóveis Cadastrados</Text>
      <View style={styles.listContainer}>
        {listaImoveis.map((imovel, index) => (
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

  homeContainer: {
    padding: 16,
    borderRadius: 8,
    border: "1px solid",
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
