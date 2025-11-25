import { useOutletContext } from "react-router-dom";
import CardapioList from "../components/Cardapio/CardapioList";

const MainPage = () => {
  const { search } = useOutletContext<{ search: string }>();

  return (
    <>
    <CardapioList search={search} />
    </>
  ) 
  ;
};

export default MainPage;
