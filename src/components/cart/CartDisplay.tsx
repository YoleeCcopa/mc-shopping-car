import { CART_ACTIONS, type CartActions } from "../../features/reducers/CartActionTypes";
import type { ItemCarrito } from "../../types/Types"
import CartItem from "./CartItem";
import AnimatedButton from '../buttons/animatedButton/AnimatedButton';
import styles from './CartDisplay.module.css'

interface Probs {
    data: ItemCarrito[];
    dispatch: React.Dispatch<CartActions>;
}

const CartDisplay = ({ data, dispatch }: Probs) => {
    const handleClearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    return (
        <div className={styles.displayer}>
            {data.length === 0 ? (
                <div className={styles.alert}>
                    <p>None found!</p>
                </div>
            ) : (
            <>
                {data.map((item) => (
                    <div key={item.producto.id} className={styles.card}>
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
                <AnimatedButton backgroundEffect='slide' label='Clear cart' handleClick={handleClearCart}/>
            </>
            )}
        </div>
    )
}

export default CartDisplay
