import React, { useState, useRef, useEffect } from "react";
import DificuldadeModal from "../components/DificuldadeModal";
import ModalFinal from "../components/ModalFinal";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";

interface Mensagem {
  texto: string;
  tipo: "user" | "ia";
}

const AgenteObjecoes: React.FC = () => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [digitandoIA, setDigitandoIA] = useState(false);
  const [nivel, setNivel] = useState<string | null>(null);
  const [respostasUsuario, setRespostasUsuario] = useState(0);
  const [bloquearEnvio, setBloquearEnvio] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [testeFinalizado, setTesteFinalizado] = useState(false);
  const [colorToggle, setColorToggle] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens, digitandoIA]);

  useEffect(() => {
    const ultima = mensagens[mensagens.length - 1];
    if (respostasUsuario >= 4 && ultima?.tipo === "ia" && !showCountdown) {
      setBloquearEnvio(true);
      setShowCountdown(true);
      setCountdown(10);
    }
  }, [mensagens, respostasUsuario, showCountdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let colorInterval: NodeJS.Timeout;

    if (showCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      colorInterval = setInterval(() => setColorToggle((prev) => !prev), 500);
    }

    if (showCountdown && countdown === 0) {
      setTesteFinalizado(true);
      setShowCountdown(false);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(colorInterval);
    };
  }, [countdown, showCountdown]);

  const enviarMensagem = () => {
    if (!mensagem.trim() || bloquearEnvio) return;

    const novaMensagem: Mensagem = { texto: mensagem.trim(), tipo: "user" };
    setMensagens((prev) => [...prev, novaMensagem]);
    setMensagem("");
    setDigitandoIA(true);
    setRespostasUsuario((prev) => prev + 1);

    setTimeout(() => {
      setDigitandoIA(false);
      setMensagens((prev) => [
        ...prev,
        { texto: "Resposta simulada da IA aqui...", tipo: "ia" },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  };

  if (!nivel) {
    return <DificuldadeModal onStart={(nivelEscolhido) => setNivel(nivelEscolhido)} />;
  }

  return (
    <div
      className="h-full w-full flex items-center justify-center bg-cover bg-center px-4 py-4"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-black/60 text-white rounded-xl p-6 max-w-4xl w-full flex flex-col">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          AGENTE DE OBJEÇÕES - HEALTH SAFETY
        </h1>

        {showCountdown && !testeFinalizado && (
          <div className="text-center mb-4">
            <p className={`text-sm font-semibold ${colorToggle ? "text-white" : "text-red-400"}`}>
              Tempo restante para finalizar simulação: {countdown}s
            </p>
            <button
              onClick={() => navigate("/rank")}
              className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 text-sm rounded-full transition"
            >
              VER RANK
            </button>
          </div>
        )}

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

        <div className="flex items-center mt-2">
          <input
            type="text"
            placeholder="Digite sua resposta como vendedor..."
            className="flex-1 rounded-full px-4 py-2 text-gray-900 text-sm focus:outline-none border border-gray-300"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={bloquearEnvio}
          />
          <button
            onClick={enviarMensagem}
            aria-label="Enviar"
            disabled={bloquearEnvio}
            className={`ml-2 p-2 ${bloquearEnvio ? "opacity-50 cursor-not-allowed" : ""}`}
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

      {testeFinalizado && <ModalFinal />}
    </div>
  );
};

export default AgenteObjecoes;
