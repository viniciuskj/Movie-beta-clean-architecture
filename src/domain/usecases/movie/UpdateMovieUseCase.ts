import { TYPES } from "@/infra/container/types";
import { Movie, MovieUpdateData } from "@/domain/entities/Movie";
import { NotFoundError } from "@/domain/errors/DomainError";
import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { inject, injectable } from "inversify";


@injectable()
export class UpdateMovieUseCase {
    constructor(
        @inject(TYPES.MovieRepository) private movieRepository: MovieRepository
    ) {}

    async execute(id: string, data: MovieUpdateData): Promise<Movie> {
        const updatedMovie = await this.movieRepository.update(id, data);

        if(!updatedMovie) {
            throw new NotFoundError('Movie', id);
        }

        return updatedMovie;
    }
}
