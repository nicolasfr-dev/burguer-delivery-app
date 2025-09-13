import { PlusCircleIcon } from "@phosphor-icons/react";

interface CardapioItemProps {
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
}

const moeda = (valor: number) => {
    return valor.toFixed(2).replace('.', ',');
}

const CardapioItem = (props: CardapioItemProps) => {
    return ( 
        <>
        <div className="flex items-center py-4  border-b-1 border-dark-gray3 space-x-2">
            <div className="flex flex-col flex-grow w-2/4">
                <h3 className="text-2xl font-bold text-light-gray">{props.nome}</h3>
                <p className="text-gray-400 text-sm">{props.descricao}</p>
            </div>
            <span className=" text-light-gray2 font-black w-1/4">R$ {moeda(props.preco)}</span>
            <button className="text-secondary py-2 rounded-md active:text-accent"><PlusCircleIcon size={40} weight="fill" /></button>
        </div>
        </>
     );
}

export default CardapioItem;