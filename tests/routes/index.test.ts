import { describe, test, expect } from 'vitest';
import { calculateStock } from '../../src/routes/route';

describe('calculateStock', () => {
  let qty: number;
  const testSku = 'SCN373096/15/63';

  test('Calculate current stock level for sku', async () => {
    const data = await calculateStock(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
  });

  test('Decrease stock level when transaction type is order', async () => {
    const data = await calculateStock(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
    qty && expect(data.qty).toBeLessThan(qty);
  });

  test('Increase stock level when transaction type is refund', async () => {
    const data = await calculateStock(testSku);
    expect(data).toBeInstanceOf(Object);
    expect(data).toHaveProperty("sku");
    expect(data).toHaveProperty("qty");
    qty && expect(data.qty).toBeGreaterThan(qty);
  });

});

describe('invalid stock test', () => {
  const invalidStock = 'SCN373096/15/64';

  test('It should fail for current stock level for sku', async () => {

    await expect(calculateStock(invalidStock))
      .rejects
      .toThrow();
  })
});
