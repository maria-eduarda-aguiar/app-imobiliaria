import { createContext, useState } from "react";
import { efetuarLogin } from "../requests/LoginRequest";
import { salvarUsuario } from "../requests/UserRequest";

export const LoginContext = createContext();

export default function LoginProvedor({ children }) {
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  const addLogin = async (login) => {
    setLoading(true);

    const response = await efetuarLogin(login);

    setLogin(response);
    setLoading(false);
  };

  const criarConta = async (dados) => {
    await salvarUsuario(dados)
  }

  return (
    <LoginContext.Provider
      value={{
        loading,
        login,
        criarConta,
        addLogin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
