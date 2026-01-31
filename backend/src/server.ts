import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: true, // Allow all origins for now (dev), restrict in prod
});

server.register(routes);

// Export for Vercel (Vercel handles the listening automatically)
export default server;
