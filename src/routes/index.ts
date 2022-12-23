import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { calculateStock } from './route.js';

type skuRequest = FastifyRequest<{
  Querystring: { sku: string }
}>


const routes: FastifyPluginAsync = async (server) => {
  server.get('/', async function (request: skuRequest, reply: FastifyReply) {
    const sku: string = request.query.sku
    if (!sku) {
      reply.send({ success: false, error: "no sku passed in query" })
    }
    try {
      const resp = await calculateStock(sku);
      reply.send({ success: true, data: resp });

    } catch (e: any) {
      // add logging here
      reply.send({ sucess: false, error: e.message })
    }
  })
}

export default routes;
