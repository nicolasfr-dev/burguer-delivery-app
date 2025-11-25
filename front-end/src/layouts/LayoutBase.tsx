import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import Header from "../components/UI/Header";

const LayoutBase = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const showSearch = location.pathname === "/"; // ⬅️ só no cardápio

  return (
    <>
      <Header onSearch={setSearch} showSearch={showSearch} />

      <main className="bg-dark-gray min-h-screen w-full px-5 pb-28 lg:pb-5 lg:px-12 pt-[115px]">
        <Outlet context={{ search }} />
      </main>

      <NavBar />
    </>
  );
};

export default LayoutBase;
