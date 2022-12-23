import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { ITransaction } from "../interfaces/interface";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../data/transactions.json');

export async function getTransaction(sku: string): Promise<ITransaction[]> {

    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            const parsedData = JSON.parse(data);
            const filtered: ITransaction[] = []
            for (let i = 0; i < parsedData.length; i++) {
                if (parsedData[i].sku === sku) {
                    filtered.push({
                        sku: parsedData[i].sku,
                        type: parsedData[i].type,
                        qty: parsedData[i].qty
                    })
                }
            }

            resolve(filtered);
        })
    })
}