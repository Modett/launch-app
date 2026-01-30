import { FastifyInstance } from "fastify";
import prisma from "./db";
import { Prisma } from "@prisma/client";

interface WaitlistBody {
  email: string;
}

export default async function routes(fastify: FastifyInstance) {
  fastify.post<{ Body: WaitlistBody }>(
    "/api/waitlist",
    async (request, reply) => {
      const { email } = request.body;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        reply.code(400).send({ error: "Invalid email address" });
        return;
      }

      try {
        // Get current time in Asia/Colombo timezone (UTC+5:30)
        const now = new Date();
        const localTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5:30 hours

        await prisma.waitlist.create({
          data: {
            email,
            createdAt: localTime,
          },
        });
        reply.send({ success: true, message: "Joined waitlist successfully" });
      } catch (err: any) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          // Unique constraint violation
          reply.code(409).send({ error: "Email already in waitlist" });
        } else {
          fastify.log.error(err);
          reply.code(500).send({ error: "Internal server error" });
        }
      }
    },
  );
}
