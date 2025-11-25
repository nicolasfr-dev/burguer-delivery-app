import { products } from "../../data/products";
import CardapioItem from "./CardapioItem";

interface Props {
  search: string;
}

const CardapioList = ({ search }: Props) => {
  const termo = search.toLowerCase();

  const filtrados = products.filter((item) =>
    item.nome.toLowerCase().includes(termo)
  );

  const lanches = filtrados.filter((item) => item.categoria === "sanduiche");
  const bebidas = filtrados.filter((item) => item.categoria === "bebida");

  return (
    <div className="mt-4 space-y-8">
      <section>
        <h2 className="text-4xl font-bold text-primary mb-5"> Lanches</h2>

        {lanches.length > 0 ? (
          <ul>
            {lanches.map((item) => (
              <CardapioItem key={item.id} {...item} />
            ))}
          </ul>
        ) : (
          <p className="text-light-gray2">Nenhum lanche encontrado...</p>
        )}
      </section>

      <section>
        <h2 className="text-4xl font-bold text-primary mb-5">Bebidas</h2>

        {bebidas.length > 0 ? (
          <ul>
            {bebidas.map((item) => (
              <CardapioItem key={item.id} {...item} />
            ))}
          </ul>
        ) : (
          <p className="text-light-gray2">Nenhuma bebida encontrada...</p>
        )}
      </section>

      {/* Caso a busca não encontre nada em nenhuma seção */}
      {lanches.length === 0 && bebidas.length === 0 && (
        <p className="text-center text-light-gray2 mt-6">
          Nenhum item encontrado...
        </p>
      )}
    </div>
  );
};

export default CardapioList;
