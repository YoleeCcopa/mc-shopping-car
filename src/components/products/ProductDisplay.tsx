import type { Producto } from '../../types/Types';
import ProductItem from './ProductItem';

interface Props {
    data: Producto[];
    addToCart: (product: Producto) => void;
}

const ProductDisplay = ({ data, addToCart }: Props) => {
    return (
        <>
            {data.map((item) => (
                <ProductItem data={item} addToCart={addToCart}/>
            ))}
        </>
    )
}

export default ProductDisplay
