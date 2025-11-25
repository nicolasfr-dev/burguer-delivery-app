import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CarrinhoItem {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  opcao?: string; // mantém o nome que você já usava
}

interface CarrinhoContextProps {
  carrinho: CarrinhoItem[];
  adicionarItem: (item: CarrinhoItem) => void;
  incrementar: (id: string, opcao?: string) => void;
  decrementar: (id: string, opcao?: string) => void;
  removerItem: (id: string, opcao?: string) => void;
}

const CarrinhoContext = createContext<CarrinhoContextProps | null>(null);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);

  const encontrarItem = (lista: CarrinhoItem[], id: string, opcao?: string) =>
    lista.find((i) => i.id === id && i.opcao === opcao);

  const adicionarItem = (novo: CarrinhoItem) => {
    setCarrinho((prev) => {
      const existente = encontrarItem(prev, novo.id, novo.opcao);

      if (existente) {
        // incrementa a quantidade do item com mesma id + mesma opção
        return prev.map((i) =>
          i.id === novo.id && i.opcao === novo.opcao
            ? { ...i, quantidade: i.quantidade + novo.quantidade }
            : i
        );
      }

      // adiciona novo item (não altera o id)
      return [...prev, novo];
    });
  };

  const incrementar = (id: string, opcao?: string) => {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === id && item.opcao === opcao
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  const decrementar = (id: string, opcao?: string) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === id && item.opcao === opcao && item.quantidade > 1
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const removerItem = (id: string, opcao?: string) => {
    setCarrinho((prev) =>
      prev.filter((item) => !(item.id === id && item.opcao === opcao))
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionarItem, incrementar, decrementar, removerItem }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro do CarrinhoProvider");
  return ctx;
};
