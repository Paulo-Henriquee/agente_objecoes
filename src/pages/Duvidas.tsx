import React, { useState, useRef, useEffect } from "react";
import fundo from "../assets/fundo.png";
import logo from "../assets/HS2.ico";
import axios from "axios";
import { getAuthToken, getUsuarioAtual } from "../services/api";
import { useDuvida } from "../context/DuvidaContext";

interface Mensagem {
  texto: string;
  tipo: "user" | "ia";
}

const Duvidas: React.FC = () => {
  const [mensagem, setMensagem] = useState("");
  const { mensagens, setMensagens } = useDuvida();
  const [digitandoIA, setDigitandoIA] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const handleEnviar = async () => {
    if (!mensagem.trim()) return;

    const novaMensagem: Mensagem = { texto: mensagem.trim(), tipo: "user" };
    const historicoFormatado = mensagens.map((m) => ({
      tipo: m.tipo,
      conteudo: m.texto,
    }));

    setMensagens((prev) => [...prev, novaMensagem]);
    setMensagem("");
    setDigitandoIA(true);

    try {
      const token = getAuthToken();
      if (!token) throw new Error("Token não encontrado.");

      const user = await getUsuarioAtual(token);
      const usuario_id = String(user.id);

      const response = await axios.post(
        "https://scoreapi.healthsafetytech.com/chat/historico?prompt=nina2",
        {
          mensagem: mensagem.trim(),
          historico: historicoFormatado,
          usuario_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const respostaIA = response.data.resposta;

      setMensagens((prev) => [
        ...prev,
        { texto: respostaIA, tipo: "ia" },
      ]);
    } catch (err) {
      console.error("Erro ao falar com a IA:", err);
      setMensagens((prev) => [
        ...prev,
        {
          texto: "⚠️ Erro ao se conectar com a assistente. Verifique seu login.",
          tipo: "ia",
        },
      ]);
    } finally {
      setDigitandoIA(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleEnviar();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens, digitandoIA]);

  useEffect(() => {
    const carregarHistorico = async () => {
      if (mensagens.length > 0) return;

      try {
        const token = getAuthToken();
        if (!token) return;

        const user = await getUsuarioAtual(token);
        const usuario_id = user.id;

        const response = await axios.get(
          `https://scoreapi.healthsafetytech.com/chat/historico/${usuario_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          const mensagensConvertidas = response.data.map((m: any) => ({
            tipo: m.tipo,
            texto: m.conteudo,
          }));

          setMensagens(mensagensConvertidas);
        }
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      }
    };

    carregarHistorico();
  }, []);

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center px-4 py-4"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 max-w-6xl w-full flex flex-col">
        {/* Logo acima do título */}
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src={logo}
            alt="Logo Health Safety"
            className="w-10 h-10 sm:w-12 sm:h-12 mb-1"
          />
          <h1 className="text-2xl md:text-3xl font-bold">
            DÚVIDAS - HEALTH SAFETY
          </h1>
        </div>

        {/* Mensagem introdutória */}
        <p className="text-center text-sm md:text-base text-white mb-6">
          Olá! Eu sou a <strong>Nina</strong>, sua assistente virtual de dúvidas.
          Estou aqui para te ajudar a encontrar respostas com mais rapidez, clareza e praticidade.
        </p>

        {/* Chat com rolagem */}
        <div
          ref={chatRef}
          className="flex-1 bg-white/10 rounded-lg p-4 overflow-y-auto mb-4 space-y-2 max-h-[50vh]"
        >
          {mensagens.length === 0 ? (
            <p className="text-center text-gray-300">Nenhuma mensagem ainda...</p>
          ) : (
            <>
              {mensagens.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.tipo === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] w-fit p-3 rounded-2xl text-sm break-words whitespace-pre-wrap ${
                      msg.tipo === "user"
                        ? "bg-blue-800 text-white"
                        : "bg-blue-200 text-blue-900"
                    }`}
                  >
                    {msg.texto}
                  </div>
                </div>
              ))}

              {digitandoIA && (
                <div className="flex justify-start">
                  <div className="bg-blue-200 text-blue-900 p-3 rounded-2xl w-fit flex gap-1 items-center text-sm">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-400">.</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Campo de entrada */}
        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Digite sua dúvida aqui..."
            className="flex-1 rounded-full px-4 py-2 text-gray-900 text-sm focus:outline-none border border-gray-300"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleEnviar}
            aria-label="Enviar"
            className="ml-2 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="#1565C0"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Duvidas;
