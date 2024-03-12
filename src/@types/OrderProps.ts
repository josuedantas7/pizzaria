import { OrderProductProps } from "./OrderProductProps";

export interface OrderProps{
    OrderProduct: OrderProductProps[],
    id: string,
    tableId: string,
}