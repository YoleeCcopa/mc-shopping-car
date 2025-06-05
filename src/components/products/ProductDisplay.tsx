import type { Producto } from './../../models/Models';
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
