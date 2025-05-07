import { z } from "zod";


export const idSchema = z.string().uuid('ID deve ser valido');

export const movieCreateSchema = z.object({
    title: z.string().min(1, 'Titulo é obrigatorio').max(255, 'Titulo deve ter no maximo 255 caracteres'),
    releaseDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'A data deve estar no formato valido yyyy-mm-dd'
    }),
    synopsis: z.string().min(10, 'A sinopse dever ter no minimo 10 caracteres').max(2000, 'A sinpose deve ter no maximo 2000 caracteres')
});

export const movieUpdateSchema = z.object({
    title: z.string().min(1, 'Titulo deve ser obrigatorio').max(255, 'Tiulo deve ter no maximo 255 caracteres'),
    releaseDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'A data deve estar no formato valido yyyy-mm-dd'
    }),
    synopsis: z.string().min(10, 'A sinopse deve tr no maximo 10 caracteres').max(2000, 'A sinopse deve ter no maximo 2000 caracteres')
    .optional()
}).refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualizaçao'
});

export const paginationQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    sortBy: z.enum(['title', 'releaseDate', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc') 
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
