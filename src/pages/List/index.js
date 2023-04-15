import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, Text, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ImoveisContext } from "../../context";

export default function List({ navigation }) {
  const imoveisContext = useContext(ImoveisContext);

  const [filtroTipoContrato, setFiltroTipoContrato] = useState("Todos");
  const [listaImoveis] = useState(imoveisContext.localImoveis);
  const theme = useTheme();

  useEffect(() => {
    let listaImoveisFiltrado = imoveisContext.imoveis;

    if (filtroTipoContrato !== "Todos") {
      listaImoveisFiltrado = imoveisContext.imoveis.filter(
        (imovel) => imovel.tipoContrato === filtroTipoContrato
      );
    }

    setListaImoveis(listaImoveisFiltrado);
  }, [filtroTipoContrato]);

  useEffect(() => {
    setListaImoveis(imoveisContext.imoveis);
  }, [imoveisContext.imoveis]);

  console.log({ listaImoveis, context: imoveisContext });

  return (
    <View style={styles.container}>
      <ScrollView>
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
                value="Todos"
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
              <Text style={{ color: theme.colors.tertiary }}>Todos</Text>
            </View>

          <View style={styles.radioButton}>
            <RadioButton
              value="Locação"
              color={theme.colors.primary}
              uncheckedColor={theme.colors.primary}
            />
            <Text style={{ color: theme.colors.tertiary }}>Locação</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton
              value="Venda"
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
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Imóvel #{index + 1}</Text>
              <View style={styles.iconsContainer}>
                <Ionicons
                  name="create-outline"
                  size={25}
                  color="black"
                  onPress={() =>
                    navigation.push("Edição", {
                      idImovel: imovel.id,
                    })
                  }
                />
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color="black"
                  onPress={() => imoveisContext.removerImovel(imovel.id)}
                />
              </View>
            </View>

            <View key={index} style={styles.homeContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Contrato</Text>
                <Text>{imovel.tipoContrato}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Tipo imóvel</Text>
                <Text>{imovel.tipoImovel}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Endereço</Text>
                <Text>{imovel.enderecoImovel}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Valor do aluguel</Text>
                <Text>
                  {imovel.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Valor do condomínio</Text>
                <Text>
                  {imovel.valorCondominio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Número de banheiros</Text>
                <Text>{imovel.numeroBanheiros}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Número de quartos</Text>
                <Text>{imovel.numeroQuartos}</Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Locado</Text>
                {imovel.statusLocacao ? (
                  <Ionicons name="checkmark" size={20} color="green" />
                ) : (
                  <Ionicons name="close" size={20} color="red" />
                )}
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>Imagem</Text>
                <Image
                  source={imovel.fotoImovel}
                  style={styles.fotoUrl}
                  resizeMode="contain"
                />
              </View>
              
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    height: "100%",
  },

  listContainer: {
    gap: 16,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
  },

  homeContainer: {
    width: "100%",
    gap: 8,
  },

  infoContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontWeight: 700,
  },

  dataContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 8,
    border: "1px solid",
    justifyContent: "space-between",
    gap: 16,
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
    width: 100,
    height: 100,
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
