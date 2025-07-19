import React, { useState, useRef, useEffect } from "react";
import DificuldadeModal from "../components/DificuldadeModal";
import ModalFinal from "../components/ModalFinal";
import { useNavigate } from "react-router-dom";

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
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      colorInterval = setInterval(() => {
        setColorToggle((prev) => !prev);
      }, 500);
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
    <div className="flex flex-col min-h-screen w-full max-w-screen bg-blue-50">
      {/* TÍTULO FIXO NO TOPO */}
      <header className="bg-blue-700 text-white text-center py-2 text-sm font-semibold">
        AGENTE DE OBJEÇÕES - HEALTH SAFETY
      </header>

      {/* ÁREA DE CONTEÚDO DO CHAT */}
      <main className="flex-1 overflow-y-auto px-3 pt-4 relative" ref={chatRef}>
        <div
          className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain pointer-events-none"
          style={{
            backgroundImage: "url('https://i.postimg.cc/GpZBNVD1/HS-Copia.png')",
          }}
        ></div>

        <div className="relative z-10 space-y-2">
          {showCountdown && !testeFinalizado && (
            <div className="flex flex-col items-center mb-2 gap-2">
              <p
                className={`text-sm font-semibold ${
                  colorToggle ? "text-black" : "text-red-600"
                }`}
              >
                Tempo restante para finalizar simulação: {countdown}s
              </p>
              <button
                onClick={() => navigate("/rank")}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 text-sm rounded-full transition"
              >
                VER RANK
              </button>
            </div>
          )}

          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.tipo === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[50%] w-fit p-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                  msg.tipo === "user"
                    ? "bg-blue-800 text-white"
                    : "bg-blue-200 text-blue-900"
                }`}
                style={{ wordBreak: "break-word" }}
              >
                {msg.texto}
              </div>
            </div>
          ))}

          {digitandoIA && (
            <div className="flex justify-start">
              <div className="msg bg-blue-200 text-blue-900 p-3 rounded-2xl w-fit flex gap-1 items-center text-sm">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-200">.</span>
                <span className="animate-bounce delay-400">.</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CAMPO DE MENSAGEM FIXO NO RODAPÉ */}
      <footer className="p-3 bg-white flex items-center gap-2 border-t border-gray-300">
        <input
          type="text"
          placeholder="Digite sua resposta como vendedor..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none text-sm"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={bloquearEnvio}
        />
        <button
          onClick={enviarMensagem}
          aria-label="Enviar"
          disabled={bloquearEnvio}
          className={`${
            bloquearEnvio ? "opacity-50 cursor-not-allowed" : ""
          }`}
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
      </footer>

      {testeFinalizado && <ModalFinal />}
    </div>
  );
};

export default AgenteObjecoes;
