import { useEffect, useState } from "react";
import PedidoItem from "./PedidoItem";

interface Pedido {
  numero: number;
  itens: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    opcao?: string;
  }[];
  total: number;
  dataISO: string;
}

const PedidosList = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem("pedidos");
    if (dados) {
      setPedidos(JSON.parse(dados));
    }
  }, []);

  if (pedidos.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-400">Nenhum pedido recente.</p>
      </div>
    );
  }

  return (
    <ul className="p-4">
      {pedidos.map((pedido) => {
        const data = new Date(pedido.dataISO);

        const dataFormatada = data.toLocaleDateString("pt-BR");
        const horaFormatada = data.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const conteudo = pedido.itens
          .map(
            (i) =>
              `${i.quantidade}× ${i.nome}${i.opcao ? ` (${i.opcao})` : ""}`
          )
          .join(", ");

        return (
          <PedidoItem
            key={pedido.numero}
            numero={pedido.numero}
            conteudo={conteudo}
            data={dataFormatada}
            hora={horaFormatada}
            preco={pedido.total}
            itens={pedido.itens}
          />
        );
      })}
    </ul>
  );
};

export default PedidosList;
