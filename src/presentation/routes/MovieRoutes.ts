import { container } from "@/infra/container";
import { FastifyInstance } from "fastify";
import { MovieController } from "../controllers/MovieController";
import { TYPES } from "@/infra/container/types";
import { idSchema, movieCreateSchema, movieUpdateSchema, paginationQuerySchema } from "@/application/validators/schemas";
import { ZodObject, ZodDefault, ZodNumber, ZodEnum, ZodTypeAny, z } from "zod";
import { validateBody, validateParams, validateQuery } from "../middlewares/MiddlewareValidation";
import { zodToJsonSchema } from "zod-to-json-schema";


export default async function movieRoutes(fastify: FastifyInstance) {
    const movieController = container.get<MovieController>(TYPES.MovieController);


    const idParamSchema = {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid' }
        }
    };

    const createMovieJsonSchema = zodToJsonSchema(movieCreateSchema);
    const updateMovieJsonSchema = zodToJsonSchema(movieUpdateSchema);
    const paginationQueryJsonSchema = zodToJsonSchema(paginationQuerySchema);

    fastify.get('/movies', {
        schema: {
            querystring: paginationQueryJsonSchema,
            response: {
                200: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    releaseDate: { type: 'string', format: 'date-time' },
                                    synopsis: { type: 'string' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    updatedAt: { type: 'string', format: 'date-time' }
                                }
                            }
                        },
                        pagination: {
                            properties: {
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                total: { type: 'number' },
                                totalPages: { type: 'number' }
                            }
                        }
                    }
                }
            }
        },
        preValidation: validateQuery(paginationQuerySchema),
        handler: movieController.getAllMovies.bind(movieController)
    });
    
    fastify.get('/movies/:id', {
        schema: {
          params: idParamSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                releaseDate: { type: 'string', format: 'date-time' },
                synopsis: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            404: {
              type: 'object',
              properties: {
                error: { type: 'string' }
              }
            }
          }
        },
        preValidation: validateParams(z.object({ id: idSchema })),
        handler: movieController.geMovieById.bind(movieController)
      });
    
      fastify.post('/movies', {
        schema: {
          body: createMovieJsonSchema,
          response: {
            201: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                releaseDate: { type: 'string', format: 'date-time' },
                synopsis: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            400: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                details: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      path: { 
                        type: 'array',
                        items: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        preValidation: validateBody(movieCreateSchema),
        handler: movieController.createMovie.bind(movieController)
      });
    
      fastify.put('/movies/:id', {
        schema: {
          params: idParamSchema,
          body: updateMovieJsonSchema,
          response: {
            200: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                title: { type: 'string' },
                releaseDate: { type: 'string', format: 'date-time' },
                synopsis: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            },
            400: {
              type: 'object',
              properties: {
                error: { type: 'string' },
                details: {
                  type: 'array',
                  items: {
                    type: 'object'
                  }
                }
              }
            },
            404: {
              type: 'object',
              properties: {
                error: { type: 'string' }
              }
            }
          }
        },
        preValidation: [
          validateParams(z.object({ id: idSchema })),
          validateBody(movieUpdateSchema)
        ],
        handler: movieController.updateMovie.bind(movieController)
      });

      fastify.delete('/movies/:id', {
        schema: {
          params: idParamSchema,
          response: {
            204: {
              type: 'null'
            },
            404: {
              type: 'object',
              properties: {
                error: { type: 'string' }
              }
            }
          }
        },
        preValidation: validateParams(z.object({ id: idSchema })),
        handler: movieController.deleteMovie.bind(movieController)
    });
}


