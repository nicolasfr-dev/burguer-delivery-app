import { BasketIcon, NotepadIcon, HamburgerIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="w-full fixed lg:hidden max-h-full bg-dark-gray2 text-light-gray border-t-primary border-t-2 bottom-0 left-0 right-0 flex justify-center overflow-hidden shadow-lg">
        <ul className="flex">
          <NavLink to="/">
            <li className="content-center justify-items-center h-24 w-24 active:text-primary active:bg-dark-gray3 transition-colors">
              <div className="flex flex-col items-center">
                <HamburgerIcon size={40} weight="fill" />
                <span className="text-sm font-light">Menu</span>
              </div>
            </li>
          </NavLink>

          <NavLink to="/pedidos">
            <li className="content-center justify-items-center h-24 w-24 active:text-primary active:bg-dark-gray3 transition-colors">
              <div className="flex flex-col items-center">
                <NotepadIcon size={40} weight="fill" />
                <span className="text-sm font-light">Pedidos</span>
              </div>
            </li>
          </NavLink>

          <NavLink to="/carrinho">
            <li className="content-center justify-items-center h-24 w-24 active:text-primary active:bg-dark-gray3 transition-colors">
              <div className="flex flex-col items-center">
                <BasketIcon size={40} weight="fill" />
                <span className="text-sm font-light">Carrinho</span>
              </div>
            </li>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
