import { Movie, MovieCreateData, MovieUpdateData } from "@/domain/entities/Movie";
import { MovieRepository } from "@/domain/repositores/MovieRepository";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";


@injectable()
export class PrismaMovieRepository implements MovieRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findAll(): Promise<Movie[]> {
        return this.prisma.movie.findMany({
            orderBy: {
                releaseDate: 'desc'
            }
        });
    }

    async findById(id: string): Promise<Movie | null> {
        return this.prisma.movie.findUnique({
            where: { id }
        });
    } 

    async create(data: MovieCreateData): Promise<Movie> {
        return this.prisma.movie.create({
            data
        });
    }

    async update(id: string, data: MovieUpdateData): Promise<Movie | null> {
        try {
            return await this.prisma.movie.update({
                where: { id },
                data
            });
        } catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.prisma.movie.delete({
                where: { id }
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
