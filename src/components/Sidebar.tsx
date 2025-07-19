import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  if (location.pathname === "/login") return null;

  const menuItems = [
    {
      label: "Início",
      to: "/inicio",
      icon: (
        <img
          src="https://img.icons8.com/?size=100&id=83326&format=png&color=000000"
          alt="Início"
          className="w-5 h-5 mr-2"
        />
      ),
    },
    {
      label: "Chat",
      to: "/chat",
      icon: (
        <img
          src="https://img.icons8.com/?size=100&id=BgCyOQRJulgd&format=png&color=000000"
          alt="Chat"
          className="w-5 h-5 mr-2"
        />
      ),
    },
    {
      label: "Rank",
      to: "/rank",
      icon: (
        <img
          src="https://img.icons8.com/?size=100&id=DrwIcwCjRehp&format=png&color=000000"
          alt="Rank"
          className="w-5 h-5 mr-2"
        />
      ),
    },
    {
      label: "Serviços",
      to: "/servicos",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6h6v6m-3-12a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
      ),
    },
    ...(user?.role === "admin"
      ? [
          {
            label: "Configurações",
            to: "/configuracoes",
            icon: (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
    <aside className="hidden lg:flex w-56 bg-white shadow h-screen sticky top-0 flex-col">
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`
                }
                end
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
