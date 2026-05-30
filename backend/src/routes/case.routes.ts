import type { FastifyInstance } from "fastify";

/**
 * Encapsulates the case routes
 * @param {FastifyInstance} app  Encapsulated Fastify Instance
 */
export async function caseRoutes(app: FastifyInstance) {
  app.get("/cases", async () => {
    return { cases: [] };
  });
}
