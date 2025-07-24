import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";

type MenuItem = { to: string; label: string };

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  if (location.pathname === "/login") return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fecha o menu e trava scroll do body
  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuAberto(false);
      }
    };
    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  const menuItems: MenuItem[] = [
    { to: "/inicio", label: "Início" },
    { to: "/chat", label: "Chat" },
    { to: "/rank", label: "Rank" },
    { to: "/duvidas", label: "Dúvidas" },
    ...(user?.role === "admin"
      ? [{ to: "/configuracoes", label: "Configurações" }]
      : []),
  ];

  return (
    <>
      {/* HEADER FIXO */}
      <header className="sticky top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md shadow flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="block lg:hidden text-gray-700 text-2xl focus:outline-none"
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <Link
            to="/inicio"
            className="font-bold text-xl text-blue-700 hover:scale-105 transition no-underline"
          >
            HealthScore
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-700 max-w-[160px] truncate">
            {user?.username}{" "}
            <span className="text-xs text-gray-400">({user?.role})</span>
          </span>
          {!menuAberto && (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-700"
            >
              Sair
            </button>
          )}
        </div>
      </header>

      {/* MENU MOBILE */}
      {menuAberto && (
        <>
          {/* overlay suave */}
          <div
            className="fixed inset-0 bg-white/10 z-40"
            onClick={() => setMenuAberto(false)}
            aria-hidden="true"
          />

          {/* painel lateral */}
          <div
            ref={menuRef}
            className="fixed inset-y-0 left-0 w-[70vw] bg-white z-50 shadow-lg px-6 pb-6 flex flex-col"
          >
            {/* header do menu alinhado ao topo */}
            <div className="flex items-center justify-between py-3 mb-3">
              <span className="font-bold text-lg text-blue-700">Menu</span>
              <button
                onClick={() => setMenuAberto(false)}
                className="text-gray-600 text-2xl leading-none focus:outline-none"
                aria-label="Fechar menu"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.to;
                const iconColor = isActive ? "1E3A8A" : "1D4ED8";

                let id = "";
                switch (item.to) {
                  case "/inicio":
                    id = "83326";
                    break;
                  case "/chat":
                    id = "BgCyOQRJulgd";
                    break;
                  case "/rank":
                    id = "49FsAPtMkn2q";
                    break;
                  case "/duvidas":
                    id = "98973";
                    break;
                  case "/configuracoes":
                    id = "2969";
                    break;
                }

                return (
                  <Link
                    key={i}
                    to={item.to}
                    onClick={() => setMenuAberto(false)}
                    className={`flex items-center text-base font-medium transition ${
                      isActive
                        ? "text-blue-900"
                        : "text-blue-700 hover:text-blue-900"
                    }`}
                  >
                    <img
                      src={`https://img.icons8.com/?size=100&id=${id}&format=png&color=${iconColor}`}
                      alt={item.label}
                      className="w-6 h-6 mr-2"
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left text-red-600 font-medium hover:text-red-800 transition"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=59781&format=png&color=DC2626"
                  alt="Sair"
                  className="w-6 h-6 mr-2"
                />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
