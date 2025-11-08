interface PedidoItemProps {
    numero: number;
    conteudo: string;
    data: string;
    hora: string;
    status: string;
    preco: number;

}

const PedidoItem = (props: PedidoItemProps) => {
    return ( 
        <li className="mb-4">
            <div className="flex items-center pb-4 border-b-1 border-dark-gray3">
                <div className="w-full">
                    <h3 className="text-2xl font-bold text-primary mb-2">Pedido #{props.numero}</h3>
                    <p className="text-lg text-gray-500">{props.conteudo}</p>
                    <p className="text-lg text-gray-500">{props.data} às {props.hora}</p>
                    <p className="text-lg text-gray-500">Status: {props.status}</p>
                    <p className="text-xl text-light-gray mt-2 font-bold">Total: R$ {props.preco.toFixed(2).replace('.', ',')}</p>
                    <button className="w-full py-2 mt-5 font-bold bg-primary text-dark-gray2 rounded active:bg-accent">Repetir pedido</button>
                </div>
            </div>
        </li>
    );
}

export default PedidoItem;
