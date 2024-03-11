import { ProductProps } from "./ProductProps";

export interface SelectProductProps{
    product: string;
    products: ProductProps[];
    setProduct: (e: string) => void;
    placeholder: string;   
}