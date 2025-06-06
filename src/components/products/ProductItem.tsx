import { CART_ACTIONS, type CartActions } from '../../features/reducers/CartActionTypes';
import type { Producto } from '../../types/Types';
import AnimatedButton from '../buttons/animatedButton/AnimatedButton';

interface Props {
    data: Producto;
    dispatch: React.Dispatch<CartActions>;
}

const ProductItem = ({ data, dispatch }: Props) => {
    const handleAddToCart = (product: Producto) => {
        dispatch({ 
            type: CART_ACTIONS.ADD_ITEM, 
            payload: product 
        });
    }

    return (
        <>
            <img src={data.imagen} alt="Logo" width={100}/>
            <span>{data.nombre}</span>
            <AnimatedButton backgroundEffect='slide' label='Add' data={data} handleClick={handleAddToCart}/>
        </>
    )
}

export default ProductItem
