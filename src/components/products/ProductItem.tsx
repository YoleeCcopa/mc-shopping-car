import type { Producto } from '../../types/Types';

interface Props {
    data: Producto;
    addToCart: (product: Producto) => void;
}

const ProductItem = ({ data, addToCart }: Props) => {
    return (
        <div>
            <img src={data.imagen} alt="Logo" width={100}/>
            <span>{data.nombre}</span>
            <button onClick={() => addToCart(data)}>Add</button>
        </div>
    )
}

export default ProductItem
