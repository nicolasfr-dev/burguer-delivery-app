import CarrinhoItem from "./CarrinhoItem";

const CarrinhoList = () => {
  return (
    <>
      <h2 className="text-5xl font-black text-primary mt-10 mb-4">
        Finalizar Pedido
      </h2>

      <div className="p-4 bg-dark-gray2 rounded-md max-w-md mb-30">
        <ul>
            <CarrinhoItem
              conteudo="Pizza de Calabresa"
              unidades={15}
              preco={39.9}
            />

            <CarrinhoItem
              conteudo="Coca-Cola 2L"
              unidades={2}
              preco={12.0}
            />
        </ul>
      </div>
    </>
  );
};

export default CarrinhoList;
