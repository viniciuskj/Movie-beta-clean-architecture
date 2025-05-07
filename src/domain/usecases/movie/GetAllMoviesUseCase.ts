import { inject, injectable } from "inversify";
import { MovieRepository } from "../../repositores/MovieRepository";
import { TYPES } from "../../../infra/container/types";
import { Movie } from "../../entities/Movie";

@injectable()
export class GetAllMoviesUseCase {
    constructor(
        @inject(TYPES.MovieRepository) private movieRepository: MovieRepository
    ) {}

    async execute(): Promise<Movie[]> {
        return this.movieRepository.findAll();
    }
}
