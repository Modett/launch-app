import { FastifyInstance } from "fastify";
import supabase from "./db";

interface WaitlistBody {
  email: string;
}

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    return { ok: true, service: "modett-backend" };
  });

  fastify.post<{ Body: WaitlistBody }>("/waitlist", async (request, reply) => {
          const { email } = request.body;

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        reply.code(400).send({ error: "Invalid email address" });
        return;
      }

      try {
        const now = new Date();
        const localTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5:30 hours

        const { data, error } = await supabase
          .from('Waitlist')
          .insert([
            {
              email,
              createdAt: localTime.toISOString(),
              source: 'landing_page',
            }
          ])
          .select();

        if (error) {
          // Check for unique constraint violation
          if (error.code === '23505') {
            reply.code(409).send({ error: "Email already in waitlist" });
          } else {
            fastify.log.error(error);
            reply.code(500).send({ error: "Internal server error" });
          }
        } else {
          reply.send({ success: true, message: "Joined waitlist successfully" });
        }
      } catch (err: any) {
        fastify.log.error(err);
        reply.code(500).send({ error: "Internal server error" });
      }
  });
}
