import { ProductProps } from "./ProductProps";

export interface OrderProductProps {
    Product: ProductProps,
    id: string,
    orderId: string,
    productId: string,
    quantity: number,
}