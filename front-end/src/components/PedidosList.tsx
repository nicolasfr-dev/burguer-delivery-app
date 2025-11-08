import PedidoItem from "./PedidoItem";

const PedidosList = () => {
  return (
    <>
      <h2 className="text-5xl font-black text-primary mt-10 mb-4">
        Ultimos Pedidos
      </h2>

      <div className="p-4 bg-dark-gray2 rounded-md max-w-md mb-30">
        <ul>
          <PedidoItem
            numero={101}
            conteudo="1x Pizza Calabresa, 1x Coca-Cola 2L"
            data="2023-10-05"
            hora="18:00"
            status="Entregue"
            preco={55.0}
          />

          <PedidoItem
            numero={102}
            conteudo="2x Hamburguer, 1x Batata Frita"
            data="2023-10-01"
            hora="12:30"
            status="Em Preparação"
            preco={45.0}
          />
        </ul>
      </div>
    </>
  );
};

export default PedidosList;
