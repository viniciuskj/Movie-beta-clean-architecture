import Fastify, { FastifyInstance } from "fastify";
import cors from '@fastify/cors';
import movieRoutes from "@/presentation/routes/MovieRoutes";

export function buildApp(): FastifyInstance {
    const app = Fastify({
        logger: true
    });

    app.register(cors, {
        origin: true
    })

    app.register(movieRoutes, {prefix: '/api'});

    app.get('/health', async () => {
        return { status: 'ok', timestamp: new Date().toISOString() };
      });

    return app;
}