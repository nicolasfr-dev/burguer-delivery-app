import Modal from "../UI/Modal";
import { useState } from "react";
import { useCarrinho } from "../../contexts/CarrinhoContext";
import { PlusIcon } from "@phosphor-icons/react";

interface CardapioItemProps {
  id: string;
  nome: string;
  preco: number;
  descricao?: string;
  imagem?: string;
  opcoes?: string[]; // <-- pode ser undefined
}

export default function CardapioItem({
  id,
  nome,
  preco,
  descricao,
  opcoes = [],
}: CardapioItemProps) {
  const { adicionarItem } = useCarrinho();

  const [modalAberto, setModalAberto] = useState(false);
  const [opcaoEscolhida, setOpcaoEscolhida] = useState("");

  const handleAdicionar = () => {
    // Se tem opções → abre modal
    if (opcoes.length > 0) {
      setModalAberto(true);
      return;
    }

    // Sem opções → adiciona direto
    adicionarItem({
      id,
      nome,
      preco,
      quantidade: 1,
    });
  };

  const confirmarOpcao = () => {
    adicionarItem({
      id: id + "-" + opcaoEscolhida, // item único
      nome,
      preco,
      quantidade: 1,
      opcao: opcaoEscolhida, // <-- salva opção no item
    });

    setModalAberto(false);
    setOpcaoEscolhida("");
  };

  return (
    <>
      <li className="p-4 bg-dark-gray2 rounded-xl mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{nome}</h3>
          {descricao && (
            <p className="text-sm text-zinc-400 mt-1">{descricao}</p>
          )}
          <p className="text-primary font-bold mt-1">
            R$ {preco.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <button
          onClick={handleAdicionar}
          className="bg-primary p-3 rounded-lg text-black font-bold active:scale-95 transition"
        >
          <PlusIcon />
        </button>
      </li>

      {/* MODAL DE OPÇÕES */}
      <Modal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        title={`Escolher opção — ${nome}`}
        actions={
          <>
            <button
              onClick={() => setModalAberto(false)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white"
            >
              Cancelar
            </button>

            <button
              onClick={confirmarOpcao}
              disabled={!opcaoEscolhida}
              className={`px-4 py-2 rounded-lg font-bold ${
                opcaoEscolhida
                  ? "bg-primary text-white"
                  : "bg-zinc-600 text-zinc-400 cursor-not-allowed"
              }`}
            >
              Confirmar
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          {opcoes.map((op) => (
            <label
              key={op}
              className="flex items-center gap-2 text-white cursor-pointer"
            >
              <input
                type="radio"
                name="opcao"
                value={op}
                checked={opcaoEscolhida === op}
                onChange={() => setOpcaoEscolhida(op)}
              />
              {op}
            </label>
          ))}
        </div>
      </Modal>
    </>
  );
}
