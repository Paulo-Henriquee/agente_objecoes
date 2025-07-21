import React, { createContext, useContext, useState } from "react";

interface ConfiguracoesContextType {
  regras: string[];
  editarRegra: (index: number, nova: string) => void;
}

const regrasIniciais = [
  "Mantenha seus dados de acesso em sigilo.",
  "Evite compartilhar seu login com outras pessoas.",
  "Sempre finalize a sessão após o uso.",
  "Respeite os níveis de permissão definidos no sistema.",
  "Revise as informações antes de confirmar qualquer operação.",
  "Mantenha os dados dos clientes atualizados.",
  "Utilize senhas fortes e troque-as periodicamente.",
  "Não altere configurações sem autorização.",
  "Reportar qualquer falha ou bug imediatamente.",
  "Evite uso do sistema em redes públicas não confiáveis.",
  "Utilize navegadores atualizados.",
  "Evite abrir anexos suspeitos durante o uso.",
  "Nunca compartilhe prints com dados sensíveis.",
  "Acompanhe atualizações de funcionalidades.",
  "Use o suporte apenas por canais oficiais."
];

const ConfiguracoesContext = createContext<ConfiguracoesContextType | undefined>(undefined);

export const ConfiguracoesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [regras, setRegras] = useState<string[]>(regrasIniciais);

  const editarRegra = (index: number, nova: string) => {
    const atualizadas = [...regras];
    atualizadas[index] = nova;
    setRegras(atualizadas);
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
