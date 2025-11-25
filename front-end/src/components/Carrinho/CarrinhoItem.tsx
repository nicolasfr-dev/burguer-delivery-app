import { MinusIcon, PlusIcon, Trash } from "@phosphor-icons/react";
import { useCarrinho } from "../../contexts/CarrinhoContext";

interface Props {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  opcao?: string;
}

const moeda = (valor: number) => valor.toFixed(2).replace(".", ",");

export default function CarrinhoItem({ id, nome, preco, quantidade, opcao }: Props) {
  const { incrementar, decrementar, removerItem } = useCarrinho();

  return (
    <li className="p-4 bg-dark-gray2 rounded-xl flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-semibold text-white text-lg">{nome}</span>

        {opcao && (
          <span className="text-sm text-gray-400">
            Opção: <strong>{opcao}</strong>
          </span>
        )}

        <span className="text-primary font-bold">
          R$ {moeda(preco * quantidade)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => decrementar(id, opcao)}
          className="bg-primary p-2.5 rounded-lg text-black font-bold active:scale-95 transition"
          aria-label="Diminuir quantidade"
        >
          <MinusIcon size={12} />
        </button>

        <span className="w-6 text-center text-white font-bold">{quantidade}</span>

        <button
          onClick={() => incrementar(id, opcao)}
          className="bg-primary p-2.5 rounded-lg text-black font-bold active:scale-95 transition"
          aria-label="Aumentar quantidade"
        >
          <PlusIcon size={12} />
        </button>

        <button
          onClick={() => removerItem(id, opcao)}
          aria-label="Remover item"
          className="ml-4"
        >
          <Trash size={22} className="text-red-500" />
        </button>
      </div>
    </li>
  );
}
