import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useConfiguracoes } from "../context/ConfiguracoesContext";
import fundo from "../assets/fundo.png";

const ConfiguracoesRegras: React.FC = () => {
  const { user } = useAuth();
  const { regras, editarRegra } = useConfiguracoes();

  const [editando, setEditando] = useState<number | null>(null);
  const [novaRegra, setNovaRegra] = useState<string>("");

  const handleEditar = (index: number) => {
    setEditando(index);
    setNovaRegra(regras[index]);
  };

  const handleSalvar = (index: number) => {
    editarRegra(index, novaRegra);
    setEditando(null);
  };

  const handleCancelar = () => {
    setEditando(null);
    setNovaRegra("");
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="p-6 text-red-600 text-center font-semibold">
        Acesso negado. Esta página é restrita a administradores.
      </div>
    );
  }

  const blocos = [regras.slice(0, 5), regras.slice(5, 10), regras.slice(10, 15)];

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="mb-6">Edite rapidamente as regras de uso do sistema.</p>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {blocos.map((bloco, colIndex) => (
            <div
              key={colIndex}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex-1 space-y-4 min-w-0 min-h-[340px]"
            >
              {bloco.map((regra, index) => {
                const regraIndex = colIndex * 5 + index;
                return (
                  <div key={regraIndex} className="flex items-start gap-2">
                    <span className="text-blue-300 mt-[2px]">→</span>
                    {editando === regraIndex ? (
                      <div className="flex-1 flex flex-col gap-1">
                        <input
                          className="text-sm text-black p-2 rounded w-full max-w-full"
                          value={novaRegra}
                          onChange={(e) => setNovaRegra(e.target.value)}
                          maxLength={60}
                          placeholder="Máx. 60 caracteres"
                        />
                        <div className="text-xs text-right text-gray-200 italic">
                          {novaRegra.length}/60
                        </div>
                        <div className="flex gap-2 flex-wrap mt-1">
                          <button
                            onClick={() => handleSalvar(regraIndex)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={handleCancelar}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full items-center gap-2">
                        <span className="break-words pr-2 flex-1 max-w-[90%]">{regra}</span>
                        <button
                          onClick={() => handleEditar(regraIndex)}
                          className="text-blue-300 text-xs underline hover:text-white whitespace-nowrap self-center"
                        >
                          Editar
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesRegras;
