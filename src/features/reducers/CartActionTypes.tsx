import type { Producto } from "../../types/Types";

export const CART_ACTIONS = {
    ADD_ITEM: 'add-item',
    REMOVE_ITEM: 'remove-item',
    UPDATE_QUANTITY: 'update-quantity',
    CLEAR_CART: 'clear-cart'
} as const;

interface AddItemAction {
  type: typeof CART_ACTIONS.ADD_ITEM;
  payload: Producto; // Add a new product to the cart
}

interface RemoveItemAction {
  type: typeof CART_ACTIONS.REMOVE_ITEM;
  payload: string; // Remove an item by its ID
}

interface UpdateQuantityAction {
  type: typeof CART_ACTIONS.UPDATE_QUANTITY;
  payload: { itemId: string; quantity: number }; // Update the quantity of an item
}

interface ClearCartAction {
  type: typeof CART_ACTIONS.CLEAR_CART;
}

export type CartActions = AddItemAction | RemoveItemAction | UpdateQuantityAction | ClearCartAction;