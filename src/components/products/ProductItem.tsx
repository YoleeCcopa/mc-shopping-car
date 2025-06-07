import { CART_ACTIONS, type CartActions } from '../../features/reducers/CartActionTypes';
import type { Producto } from '../../types/Types';
import AnimatedButton from '../buttons/animatedButton/AnimatedButton';
import styles from './ProductItem.module.css'

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
        <div className={styles.card}>
            <div className={styles.img_container}>
                <img className={styles.card_img} src={data.imagen} alt="Logo"/>
            </div>
            <p className={styles.name}>{data.nombre}</p>
            <p className={styles.price}>{data.precio}</p>
            <p className={styles.desc}>{data.descripcion}</p>
            <AnimatedButton backgroundEffect='slide' label='Add' data={data} handleClick={handleAddToCart}/>
        </div>
    )
}

export default ProductItem
