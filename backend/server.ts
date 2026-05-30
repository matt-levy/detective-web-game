import Fastify, { fastify } from "fastify";
import { healthRoutes } from "./src/routes/health.routes";
import { caseRoutes } from "./src/routes/cases.routes";

const app = Fastify({
  logger: true,
});

app.register(healthRoutes);
app.register(caseRoutes);

try {
  await app.listen({ port: 3000, host: "0.0.0.0" });
  console.log("Backend running at http://localhost:3000");
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
