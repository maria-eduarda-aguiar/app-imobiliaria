import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbAddImovel } from "../database/db";

export const ImoveisContext = createContext();

export default function ImoveisProvedor({ children }) {
  const [imoveis, setImoveis] = useState([]);

  // Adiciona o imóvel no "DB"
  const addImovel = (imovel) => {
    dbAddImovel(imovel)
  };

  const removerImovel = (idImovel) => {
    setImoveis((state) => {
      let novosImoveis = [...state];

      novosImoveis = novosImoveis.filter((imovel) => imovel.id !== idImovel);

      return [...novosImoveis];
    });
  };

  const editarImovel = (idImovel, dadosImovel) => {
    setImoveis((state) => {
      let novosImoveis = [...state];

      novosImoveis = novosImoveis.map((imovel) => {
        if (imovel.id === idImovel) {
          return {
            ...imovel,
            ...dadosImovel,
          };
        }
        return imovel;
      });

      return [...novosImoveis];
    });
  };

  const getImovel = (idImovel) => {
    return imoveis.find((imovel) => imovel.id === idImovel);
  };

  return (
    <ImoveisContext.Provider
      value={{ imoveis, addImovel, removerImovel, editarImovel, getImovel }}
    >
      {children}
    </ImoveisContext.Provider>
  );
}
