import type { FastifyInstance } from "fastify";

/**
 * Encapsulates the health routes
 * @param {FastifyInstance} app  Encapsulated Fastify Instance
 */
export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return { ok: true };
  });
}
