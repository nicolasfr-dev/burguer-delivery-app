import Paths from './routes/Paths'
import './index.css'
import { CarrinhoProvider } from './contexts/CarrinhoContext';

const App = () => {
  return (
    <>
      <CarrinhoProvider>
          <Paths /> 
      </CarrinhoProvider>
    </>
    )
}
 
export default App;