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

  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
    } else {
      document.removeEventListener("mousedown", handleClickFora);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, [menuAberto]);

  const menuItems: (MenuItem | false)[] = [
    { to: "/inicio", label: "Início" },
    { to: "/chat", label: "Chat" },
    { to: "/rank", label: "Rank" },
    { to: "/duvidas", label: "Dúvidas" },
    user?.role === "admin" && { to: "/configuracoes", label: "Configurações" },
  ];

  return (
    <header className="relative z-50 bg-white/80 backdrop-blur-md shadow flex items-center justify-between px-4 py-3 w-full">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="block lg:hidden text-gray-700 focus:outline-none"
        >
          ☰
        </button>

        {/* Link para a home (/inicio) */}
        <Link
          to="/inicio"
          className="font-bold text-xl text-blue-700 transition-transform duration-200 hover:scale-105 no-underline"
        >
          HealthScore
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-700 max-w-[160px] truncate">
          {user?.username}{" "}
          <span className="text-xs text-gray-400">({user?.role})</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-700"
        >
          Sair
        </button>
      </div>

      {menuAberto && (
        <div
          ref={menuRef}
          className="absolute left-0 top-full w-full bg-white shadow-md py-3 px-4 flex flex-col items-center gap-2 z-50"
        >
          {menuItems
            .filter((item): item is MenuItem => Boolean(item))
            .map((item, i) => (
              <Link
                key={i}
                to={item.to}
                onClick={() => setMenuAberto(false)}
                className="text-center bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition w-40"
              >
                {item.label}
              </Link>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
