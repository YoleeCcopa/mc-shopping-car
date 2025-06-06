import { useState, useEffect, useReducer } from 'react'
import './App.css'

import { getDefaultProducts } from './features/products/ProductRequest';
import type { Producto } from './types/Types';
import { CartReducer, type CartState } from './features/reducers/CartActions';

import ProductDisplay from './components/products/ProductDisplay';
import SearchBar from './components/form/searchBar/SearchBar';
import CartDisplay from './components/cart/CartDisplay';

function App() {
    /**
     * Setup the cart initial state in local storage.
     */
    const initialState: CartState = JSON.parse(localStorage.getItem('cart') || '[]');
    
    /**
     * Setup the products list, even when filtered.
     */
    const [productState, setProductState] = useState<Producto[]>([]);
    /**
     * Setup all the products in the list.
     */
    const [allProducts, setAllProducts] = useState<Producto[]>([]);

    /**
     * Setup the cart state with useReducer.
     */
    const [cartStatus, dispatch] = useReducer(CartReducer, initialState);

    /**
     * Support function to update products list in local storage, hook productsState and hook allPorducts.
     * @param updatedList Producto list with current modifications.
     */
    const updateProducts = (updatedList: Producto[]) => {
        setProductState(updatedList);
        setAllProducts(updatedList);
        localStorage.setItem('products', JSON.stringify(updatedList));
    };

    /**
     * Load data from local storage, or JSON if local is empty.
     */
    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            updateProducts(JSON.parse(storedProducts));
        } else {
            updateProducts(getDefaultProducts());
        }
    }, []);

    /**
     * Save the cart to localStorage whenever it changes. Dependency on cartStatus. 
     */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartStatus));
    }, [cartStatus]);

    /**
     * Function to handle search input change from SearchBar
     * @param searchTerm String with the value to search in the list.
     */
    const handleSearchChange = (searchTerm: string) => {
        if (searchTerm === '') {
            // If the search term is empty, reset the products list to the full list
            setProductState(allProducts);
        } else {
            // Filter the products based on the search term
            const filteredProducts = allProducts.filter((product) =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProductState(filteredProducts); // Update the displayed product list with filtered products
        }
    };

    return (
        <>
            <h1>E-commerce</h1>
            <br/>
            <h2>Product in stock</h2>
            <br/>
            <SearchBar id='search_product' onSearchChange={handleSearchChange}/>
            <ProductDisplay data={productState} dispatch={dispatch}/>
            <h2>Shopping cart</h2>
            <CartDisplay data={cartStatus} dispatch={dispatch}/>
        </>
    )
}

export default App
