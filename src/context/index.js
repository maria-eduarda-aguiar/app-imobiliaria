import { createContext, useEffect, useState } from "react";
import {
  dbAddImovel,
  dbEditarImovel,
  dbExcluirImovel,
  getImovelById,
  getListaImoveis,
} from "../database/db";

export const ImoveisContext = createContext();

export default function ImoveisProvedor({ children }) {
  const [localImoveis, setLocalImoveis] = useState([]);

  // Adiciona o imóvel no banco de dados.
  const addImovel = async (imovel) => {
    await dbAddImovel(imovel);
  };

  const removerImovel = async (idImovel) => {
    await dbExcluirImovel(idImovel);
  };

  const editarImovel = async (idImovel, dadosImovel) => {
    await dbEditarImovel(idImovel, dadosImovel);
    getLista();
  };

  const getImovel = async (idImovel) => {
    return localImoveis.find((imovel) => imovel.id === idImovel);
  };

  const getLista = async () => {
    const lista = await getListaImoveis();
    setLocalImoveis(lista);
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
