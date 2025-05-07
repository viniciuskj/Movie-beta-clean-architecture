import { mapCreateDTOModel, mapMovieToDTO, mapUpdateDTOToModel, MovieCreateDTO, MovieUpdateDTO } from "@/application/dtos/MovieDTO";
import { NotFoundError, ValidationError } from "@/domain/errors/DomainError";
import { CreateMovieUseCase } from "@/domain/usecases/movie/CreateMovieUseCase";
import { GetAllMoviesUseCase } from "@/domain/usecases/movie/GetAllMoviesUseCase";
import { GetMovieByIdUseCase } from "@/domain/usecases/movie/GetMovieByIdUseCase";
import { UpdateMovieUseCase } from "@/domain/usecases/movie/UpdateMovieUseCase";
import { TYPES } from "@/infra/container/types";
import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "inversify";


@injectable()
export class MovieController {
    constructor(
        @inject(TYPES.GetAllMoviesUseCase) private getAllMoviesUseCase: GetAllMoviesUseCase,
        @inject(TYPES.GetMovieByIdUseCase) private getMovieByIdUseCase: GetMovieByIdUseCase,
        @inject(TYPES.CreateMovieUseCase) private createMovieUseCase: CreateMovieUseCase,
        @inject(TYPES.UpdateMovieUseCase) private updateMovieUseCase: UpdateMovieUseCase,
        @inject(TYPES.DeleteMovieUseCase) private deleteMoviedUseCase: GetMovieByIdUseCase,
    ) {}

    async getAllMovies(request: FastifyRequest, reply: FastifyReply) {
        try {
            const movies = await this.getAllMoviesUseCase.execute();
            console.log(movies)
            return reply.send(movies.map(mapMovieToDTO));
        } catch (error) {
            console.error('Error getAll controller', error);

            return reply.status(500).send({ error: 'Internal server error' });
        }
    }

    async geMovieById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;

            const movie = await this.getMovieByIdUseCase.execute(id);

            return reply.send(mapMovieToDTO(movie));
        } catch (error) {
            if(error instanceof NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            console.error('Error getById controller');

            return reply.status(500).send({ error: 'Internal server error' });
        }
    }

    async createMovie(request: FastifyRequest<{ Body: MovieCreateDTO }>, reply: FastifyReply) {
        try {
            const movieData = mapCreateDTOModel(request.body);

            const movie = await this.createMovieUseCase.execute(movieData);

            return reply.status(201).send(mapMovieToDTO(movie));
        } catch (error) {
            if(error instanceof ValidationError) {
                return reply.status(400).send({ eeror: error.message });
            }

            console.error('Error create controller');

            return reply.status(500).send({ error: 'Internal server error' });
        }
    }

    async updateMovie(request: FastifyRequest<{ Params: { id: string }, Body: MovieUpdateDTO }>, reply: FastifyReply) {
        try {
            const { id } = request.params;

            const movieData = mapUpdateDTOToModel(request.body);

            const movie = await this.updateMovieUseCase.execute(id, movieData);

            return reply.send(mapMovieToDTO(movie));
        } catch (error) {
            if(error instanceof ValidationError) {
                return reply.status(400).send({ error: error.message });
            }
            console.error('Error update controller')

            return reply.status(500).send({ error: 'Internal server error' });
        }
    }

    async deleteMovie(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;

            await this.deleteMoviedUseCase.execute(id);

            return reply.status(204).send();
        } catch (error) {
            if(error instanceof NotFoundError) {
                return reply.status(404).send({ error: error.message });
            }
            console.error('Error delete controller');

            return reply.status(500).send({ error: 'Internal server error' });
        }
    }
}

