import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, Text, useTheme } from "react-native-paper";
import { useContext } from "react";
import { ImoveisContext } from "../../context/ImoveisProvider";

export default function List({ navigation }) {
  const imoveisContext = useContext(ImoveisContext);

  const [filtroTipoContrato, setFiltroTipoContrato] = useState("Todos");
  const theme = useTheme();

  useEffect(() => {
    if (filtroTipoContrato !== "Todos") {
      imoveisContext.getLista(filtroTipoContrato);
    } else {
      imoveisContext.getLista();
    }
  }, [filtroTipoContrato]);

  useEffect(() => {
    imoveisContext.getLista();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="bodyLarge" style={{ color: theme.colors.secondary }}>
              Filtrar por tipo de contrato
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
                  <Text style={{ color: theme.colors.secondary }}>Todos</Text>
                </View>

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
          </View>

          <View style={styles.listContainer}>
            {imoveisContext.localImoveis.map((imovel, index) => (
              <View key={index} style={styles.dataContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Imóvel #{index + 1}</Text>
                  <View style={styles.iconsContainer}>
                    <Ionicons
                      name="create-outline"
                      size={25}
                      color="green"
                      onPress={() =>
                        navigation.push("Edição", {
                          idImovel: imovel.id,
                        })
                      }
                    />
                    <Ionicons
                      name="trash-outline"
                      size={25}
                      color="red"
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
                      {imovel.valor?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) ?? "0"}
                    </Text>
                  </View>

                  <View style={styles.infoContainer}>
                    <Text style={styles.label}>Valor do condomínio</Text>
                    <Text>
                      {imovel.valorCondominio?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }) ?? "0"}
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
                    {imovel.statusLocacao === "true" ? (
                      <Ionicons name="checkmark" size={20} color="green" />
                    ) : (
                      <Ionicons name="close" size={20} color="red" />
                    )}
                  </View>
                  {imovel.nomeLocatario && (
                    <View style={styles.infoContainer}>
                      <Text style={styles.label}>Nome Locatário</Text>
                      <Text>{imovel.nomeLocatario}</Text>
                    </View>
                  )}

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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
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
    backgroundColor: "#fff",
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
