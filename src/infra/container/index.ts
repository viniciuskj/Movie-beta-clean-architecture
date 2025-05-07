import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { CreateMovieUseCase } from "@/domain/usecases/movie/CreateMovieUseCase";
import { DeleteMovieUseCase } from "@/domain/usecases/movie/DeleteMovieUseCase";
import { GetAllMoviesUseCase } from "@/domain/usecases/movie/GetAllMoviesUseCase";
import { GetMovieByIdUseCase } from "@/domain/usecases/movie/GetMovieByIdUseCase";
import { UpdateMovieUseCase } from "@/domain/usecases/movie/UpdateMovieUseCase";
import { TYPES } from "./types";
import { Container } from "inversify";
import { MovieController } from "@/presentation/controllers/MovieController";
import { PrismaMovieRepository } from "../database/repositores/PrismaMovieRepository";

const container = new Container();

// Repositories
container.bind<MovieRepository>(TYPES.MovieRepository).to(PrismaMovieRepository).inSingletonScope();

// Use Cases
container.bind<GetAllMoviesUseCase>(TYPES.GetAllMoviesUseCase).to(GetAllMoviesUseCase);
container.bind<GetMovieByIdUseCase>(TYPES.GetMovieByIdUseCase).to(GetMovieByIdUseCase);
container.bind<CreateMovieUseCase>(TYPES.CreateMovieUseCase).to(CreateMovieUseCase);
container.bind<UpdateMovieUseCase>(TYPES.UpdateMovieUseCase).to(UpdateMovieUseCase);
container.bind<DeleteMovieUseCase>(TYPES.DeleteMovieUseCase).to(DeleteMovieUseCase);

// Controllers
container.bind<MovieController>(TYPES.MovieController).to(MovieController);

export { container };