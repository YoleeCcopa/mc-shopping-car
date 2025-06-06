export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen?: string;
}

export interface ItemCarrito {
    producto: Producto;
    cantidad: number;
}