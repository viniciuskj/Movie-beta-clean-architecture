import { TYPES } from "@/infra/container/types";
import { NotFoundError } from "@/domain/errors/DomainError";
import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { inject, injectable } from "inversify";


@injectable()
export class DeleteMovieUseCase {
    constructor(
        @inject(TYPES.MovieRepository) private movieRepository: MovieRepository
    ) {}

    async execute(id: string): Promise<void> {
        const deletedMovie = await this.movieRepository.delete(id);

        if(!deletedMovie) {
            throw new NotFoundError('Movie', id);
        }
    }
}
