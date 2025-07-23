import React, { createContext, useContext, useState } from "react";

type Mensagem = {
  texto: string;
  tipo: "user" | "ia";
};

interface DuvidaContextType {
  mensagens: Mensagem[];
  setMensagens: React.Dispatch<React.SetStateAction<Mensagem[]>>;
}

const DuvidaContext = createContext<DuvidaContextType | undefined>(undefined);

export const DuvidaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  return (
    <DuvidaContext.Provider value={{ mensagens, setMensagens }}>
      {children}
    </DuvidaContext.Provider>
  );
};

export const useDuvida = () => {
  const context = useContext(DuvidaContext);
  if (!context) {
    throw new Error("useDuvida deve ser usado dentro de DuvidaProvider");
  }
  return context;
};