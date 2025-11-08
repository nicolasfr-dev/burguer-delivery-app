import CardapioItem from "./CardapioItem";

const CardapioList = () => {
  return (
    <>
      <h2 className="text-5xl font-black text-primary mt-10 mb-4">Lista de Burgers</h2>
      
      <div className="p-4 bg-dark-gray2 rounded-md max-w-md mb-30">
        <ul>
          <li>
            <CardapioItem
              nome="Moda da Casa"
              descricao="Carne, Presunto, Bacon, Ovo, Queijo, Alface, Tomate"
              preco={19.9}
              imagem="./burguer-placeholder.png"
            />
          </li>
          <li>
            <CardapioItem
              nome="Burger 2"
              descricao="Burger vegetariano com legumes grelhados"
              preco={22.5}
              imagem="./burguer-placeholder.png"
            />
          </li>
          <li>
            <CardapioItem
              nome="Burger 3"
              descricao="Burger com bacon e cheddar"
              preco={25.0}
              imagem="./burguer-placeholder.png"
            />
          </li>
          <li>
            <CardapioItem
              nome="Refrigerante"
              descricao="Bebida gelada"
              preco={7.0}
              imagem="./soda-placeholder.png"
            />
          </li>
          <li>
            <CardapioItem
              nome="Suco"
              descricao="Suco gelado"
              preco={5.0}
              imagem="./soda-placeholder.png"
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default CardapioList;
