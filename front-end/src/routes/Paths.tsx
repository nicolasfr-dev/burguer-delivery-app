import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutBase from "../layouts/LayoutBase";
import MainPage from "../pages/MainPage";
import PedidosPage from "../pages/PedidosPage";
import CarrinhoPage from "../pages/CarrinhoPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
