import type { Producto } from '../../types/Types';

interface Props {
    data: Producto;
}

const ProductItem = ({ data }: Props) => {
    return (
        <div>
            <img src={data.imagen} alt="Logo" width={100}/>
            <span>{data.nombre}</span>
        </div>
    )
}

export default ProductItem
