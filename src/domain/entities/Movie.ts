
export interface Movie {
    id: string;
    title: string;
    releaseDate: Date,
    synopsis: string;
    createdAt: Date;
    updatedAt: Date;
}

export type MovieCreateData = Omit<Movie, | 'id' | 'createdAt' | 'updatedAt'>;
export type MovieUpdateData = Partial<MovieCreateData>;