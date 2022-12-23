// In a large project interfaces would be defined on basis of modules and exported via index files
import { ETransactionType } from "../enums/transactions.enum"

export interface ITransaction {
    sku: string,
    type: ETransactionType,
    qty: number
}

export interface IStock {
    sku: string,
    stock: number
}

export interface IQuery {
    sku: string
}