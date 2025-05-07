import { Movie, MovieCreateData, MovieUpdateData } from "../entities/Movie";

export interface MovieRepository {
    findAll(): Promise<Movie[]>;
    findById(id: string): Promise<Movie | null>;
    create(data: MovieCreateData): Promise<Movie>;
    update(id: string, data: MovieUpdateData): Promise<Movie | null>
    delete(id: string): Promise<boolean>;
}
