import type { ItemCarrito } from '../../types/Types';
import { CART_ACTIONS, type CartActions } from '../../features/reducers/CartActionTypes';
import AnimatedButton from '../buttons/animatedButton/AnimatedButton';
import styles from './CartItem.module.css'

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
        <div className={styles.card}>
            <div className={styles.card_data}>
                <div className={styles.img_container}>
                    <img className={styles.card_img} src={data.producto.imagen} alt="Logo"/>
                </div>
                <div className={styles.data_details}>
                    <span className={styles.name}>{data.producto.nombre}</span>
                    <span className={styles.price}>Price per unit: {data.producto.precio}</span>
                    <span className={styles.cant}>Cantidad: {data.cantidad}</span>
                    <span  className={styles.total_price}>Precion neto:  {data.cantidad * data.producto.precio}</span>
                </div>
            </div>
            <div className={styles.card_actions}>
                <AnimatedButton backgroundEffect='circle' label={null} iconClass='uil__plus' data={data.producto.id} handleClick={handleIncreaseQuantity}/>
                <AnimatedButton backgroundEffect='circle' label={null} iconClass='uil__minus' data={data.producto.id} handleClick={handleDecreaseQuantity}/>
                <AnimatedButton backgroundEffect='slide' label='Delete' data={data.producto.id} handleClick={handleRemoveItem}/>
            </div>
        </div>
    )
}

export default CartItem
