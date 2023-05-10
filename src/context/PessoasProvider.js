import { createContext, useState } from "react";
import { db } from "../../src/database/db";

export const PessoasContext = createContext();

export default function PessoasProvedor({ children }) {
  const [localPessoas, setLocalPessoas] = useState([]);

  // Adiciona a pessoa no banco de dados.
  const addPessoa = (pessoa) => {
    const query = `
      INSERT INTO pessoas(
        nomeLocatario,
        cpf,
        dataNascimento,
        rendaMensal,
        diaVencimentoAluguel,
        dataInicioContrato,
        dataTerminoContrato,
        imovelVinculado)
      VALUES (?,?,?,?,?,?,?,?)
    `
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [
          pessoa.nomeLocatario,
          pessoa.cpf,
          pessoa.dataNascimento,
          pessoa.rendaMensal,
          pessoa.diaVencimentoAluguel,
          pessoa.dataInicioContrato,
          pessoa.dataTerminoContrato,
          pessoa.imovelVinculado,
        ],
        () => {
          getListaPessoas();
          
          if (pessoa.imovelVinculado) {
            db.transaction((tx) => {
              tx.executeSql(
                `UPDATE imoveis SET statusLocacao = "true", nomeLocatario = "${pessoa.nomeLocatario}" WHERE id = ${pessoa.imovelVinculado}`,
                [],
                () => {},
                (txObj, error) => console.log({ error })
              );
            });
          }
        },
        (txObj, error) => console.log({ error })
      );
    });
  };

  const getListaPessoas = () => {
    const query = `SELECT * FROM pessoas`

    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (txObj, resultSet) => setLocalPessoas([...resultSet.rows]),
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <PessoasContext.Provider
      value={{
        localPessoas,
        addPessoa,
      }}
    >
      {children}
    </PessoasContext.Provider>
  );
}
