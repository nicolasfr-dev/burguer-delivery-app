import { useState } from "react";
import {
  MagnifyingGlassIcon,
  HamburgerIcon,
  NotepadIcon,
  BasketIcon,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

interface HeaderProps {
  onSearch: (value: string) => void;
  showSearch: boolean;
}

const Header = ({ onSearch, showSearch }: HeaderProps) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 lg:px-12 border-b-primary bg-dark-gray2 border-b border-dark-gray3 py-3 px-5 flex flex-col gap-3 shadow-lg transition-all">

      {/* Linha principal — Desktop */}
      <div className="flex items-center justify-between">

        {/* LOGO + Links Desktop */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-light-gray">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-primary transition-colors
                ${isActive ? "text-primary" : ""}`
              }
            >
              <HamburgerIcon size={24} weight="fill" />
              <span className="font-light">Menu</span>
            </NavLink>

            <NavLink
              to="/pedidos"
              className={({ isActive }) =>
                `flex items-center gap-2 hover:text-primary transition-colors
                ${isActive ? "text-primary" : ""}`
              }
            >
              <NotepadIcon size={24} weight="fill" />
              <span className="font-light">Pedidos</span>
            </NavLink>
          </nav>
        </div>

        {/* Espaço vazio entre nav e ações — cresce no desktop */}
        <div className="flex-1 hidden lg:block"></div>

        {/* Ações: search + carrinho */}
        <div className="flex items-center gap-4">

          {/* Botão Search */}
          {showSearch && (
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className={`
                p-2 transition-colors duration-200 hover:text-primary
                ${openSearch ? "text-primary" : "text-light-gray2"}
              `}
            >
              <MagnifyingGlassIcon size={26} weight="bold" />
            </button>
          )}

          {/* Carrinho */}
          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `hover:text-primary transition-colors invisible md:visible
              ${isActive ? "text-primary" : "text-light-gray2"}`
            }
          >
            <BasketIcon size={28} weight="fill" />
          </NavLink>

        </div>
      </div>

      {/* Campo de busca — apenas quando ativo */}
      {showSearch && openSearch && (
        <div className="relative w-full animate-fadeIn">
          <MagnifyingGlassIcon
            size={20}
            weight="bold"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-light-gray2"
          />

          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar no cardápio..."
            autoFocus
            className="w-full bg-dark-gray3 text-light-gray placeholder-light-gray2 pl-10 pr-4 py-3 rounded-xl border border-dark-gray focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
