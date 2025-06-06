import { CART_ACTIONS, type CartActions } from '../../features/reducers/CartActionTypes';
import type { Producto } from '../../types/Types';
import CircleAnimationButton from '../buttons/circleAnimationButton/CircleAnimationButton';

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
            <CircleAnimationButton label='Add' data={data} onClick={handleAddToCart}/>
        </>
    )
}

export default ProductItem
