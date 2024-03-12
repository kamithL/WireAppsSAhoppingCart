// src/types/productTypes.ts

export interface Product {
    id: string;
    SKU: string;
    name: string;
    // Add other properties as needed
}

export interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}
