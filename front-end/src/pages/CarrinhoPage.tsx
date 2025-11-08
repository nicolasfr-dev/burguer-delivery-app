import { WhatsappLogoIcon } from "@phosphor-icons/react";
import CarrinhoList from "../components/CarrinhoList";

const CarrinhoPage = () => {
    return ( 
        <>
            <CarrinhoList />
            <button className="fixed justify-self-center w-2/3 h-12 border-2 border-green-600 text-green-600 font-bold rounded-3xl hover:bg-primary-dark transition-colors active:bg-green-600 active:text-white">
            <span className="flex items-center justify-center gap-x-1"><WhatsappLogoIcon size={32} />Finalizar Pedido</span>
            </button>
            
        </>
    );
}

export default CarrinhoPage;