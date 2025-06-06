import { CART_ACTIONS, type CartActions } from "../../features/reducers/CartActionTypes";
import type { ItemCarrito } from "../../types/Types"
import CartItem from "./CartItem";

interface Probs {
    data: ItemCarrito[];
    dispatch: React.Dispatch<CartActions>;
}

const CartDisplay = ({ data, dispatch }: Probs) => {
    const handleClearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    return (
        <div>
            {data.map((item) => (
                <div key={item.producto.id}>
                    <CartItem data={item} dispatch={dispatch}/>
                </div>
            ))}
            <div>
                <span>Total Price: </span>
                <strong>
                    {
                        data.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
                    }
                </strong>
            </div>
            <button onClick={() => handleClearCart()}>Clear cart</button>
        </div>
    )
}

export default CartDisplay
