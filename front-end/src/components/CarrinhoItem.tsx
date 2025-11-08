import { MinusCircleIcon } from "@phosphor-icons/react";
import { PlusCircleIcon } from "@phosphor-icons/react";

interface CarrinhoItemProps {
    conteudo: string;
    unidades: number;
    preco: number;

}

const CarrinhoItem = (props: CarrinhoItemProps) => {
    let precoTotal = props.unidades * props.preco;
    
    return ( 

        <li className="mb-4">
            <div className="flex items-center pb-4 border-b-1 border-dark-gray3">
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">{props.conteudo}</span>
                        <span className="text-light-gray2 font-black">R${precoTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="text-primary py-2 rounded-md active:text-white transition-colors"><PlusCircleIcon size={40} weight="fill" /></button>
                        <span className="text-lg text-center bg-dark-gray3 w-8 p-2 rounded-md font-bold text-light-gray2">{props.unidades}</span>
                        <button className="text-primary py-2 rounded-md active:text-white transition-colors"><MinusCircleIcon size={40} weight="fill" /></button>
                    </div>

                </div>
            </div>
        </li>
    );
}

export default CarrinhoItem;
