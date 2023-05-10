import { createContext, useState } from "react";
import { db } from "../database/db";

export const ImoveisContext = createContext();

export default function ImoveisProvedor({ children }) {
  const [localImoveis, setLocalImoveis] = useState([]);

  // Adiciona o imóvel no banco de dados.
  const addImovel = (imovel) => {
    const query = `
      INSERT INTO imoveis(
        tipoContrato,
        tipoImovel,
        enderecoImovel,
        valor,
        valorCondominio,
        numeroQuartos,
        numeroBanheiros,
        fotoImovel,
        statusLocacao)
      VALUES (?,?,?,?,?,?,?,?,?)
    `
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [
          imovel.tipoContrato,
          imovel.tipoImovel,
          imovel.enderecoImovel,
          imovel.valor,
          imovel.valorCondominio,
          imovel.numeroQuartos,
          imovel.numeroBanheiros,
          imovel.fotoImovel,
          imovel.statusLocacao ?? false,
        ],
        () => {
          getLista();
        }
      );
    });
  };

  const removerImovel = (idImovel) => {
    const query = `
      DELETE FROM imoveis WHERE id = ?
    `

    db.transaction((tx) => {
      tx.executeSql(query, [idImovel], () => getLista());
    });
  };

  const editarImovel = (idImovel, dadosImovel) => {
    const query = `
      UPDATE imoveis
        SET
          tipoContrato = "${dadosImovel.tipoContrato}",
          tipoImovel = "${dadosImovel.tipoImovel}",
          enderecoImovel = "${dadosImovel.enderecoImovel}",
          valor = ${dadosImovel.valor},
          valorCondominio = ${dadosImovel.valorCondominio},
          numeroQuartos = ${dadosImovel.numeroQuartos},
          numeroBanheiros = ${dadosImovel.numeroBanheiros},
          fotoImovel = "${dadosImovel.fotoImovel}",
          statusLocacao = ${dadosImovel.statusLocacao}
          WHERE id = ${idImovel};
      `
    db.transaction((tx) => {
      tx.executeSql(query, [], () => getLista());
    });
  };

  const getImovel = (idImovel) => {
    return localImoveis.find((imovel) => imovel.id === idImovel);
  };

  const getLista = (tipoContrato) => {
    const query = `SELECT * FROM imoveis ${
      tipoContrato ? `WHERE tipoContrato = '${tipoContrato}'` : ""
    } `

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (txObj, resultSet) => setLocalImoveis([...resultSet.rows]),
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <ImoveisContext.Provider
      value={{
        localImoveis,
        addImovel,
        removerImovel,
        editarImovel,
        getImovel,
        getLista,
      }}
    >
      {children}
    </ImoveisContext.Provider>
  );
}
