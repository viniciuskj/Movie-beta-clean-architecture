import { Movie, MovieCreateData, MovieUpdateData } from "@/domain/entities/Movie";
import { Param } from "@prisma/client/runtime/library";


export interface MovieResponseDTO {
    id: string;
    title: string;
    releaseDate: string;
    synopsis: string;
    createdAt: string;
    updatedAt:string;
}

export interface MovieCreateDTO {
    title: string;
    releaseDate: string;
    synopsis: string;
}

export interface MovieUpdateDTO {
    title?: string;
    releaseDate?: string;
    synopsis?: string;
}

export interface PaginatedMoviesResponseDTO {
    data: MovieResponseDTO[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
}

/**
 * Mapeia uma entidade Movie para MovieResponseDTO
 * @param movie - A entidade Movie a ser mapeada
 * @returns MovieResponseDTO - O DTO mapeado
 */
export function mapMovieToDTO(movie: Movie): MovieResponseDTO {
    return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.releaseDate.toISOString(),
        synopsis: movie.synopsis, 
        createdAt: movie.createdAt.toISOString(),
        updatedAt: movie.updatedAt.toISOString(),
    }
}

/**
 * Mapeia um MovieCreateDTO para MovieCreateData
 * @param dto - O DTO a ser mapeado
 * @returns MovieCreateData - Os dados mapeados para criação do filme
 */
export function mapCreateDTOModel(dto: MovieCreateDTO): MovieCreateData {
    return {
        title: dto.title,
        releaseDate: new Date(dto.releaseDate),
        synopsis: dto.synopsis
    };
}

export function mapUpdateDTOToModel(dto: MovieUpdateDTO): MovieUpdateData {
    const result: MovieUpdateData = {};
  
    if (dto.title !== undefined) {
      result.title = dto.title;
    }
  
    if (dto.releaseDate !== undefined) {
      result.releaseDate = new Date(dto.releaseDate);
    }
  
    if (dto.synopsis !== undefined) {
      result.synopsis = dto.synopsis;
    }
  
    return result;
}
/**
 * Mapeia um array de entidades Movie para um array de MovieResponseDTO
 * @param movies Array de Movies do domínio
 * @returns Array de MovieResponseDTOs
 */
export function mapMoviesToDTOs(movies: Movie[]): MovieResponseDTO[] {
    return movies.map(movie => mapMovieToDTO(movie));
}

/**
 * Cria um DTO de resposta paginada
 * @param movies Array de Movies do domínio
 * @param page Página atual
 * @param limit Limite de itens por página
 * @param total Total de itens no banco de dados
 * @returns DTO de resposta paginada formatado
 */
export function createPaginatedResponse(
  movies: Movie[],
 page: number,
 limit: number,
 total: number
): PaginatedMoviesResponseDTO {
 return {
   data: mapMoviesToDTOs(movies),
   pagination: {
     page,
     limit,
     total,
     totalPages: Math.ceil(total / limit)
   }
 };
}