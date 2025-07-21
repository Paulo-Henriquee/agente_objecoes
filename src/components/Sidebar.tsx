import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (location.pathname === "/login") return null;

  const iconBaseClass = "w-5 h-5 mr-2 transition-colors";

  const menuItems = [
    {
      label: "Início",
      to: "/inicio",
      icon: (isActive: boolean) => (
        <img
          src={`https://img.icons8.com/?size=100&id=83326&format=png&color=${
            isActive ? "04436E" : "FFFFFF"
          }`}
          alt="Início"
          className={iconBaseClass}
        />
      ),
    },
    {
      label: "Chat",
      to: "/chat",
      icon: (isActive: boolean) => (
        <img
          src={`https://img.icons8.com/?size=100&id=BgCyOQRJulgd&format=png&color=${
            isActive ? "04436E" : "FFFFFF"
          }`}
          alt="Chat"
          className={iconBaseClass}
        />
      ),
    },
    {
      label: "Rank",
      to: "/rank",
      icon: (isActive: boolean) => (
        <img
          src={`https://img.icons8.com/?size=100&id=49FsAPtMkn2q&format=png&color=${
            isActive ? "04436E" : "FFFFFF"
          }`}
          alt="Rank"
          className={iconBaseClass}
        />
      ),
    },
    {
      label: "Duvidas",
      to: "/duvidas",
      icon: (isActive: boolean) => (
        <img
          src={`https://img.icons8.com/?size=100&id=98973&format=png&color=${
            isActive ? "04436E" : "FFFFFF"
          }`}
          alt="Duvidas"
          className={iconBaseClass}
        />
      ),
    },
    ...(user?.role === "admin"
      ? [
          {
            label: "Configurações",
            to: "/configuracoes",
            icon: (isActive: boolean) => (
              <svg
                className={iconBaseClass}
                fill="none"
                stroke={isActive ? "#04436E" : "white"}
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v1m0 14v1m8-8h1M4 12H3m15.36 6.36l-.71-.71M6.34 6.34l-.71-.71m12.02 0l-.71.71M6.34 17.66l-.71.71"
                />
              </svg>
            ),
          },
        ]
      : []),
  ];

  return (
    <aside className="hidden lg:flex w-56 bg-[#04436E] shadow h-screen sticky top-0 flex-col">
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-white text-[#04436E]"
                      : "text-white hover:bg-[#06568D]"
                  }`
                }
                end
              >
                {({ isActive }) => (
                  <>
                    {item.icon(isActive)}
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
