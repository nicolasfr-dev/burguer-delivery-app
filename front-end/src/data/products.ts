export type Options = string;

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: "sanduiche" | "bebida";
  opcoes?: Options[];
}

export const products: Product[] = [
  {
    id: "moda-casa",
    nome: "Moda da Casa",
    descricao: "Carne, frango, presunto, bacon, ovo, queijo, calabresa, alface e tomate",
    preco: 15,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "bacon-burger",
    nome: "Bacon Burger",
    descricao: "Carne, queijo, bacon, alface e tomate",
    preco: 10,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "egg-burguer",
    nome: "Egg Burguer",
    descricao: "Carne, bacon, ovo, alface e tomate",
    preco: 9,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "eggxbacon",
    nome: "Eggxbacon",
    descricao: "Carne, bacon, ovo, alface e tomate",
    preco: 10,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "pre-hamburguer",
    nome: "Pre Hambúrguer",
    descricao: "Carne, presunto, alface e tomate",
    preco: 9,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "pre-x-burguer",
    nome: "Pre X-Burguer",
    descricao: "Carne, queijo, presunto, alface e tomate",
    preco: 9,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "pre-x-bacon",
    nome: "Pre X-Bacon",
    descricao: "Carne, presunto, bacon, ovo, queijo, alface e tomate",
    preco: 10,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "x-burgue",
    nome: "X Burgue",
    descricao: "Carne, queijo, presunto, alface e tomate",
    preco: 9,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "x-frango",
    nome: "X Frango",
    descricao: "Frango, queijo, alface e tomate",
    preco: 10,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "x-calabresa",
    nome: "X Calabresa",
    descricao: "Calabresa, queijo, alface e tomate",
    preco: 8,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "hamburguer",
    nome: "Hambúrguer",
    descricao: "Carne",
    preco: 6,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "misto-quente",
    nome: "Misto Quente",
    descricao: "Presunto, queijo, alface e tomate",
    preco: 8,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  {
    id: "americano",
    nome: "Americano",
    descricao: "Presunto, queijo, ovo, alface e tomate",
    preco: 9,
    categoria: "sanduiche",
    opcoes: ["Pão Árabe", "Pão Bola"],
  },
  // -------------------------
  // BEBIDAS
  // -------------------------
  {
    id: "refri-pitchula",
    nome: "Refrigerante 200ml",
    descricao: "Bebida gelada",
    preco: 8,
    categoria: "bebida",
    opcoes: ["Pepsi", "Guaraná Antártica", "Sukita Laranja"]
  },
  {
    id: "refri-lata",
    nome: "Refrigerante Lata",
    descricao: "Bebida gelada",
    preco: 5,
    categoria: "bebida",
    opcoes: ["Coca-Cola","Sukita Laranja","Sukita Uva"]
  },
];
