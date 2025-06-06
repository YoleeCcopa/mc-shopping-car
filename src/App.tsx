import { useState, useEffect, useReducer } from 'react'
import './App.css'

import { getDefaultProducts } from './features/products/ProductRequest';
import type { Producto } from './types/Types';
import { CART_ACTIONS, cartReducer, type CartState } from './features/reducers/CartAcctions';

import ProductDisplay from './components/products/ProductDisplay';

function App() {
    const initialState: CartState = JSON.parse(localStorage.getItem('cart') || '[]');
    const [productState, setProductState] = useState<Producto[]>([]);

    // Setup the cart state with useReducer
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    /**
     * Support function to update task list in local storage.
     * @param updatedList Task list with current modifications.
     */
    const updateProducts = (updatedList: Producto[]) => {
        setProductState(updatedList);
        localStorage.setItem('products', JSON.stringify(updatedList));
    };

    /**
     * Load data from local storage, or JSON if local is empty.
     */
    useEffect(() => {
        const storedCart = localStorage.getItem('products');
        if (storedCart) {
            setProductState(JSON.parse(storedCart));
        } else {
            // fallback to JSON data if localStorage is empty
            const mappedCart = getDefaultProducts();
            updateProducts(mappedCart);
        }
    }, []); 

    // Save the cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]); // The effect runs every time the cart changes

    const handleAddToCart = (product: Producto) => {
        dispatch({ 
            type: CART_ACTIONS.ADD_ITEM, 
            payload: product 
        });
    }

    const handleRemoveItem = (productId: string) => {
        dispatch({ 
            type: CART_ACTIONS.REMOVE_ITEM, 
            payload: productId 
        });
    };

    const handleIncreaseQuantity = (itemId: string) => {
        // Get the current item from the state (or use your state selector method)
        const item = cart.find(item => item.producto.id === itemId);

        if (item) {
            // Increase quantity by 1
            const newQuantity = item.cantidad + 1;
            dispatch({ 
                type: CART_ACTIONS.UPDATE_QUANTITY, 
                payload: { itemId, quantity: newQuantity } 
            });
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        // Get the current item from the state (or use your state selector method)
        const item = cart.find(item => item.producto.id === itemId);

        if (item && item.cantidad > 1) {
            // Decrease quantity by 1
            const newQuantity = item.cantidad - 1;
            dispatch({ 
                type: CART_ACTIONS.UPDATE_QUANTITY, 
                payload: { itemId, quantity: newQuantity } 
            });
        } else if (item && item.cantidad === 1) {
            // Remove item completely if quantity is 1
            dispatch({
                type: CART_ACTIONS.REMOVE_ITEM,
                payload: itemId,
            });
        }
    };

    const handleClearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    return (
        <>
            <h1>E-commerce</h1>
            <br/>
            <h2>Product in stock</h2>
            <div>
                <ProductDisplay data={productState} addToCart={handleAddToCart}/>
            </div>
            <h2>Shopping cart</h2>
            <div>
                {
                    cart.map((item) => (
                        <div key={item.producto.id}>
                            <span>{item.producto.nombre}</span>
                            <span>{item.producto.precio}</span>
                            <span>{item.cantidad}</span>
                            <button onClick={() => {handleIncreaseQuantity(item.producto.id)}}>+</button>
                            <button onClick={() => {handleDecreaseQuantity(item.producto.id)}}>-</button>
                            <button onClick={() => {handleRemoveItem(item.producto.id)}}>Delete</button>
                            <br />
                        </div>
                    ))
                }
                <button>Total price</button>
                <button onClick={() => handleClearCart()}>Clear cart</button>
            </div>
        </>
    )
}

export default App
