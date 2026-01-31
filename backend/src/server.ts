import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import { IncomingMessage, ServerResponse } from "http";

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: true,
});

server.register(routes);

// For Vercel serverless - export the handler
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  await server.ready();
  server.server.emit("request", req, res);
}
