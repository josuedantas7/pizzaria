import { OrderProps } from "./OrderProps"

export interface TableProps{
    id: string
    idTable: number
    createdAt: string
    updatedAt: string
    Order?: OrderProps
}