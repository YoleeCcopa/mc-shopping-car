import { useState, useEffect, useReducer } from 'react'
import './App.css'

import { getDefaultProducts } from './features/products/ProductRequest';
import type { Producto } from './types/Types';
import { CART_ACTIONS, cartReducer, type CartState } from './features/reducers/CartAcctions';

import ProductDisplay from './components/products/ProductDisplay';
import SearchBar from './components/form/searchBar/SearchBar';

function App() {
    const initialState: CartState = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const [productState, setProductState] = useState<Producto[]>([]);
    const [allProducts, setAllProducts] = useState<Producto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

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
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setProductState(parsedProducts); // Set initial state of displayed products
            setAllProducts(parsedProducts); // Set the full list of products
        } else {
            const mappedProducts = getDefaultProducts(); // Assume you have a function to get default products
            updateProducts(mappedProducts); // Assume this updates localStorage or similar
            setAllProducts(mappedProducts); // Set the full list of products
            setProductState(mappedProducts); // Display all products initially
        }
    }, []); 

    // Save the cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]); // The effect runs every time the cart changes

    // Function to handle search input change from SearchBar
    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm); // Update the search term

        if (searchTerm === '') {
            // If the search term is empty, reset the products list to the full list
            setProductState(allProducts);
        } else {
            // Filter the products based on the search term
            const filteredProducts = allProducts.filter((product) =>
                product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search
            );
            setProductState(filteredProducts); // Update the displayed product list with filtered products
        }
    };

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
            <br/>
            <SearchBar key='search_product' onSearchChange={handleSearchChange}/>
            <div>
                <ProductDisplay data={productState} addToCart={handleAddToCart}/>
            </div>
            <h2>Shopping cart</h2>
            <div>
                {
                    cart.map((item) => (
                        <div key={item.producto.id}>
                            <span>{item.producto.nombre} | </span>
                            <span>{item.producto.precio} | </span>
                            <span>{item.cantidad} | </span>
                            <span>{item.cantidad * item.producto.precio} | </span>
                            <button onClick={() => {handleIncreaseQuantity(item.producto.id)}}>+</button>
                            <button onClick={() => {handleDecreaseQuantity(item.producto.id)}}>-</button>
                            <button onClick={() => {handleRemoveItem(item.producto.id)}}>Delete</button>
                            <hr />
                        </div>
                    ))
                }
                <div>
                    <span>Total Price: </span>
                    <strong>
                        {
                            cart.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0)
                        }
                    </strong>
                </div>
                <button onClick={() => handleClearCart()}>Clear cart</button>
            </div>
        </>
    )
}

export default App
