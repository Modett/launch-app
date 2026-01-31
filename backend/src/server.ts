import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: true,
});

server.register(routes);

export default server;
