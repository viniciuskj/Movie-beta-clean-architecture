// src/presentation/middlewares/validationMiddleware.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema } from 'zod';

/**
 * Função que cria um middleware de validação para o corpo da requisição
 * @param schema O schema Zod a ser usado para validação
 * @returns Uma função middleware para uso no Fastify
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Tenta validar o corpo da requisição usando o schema fornecido
      const validatedData = schema.parse(request.body);
      
      // Substitui o corpo original pelo dados validados
      // Isso garante que os dados estão no formato correto e permite
      // que valores padrão sejam aplicados
      request.body = validatedData;
    } catch (error) {
      // Se a validação falhar, retorna erro 400 (Bad Request)
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation error',
        details: (error as { errors?: Array<{ message: string }> }).errors || [{ message: 'Invalid input data' }]
      });
    }
  };
}

/**
 * Função que cria um middleware de validação para parâmetros de URL
 * @param schema O schema Zod a ser usado para validação
 * @returns Uma função middleware para uso no Fastify
 */
export function validateParams<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Tenta validar os parâmetros usando o schema fornecido
      const validatedParams = schema.parse(request.params);
      
      // Substitui os parâmetros originais pelos validados
      request.params = validatedParams;
    } catch (error) {
      // Se a validação falhar, retorna erro 400 (Bad Request)
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid route parameters',
        details: (error as { errors?: Array<{ message: string }> }).errors || [{ message: 'Invalid parameters' }]
      });
    }
  };
}

/**
 * Função que cria um middleware de validação para parâmetros de consulta (query)
 * @param schema O schema Zod a ser usado para validação
 * @returns Uma função middleware para uso no Fastify
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Tenta validar os parâmetros de consulta usando o schema fornecido
      const validatedQuery = schema.parse(request.query);
      
      // Substitui os parâmetros de consulta originais pelos validados
      request.query = validatedQuery;
    } catch (error) {
      // Se a validação falhar, retorna erro 400 (Bad Request)
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Invalid query parameters',
        details: (error as { errors?: Array<{ message: string }> }).errors || [{ message: 'Invalid query parameters' }]
      });
    }
  };
}