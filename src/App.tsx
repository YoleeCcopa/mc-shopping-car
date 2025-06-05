import { useState, useEffect } from 'react'
import './App.css'

import { getDefaultProducts } from './features/products/ProductRequest';
import type { Producto } from './types/Types';

import ProductDisplay from './components/products/ProductDisplay';

function App() {
    const [cartState, setCartState] = useState<Producto[]>([]);
    
    /**
     * Support function to update task list in local storage.
     * @param updatedList Task list with current modifications.
     */
    const updateCart = (updatedList: Producto[]) => {
        setCartState(updatedList);
        localStorage.setItem('cart', JSON.stringify(updatedList));
    };

    /**
     * Load data from local storage, or JSON if local is empty.
     */
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartState(JSON.parse(storedCart));
        } else {
            // fallback to JSON data if localStorage is empty
            const mappedCart = getDefaultProducts();
            updateCart(mappedCart);
        }
            console.log(storedCart);
    }, []); 

    return (
        <>
            <h1>E-commerce</h1>
            <br/>
            <h2>Product in stock</h2>
            <div>
                <ProductDisplay data={cartState}/>
            </div>
            <h2>Shopping cart</h2>
            <div>
                <button>Total price</button>
                <button>Clear cart</button>
            </div>
        </>
    )
}

export default App
