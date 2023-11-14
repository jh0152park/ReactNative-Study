export interface IResult {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    name: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    release_date?: string;
}

export interface IData {
    results: IResult[];
}

export interface IGenre {
    id: number;
    name: string;
}

export interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IDetail {
    backdrop_path: string;
    poster_path: string;
    genres: IGenre[];
    homepage: string;
    overview: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_average: number;
    vote_count: number;
    production_companies: IProductionCompany[];
}

export interface ITVDetail {
    backdrop_path: string;
    poster_path: string;
    genres: IGenre[];
    homepage: string;
    overview: string;
    last_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
    production_companies: IProductionCompany[];
}

export interface IBackdrops {
    aspect_ratio: number;
    height: number;
    vote_average: number;
    vote_count: number;
    width: number;
    file_path: string;
    iso_639_1: string | null;
}

export interface ILogo {
    aspect_ratio: number;
    height: number;
    vote_average: number;
    vote_count: number;
    width: number;
    iso_639_1: string | null;
    file_path: string;
}

export interface IImages {
    id: number;
    backdrops: IBackdrops[];
    logos: ILogo[];
}

export interface ITVResult {
    genre_ids: number[];
    origin_country: string[];
    backdrop_path: string;
    first_air_date: string;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    id: number;
    popularity: number;
    vote_average: number;
    vote_count: number;
}

export interface ITVData {
    results: ITVResult[];
}

export interface IMovieSearchResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ITVSearchResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
}
