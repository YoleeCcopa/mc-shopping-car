import ProductData from '../../assets/products.json';

import type { Producto } from './../../types/Types';

export const getDefaultProducts = (): Producto[] => {
    return ProductData.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion,
        imagen: item.imagen
    }));
};
