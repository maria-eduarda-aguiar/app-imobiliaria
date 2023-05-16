import { createContext, useState } from "react";
import { salvarUsuario } from "../requests/UserRequest";

export const UserContext = createContext();

export default function UserProvedor({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  const addUser = async (usuario) => {
    setLoading(true);

    const response = await salvarUsuario(usuario);

    setUsuario(response);
    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        usuario,
        addUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
