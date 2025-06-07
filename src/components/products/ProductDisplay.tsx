import type { CartActions } from '../../features/reducers/CartActionTypes';
import type { Producto } from '../../types/Types';
import ProductItem from './ProductItem';
import styles from './ProductDisplay.module.css';

interface Props {
    data: Producto[];
    dispatch: React.Dispatch<CartActions>;
}

const ProductDisplay = ({ data, dispatch }: Props) => {
    return (
        <div className={styles.displayer}>
            {data.length === 0 ? (
                <div className={styles.alert}>
                    <p>None found!</p>
                </div>
            ) : (
            data.map((item) => (
                <div key={item.id} className={styles.card}>
                    <ProductItem data={item} dispatch={dispatch}/>
                </div>
            ))
            )}
        </div>
    )
}

export default ProductDisplay
