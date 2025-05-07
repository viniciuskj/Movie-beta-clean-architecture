import { TYPES } from "@/infra/container/types";
import { Movie, MovieCreateData } from "@/domain/entities/Movie";
import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { inject, injectable } from "inversify";

@injectable()
export class CreateMovieUseCase {
    constructor(
        @inject(TYPES.MovieRepository) private movieRepository: MovieRepository
    ) {}

    async execute(data: MovieCreateData): Promise<Movie> {
        return this.movieRepository.create(data);
    }
}
