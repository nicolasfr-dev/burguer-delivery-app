import { PlusCircleIcon } from "@phosphor-icons/react";

interface CardapioItemProps {
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

const moeda = (valor: number) => {
  return valor.toFixed(2).replace(".", ",");
};

const CardapioItem = (props: CardapioItemProps) => {
  return (
    <>
      <li className="mb-4">
        <div className="flex items-center pb-4 border-b-1 border-dark-gray3">
          <div className="flex flex-col flex-grow w-2/4">
            <h3 className="text-2xl font-bold text-primary">{props.nome}</h3>
            <p className="text-gray-400 text-sm">{props.descricao}</p>
          </div>
          <span className=" text-light-gray2 font-black w-1/4">
            R$ {moeda(props.preco)}
          </span>
          <button className="text-primary py-2 rounded-md active:text-white transition-colors">
            <PlusCircleIcon size={40} weight="fill" />
          </button>
        </div>
      </li>
    </>
  );
};

export default CardapioItem;
