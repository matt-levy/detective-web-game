import type { FastifyInstance } from "fastify";
import caseData from "../../test-data/case-data.json";

/**
 * Encapsulates the case routes
 * @param {FastifyInstance} app  Encapsulated Fastify Instance
 */
export async function caseRoutes(app: FastifyInstance) {
  app.get("/cases", async () => {
    return {
      cases: caseData.cases.map(
        (item: { id: string; title: string; subtitle: string }) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
        }),
      ),
    };
  });

  app.get("/cases/:caseId", async (req) => {
    const { caseId } = req.params as { caseId: string };
    const caseItem = caseData.cases.find((item) => item.id === caseId);
    return { case: caseItem };
  });
}
