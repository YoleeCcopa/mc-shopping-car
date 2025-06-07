# Akabeko e-shop
Basic shop with a list of board games as products.
> Last edit June 06, 2025

## How to start
We are using `react 19.1.0`, to get all the necessary files, apply:

```cmd
npm install
```
After installing the necessary modules, run the following command to open the application.

```cmd
npm run dev
```

## Hooks implementation
In the application you can find `useState`, `useEffect` and `useReducer`. The following tables will show the uses of each.

### Hook `useState`
| Name  | Type | Function |
| :---: | :---: | :--- |
| `[searchTerm, setSearchTerm]` | `string` | Keep track of the content of the search bar input. Found in: component `SearchBar` |
| `[productState, setProductState]` | `Producto[]` | Keep track of the list of products, even when filtered. Found in: `App.tsx` |
| `[allProducts, setAllProducts]` | `Producto[]` | Keep track of the list of all products, much like a safe copy. Found in: `App.tsx` |

### Hook `useEffect`
| Dependencies  | Function |
| :---: | :--- |
| `none`  | Load list of products from local storage (JSON file if there is no data). Found in: `App.tsx` |
| `cartStatus` | Save cart content in local storage each time `cartStatus` changes (check reducer section). Found in: `App.tsx` |

### Hook `useReducer`
For the reducer `[cartStatus, dispatch] = useReducer(cartReducer, initialState)`. Fount in: `App.tsx` and `CartActions`.
| Function | Effect |
| :---: | :--- |
| `ADD_ITEM` | Add a `Producto` to cart or increase the quantity of the existing `Producto`. |
| `REMOVE_ITEM` | Remove a `Producto` from cart by id. |
| `UPDATE_QUANTITY` | Update the quantity of a `Producto` from cart by id. You can set the efect to apply to quantity. |
| `CLEAR_CART` | Clear the list of `Producto` of cart. |

## App features
- List of products:
  - Search product by name.
  - Add product to shopping cart.
- Shopping cart:
  - Delete selected product.
  - Add unit of the selected product.
  - Remove a unit of the selected product.
  - Obtain the total price of the products.