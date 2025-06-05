import { useState, useEffect } from 'react'
import './App.css'

import ProductData from './assets/products.json';

import type { Producto } from './models/Models';
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
            const mappedCart: Producto[] = ProductData
            .map(item => ({
                id: item.id,
                nombre: item.nombre,
                precio: item.precio,
                descripcion: item.descripcion,
                imagen: item.imagen
            }));
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
