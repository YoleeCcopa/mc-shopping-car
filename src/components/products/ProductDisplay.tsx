import type { CartActions } from '../../features/reducers/CartActionTypes';
import type { Producto } from '../../types/Types';
import ProductItem from './ProductItem';

interface Props {
    data: Producto[];
    dispatch: React.Dispatch<CartActions>;
}

const ProductDisplay = ({ data, dispatch }: Props) => {
    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    <ProductItem data={item} dispatch={dispatch}/>
                </div>
            ))}
        </div>
    )
}

export default ProductDisplay
