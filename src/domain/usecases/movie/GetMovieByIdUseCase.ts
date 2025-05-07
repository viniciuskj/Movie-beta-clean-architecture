import { TYPES } from "@/infra/container/types";
import { Movie } from "@/domain/entities/Movie";
import { NotFoundError } from "@/domain/errors/DomainError";
import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { inject, injectable } from "inversify";


@injectable()
export class GetMovieByIdUseCase {
    constructor(
        @inject(TYPES.MovieRepository) private movieRepository: MovieRepository
    ) {}

    async execute(id: string): Promise<Movie> {
        const movie = await this.movieRepository.findById(id)

        if(!movie) {
            throw new NotFoundError('movie', id);
        }

        return movie;
    }
}