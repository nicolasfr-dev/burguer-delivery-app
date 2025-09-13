import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarrinhoPage from "../pages/CarrinhoPage";
import LayoutBase from "../layouts/LayoutBase";
import MainPage from "../pages/MainPage";
import PedidosPage from "../pages/PedidosPage";

const Paths = () => {
    return ( 
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutBase />}>
                    <Route index element={<MainPage />} />
                    <Route path="pedidos" element={<PedidosPage />} />
                    <Route path="carrinho" element={<CarrinhoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </>
     );
}
 
export default Paths;