import Fastify from "fastify";
import cors from "@fastify/cors";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
      },
    },
  },
});

server.register(cors, {
  origin: true, // Allow all origins for now (dev), restrict in prod
});

server.register(routes);

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
