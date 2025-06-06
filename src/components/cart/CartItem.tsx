import type { Producto } from '../../types/Types';

interface Props {
    data: Producto;
    deleteFromCart: (id: string) => void;
}

const CartItem = ({ data, deleteFromCart }: Props) => {
  return (
        <div>
            <img src={data.imagen} alt="Logo" width={100}/>
            <span>{data.nombre}</span>
            <button onClick={() => deleteFromCart(data.id)}>Add</button>
        </div>
  )
}

export default CartItem
