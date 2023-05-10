import { createContext, useState } from "react";
import { db } from "../../src/database/db";

export const LoginContext = createContext();

export default function LoginProvedor({ children }) {
  const [login, setLogin] = useState([]);

  // Adiciona o login no banco de dados.
  const addLogin = (login) => {
    const loginEncontrado = buscarLoginPorEmail(db, login?.email)
    let query = ''
    if (!loginEncontrado) {
        query = `
        INSERT INTO login (apikey, email, expiration_date, token)
        VALUES ("${login.apikey}", "${login.email}",
        "${login.expirationDate}", "${login.token}")
        `
    } else {
        query = `
        UPDATE login SET apikey="${login.apikey}", 
        email="${login.email}", 
        expiration_date="${login.expirationDate}",
        token="${login.token}"
        WHERE id=${loginEncontrado.id}
        `
    }
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [
          login.apikey,
          login.email,
          login.expirationDate,
          login.token,
        ],
        () => {
          getListaPessoas();
        },
        (txObj, error) => console.log({ error })
      );
    });
  };

  return (
    <LoginContext.Provider
      value={{
        localLogin,
        addLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}