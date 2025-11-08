import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const LayoutBase = () => {
    return ( 
        <>  
        <main className="bg-dark-gray min-h-screen w-full px-5 py-5">
            <Outlet />
            <NavBar />
        </main>
        </>
     );
}
 
export default LayoutBase;