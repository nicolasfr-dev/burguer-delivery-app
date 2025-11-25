import { useState } from "react";
import CarrinhoItem from "../components/Carrinho/CarrinhoItem";
import { useCarrinho } from "../contexts/CarrinhoContext";
import Modal from "../components/UI/Modal";

const moeda = (v: number) => v.toFixed(2).replace(".", ",");

const CarrinhoPage = () => {
  const { carrinho } = useCarrinho();

  const total = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [observacao, setObservacao] = useState("");

  const finalizarPedido = () => {
    // formato para compatibilizar com Pedidos Recentes
    const novoPedido = {
      numero: Date.now(), // número único
      itens: carrinho.map((i) => ({
        id: i.id,
        nome: i.nome,
        preco: i.preco,
        quantidade: i.quantidade,
        opcao: i.opcao,
      })),
      total,
      dataISO: new Date().toISOString(),
    };

    // salvar no localStorage
    const historicoExistente = JSON.parse(localStorage.getItem("pedidos") || "[]");

    historicoExistente.push(novoPedido);

    localStorage.setItem("pedidos", JSON.stringify(historicoExistente));

    // montar mensagem de envio
    const itensTexto = carrinho
      .map(
        (item) =>
          `• ${item.nome} (${item.quantidade}x${
            item.opcao ? ` - ${item.opcao}` : ""
          }) — R$ ${moeda(item.preco * item.quantidade)}`
      )
      .join("\n");

    const msg = encodeURIComponent(
      `*Olá, eu gostaria de fazer o seguinte pedido:*\n\n${itensTexto}\n\n` +
        `*Total:* R$ ${moeda(total)}\n` +
        `*Entrega:* ${endereco}\n` +
        `*Observações:* ${observacao || "Nenhuma"}`
    );

    const whatsappURL = `https://wa.me/5500000000000?text=${msg}`;
    window.open(whatsappURL, "_blank");

    // limpar carrinho 

    setModalOpen(false);
  };

  return (
    <section className="max-w-2xl mx-auto mt-6">
      <h1 className="text-3xl font-black mb-6 text-primary">Carrinho</h1>

      {carrinho.length === 0 ? (
        <p className="text-gray-400 text-center">Seu carrinho está vazio!</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {carrinho.map((item) => (
              <CarrinhoItem key={`${item.id}-${item.opcao ?? ""}`} {...item} />
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl text-white font-bold">Total:</h2>
            <span className="text-2xl font-extrabold text-primary">
              R$ {moeda(total)}
            </span>
          </div>

          <button
            className="w-full bg-primary text-white py-3 mt-6 rounded-lg font-bold transition-colors active:bg-accent"
            onClick={() => setModalOpen(true)}
          >
            Finalizar Pedido
          </button>
        </>
      )}

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Finalizar Pedido"
        actions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-zinc-700 text-white"
            >
              Cancelar
            </button>

            <button
              onClick={finalizarPedido}
              className="px-4 py-2 rounded-lg bg-primary text-white font-bold"
            >
              Enviar Pedido
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-zinc-200">Endereço de Entrega</label>
            <input
              type="text"
              className="w-full p-2 mt-1 rounded bg-zinc-800 text-white"
              placeholder="Rua, número, bairro..."
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-zinc-200">
              Observações (opcional)
            </label>
            <textarea
              className="w-full p-2 mt-1 rounded bg-zinc-800 text-white"
              placeholder="Alguma observação?"
              rows={3}
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default CarrinhoPage;
