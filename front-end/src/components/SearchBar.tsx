import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const SearchBar = () => {

    return ( 
        <>
        <div className="fixed flex items-center justify-center p-4 backdrop-blur rounded-lg w-full top-0 z-10">
            <input type="text" placeholder="Buscar items..." className="rounded-3xl h-12 text-white px-3 bg-gray-950 placeholder:text-gray-800" />
            <button 
            className="bg-gray-950 text-white p-2 h-12 w-12 flex justify-center items-center rounded-full ml-2 active:text-yellow-400 active:bg-gray-900 transition-colors">
                <MagnifyingGlassIcon size={24} weight="bold" />
            </button>
        </div>
        </>
     );
}
 
export default SearchBar;