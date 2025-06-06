import type { ItemCarrito } from '../../types/Types';
import { CART_ACTIONS, type CartActions } from '../../features/reducers/CartActionTypes';

interface Props {
    data: ItemCarrito;
    dispatch: React.Dispatch<CartActions>;
}

const CartItem = ({ data, dispatch }: Props) => {

    const handleIncreaseQuantity = (id: string) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { 
                itemId: id,
                quantity: data.cantidad + 1 
            },
        });
    };

    const handleDecreaseQuantity = (id: string) => {
        if (data.cantidad > 1) {
            dispatch({
                type: CART_ACTIONS.UPDATE_QUANTITY,
                payload: { itemId: id, quantity: data.cantidad - 1 },
            });
        } else {
            dispatch({
                type: CART_ACTIONS.REMOVE_ITEM,
                payload: id,
            });
        }
    };

    const handleRemoveItem = (id: string) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: id,
        });
    };

  return (
        <>
            <span>{data.producto.nombre} | </span>
            <span>{data.producto.precio} | </span>
            <span>{data.cantidad} | </span>
            <span>{data.cantidad * data.producto.precio} | </span>
            <button onClick={() => handleIncreaseQuantity(data.producto.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(data.producto.id)}>-</button>
            <button onClick={() => handleRemoveItem(data.producto.id)}>Delete</button>
        </>
  )
}

export default CartItem
