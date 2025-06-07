import type { Producto, ItemCarrito } from "../../types/Types";
import { CART_ACTIONS, type CartActions } from "./CartActionTypes";

export type CartState = ItemCarrito[];

export const CartReducer = (state: CartState, action: CartActions): CartState => {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM:{
            const newProduct = action.payload as Producto;
            const existingItem = state.find(item => item.producto.id === newProduct.id);
      
            if (existingItem) {
                // Increase the quantity of the existing item
                return state.map(item =>
                item.producto.id === newProduct.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
                );
            } else {
                // Add new product to cart
                return [...state, { producto: newProduct, cantidad: 1 }];
            }
        }
        case CART_ACTIONS.REMOVE_ITEM:{
            const itemId = action.payload as string;
            // Remove item based on product ID
            return state.filter(item => item.producto.id !== itemId);
        }
        case CART_ACTIONS.UPDATE_QUANTITY:{
            const { itemId, quantity } = action.payload as { itemId: string; quantity: number };
            // Update quantity based on itemId
            return state.map(item =>
                item.producto.id === itemId
                ? { ...item, cantidad: quantity }
                : item
            );
        }
        case CART_ACTIONS.CLEAR_CART: {
            return [];
        }
        default:
            return state;
    }
}