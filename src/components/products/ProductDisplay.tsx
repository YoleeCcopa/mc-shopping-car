import type { Producto } from '../../types/Types';
import ProductItem from './ProductItem';

interface Props {
    data: Producto[];
}

const ProductDisplay = ({ data }: Props) => {
    return (
        <>
            {data.map((item) => (
                <ProductItem data={item}/>
            ))}
        </>
    )
}

export default ProductDisplay
