import { useCarrinho } from "../../contexts/CarrinhoContext";
import { useNavigate } from "react-router-dom";

interface PedidoItemProps {
  numero: number;
  conteudo: string;
  data: string;
  hora: string;
  preco: number;
  itens: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    opcao?: string;
  }[];
}

const PedidoItem = (props: PedidoItemProps) => {
  const { adicionarItem } = useCarrinho();
  const navigate = useNavigate();

  const repetirPedido = () => {
    props.itens.forEach((item) => {
      adicionarItem({
        id: item.id, 
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
        opcao: item.opcao,
      });
    });

    navigate("/carrinho");
  };

  return (
    <li className="mb-4 bg-dark-gray2 p-4 rounded-xl">
      <div className="flex items-center border-dark-gray3">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-white mb-2">
            Pedido #{props.numero}
          </h3>

          <ul className="mb-2 list-none text-gray-300">
            {props.itens.map((item, index) => (
              <li key={index} className="text-lg">
                - {item.quantidade} {item.nome}
                {item.opcao && (
                  <span className="text-gray-400"> ({item.opcao})</span>
                )}
              </li>
            ))}
          </ul>

          <p className="text-lg text-gray-500">
            {props.data} às {props.hora}
          </p>

          <p className="text-xl text-light-gray mt-2 font-bold">
            Total: R$ {props.preco.toFixed(2).replace(".", ",")}
          </p>

          <button
            onClick={repetirPedido}
            className="w-full py-2 mt-5 font-bold bg-primary text-dark-gray2 rounded active:bg-accent"
          >
            Repetir pedido
          </button>
        </div>
      </div>
    </li>
  );
};

export default PedidoItem;
