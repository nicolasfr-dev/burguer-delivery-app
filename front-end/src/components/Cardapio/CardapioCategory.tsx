import type { Product } from "../../data/products";
import CardapioItem from "./CardapioItem";

interface Props {
  titulo: string;
  items: Product[];
}

const CardapioCategory = ({ titulo, items }: Props) => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-black text-primary mb-4">{titulo}</h2>

      <ul>
        {items.map((item) => (
          <CardapioItem
            key={item.id}
            id={item.id}
            nome={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            opcoes={item.opcoes}
          />
        ))}
      </ul>
    </section>
  );
};

export default CardapioCategory;
