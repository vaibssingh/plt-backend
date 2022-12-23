import { Type } from '@sinclair/typebox';

// export const querySchema = {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     excitement: { type: 'integer' }
//   }
// }

export const responseSchema = {
  schema: {
    response: {
      200: {
        type: Type.Object({
          sku: Type.Integer()
        })
      }
    }
  }
}