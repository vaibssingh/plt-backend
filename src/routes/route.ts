import { ETransactionType } from '../enums/transactions.enum.js';
import { getStock } from "../dataLoader/stocks.js";
import { getTransaction } from "../dataLoader/transaction.js";

export async function calculateStock(sku: string): Promise<{ sku: string, qty: number }> {

  const promises = await Promise.all([getStock(sku), getTransaction(sku)]);

  const stocks = promises[0];
  const transactions = promises[1];

  if (stocks.length === 0 && transactions.length === 0) {
    throw new Error('no sku present');
  }
  if (stocks.length === 0) {
    return { sku, qty: 0 }
  }

  // calculate total stock for product
  let totalStock = stocks.reduce((partialSum, a) => partialSum + a.stock, 0)

  transactions.forEach(a => {
    if (a.type === ETransactionType.ORDER) {
      totalStock = totalStock - a.qty;
    }
    if (a.type === ETransactionType.REFUND) {
      totalStock = totalStock + a.qty;
    }
  })

  return { sku, qty: totalStock }
}