import React, { createContext, useContext, useEffect, useState } from "react";
import { getRegras, updateRegra } from "../services/scoreapi";

interface Regra {
  id: number;
  conteudo: string;
  ordem: number;
}

interface ConfiguracoesContextType {
  regras: Regra[];
  editarRegra: (index: number, nova: string) => Promise<void>;
}

const ConfiguracoesContext = createContext<ConfiguracoesContextType | undefined>(undefined);

export const ConfiguracoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regras, setRegras] = useState<Regra[]>([]);

  useEffect(() => {
    const fetchRegras = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      try {
        const response = await getRegras(token);
        setRegras(response);
      } catch (err) {
        console.error("Erro ao buscar regras:", err);
      }
    };

    fetchRegras();
  }, []);

  const editarRegra = async (index: number, nova: string) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const regra = regras[index];
      const atualizada = await updateRegra(token, regra.id, nova);

      const novasRegras = [...regras];
      novasRegras[index] = atualizada;
      setRegras(novasRegras);
    } catch (err) {
      console.error("Erro ao atualizar regra:", err);
    }
  };

  return (
    <ConfiguracoesContext.Provider value={{ regras, editarRegra }}>
      {children}
    </ConfiguracoesContext.Provider>
  );
};

export const useConfiguracoes = () => {
  const context = useContext(ConfiguracoesContext);
  if (!context) {
    throw new Error("useConfiguracoes deve ser usado dentro de um ConfiguracoesProvider");
  }
  return context;
};
