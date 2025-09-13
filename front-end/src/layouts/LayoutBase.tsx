import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const LayoutBase = () => {
    return ( 
        <>  
        <main className="bg-dark-gray min-h-screen w-full py-3">
            <Outlet />
            <NavBar />
        </main>
        </>
     );
}
 
export default LayoutBase;