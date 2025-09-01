export interface IMovie {
	id: number;
	title: string;
	poster_path: string | null;
	overview: string;
	release_date: string;
	genre_ids: number[];
	vote_average: number;
	runtime: number;
	genres: IGenres[];
	credits: ICredits
}

interface IGenres { id: number; name: string }

interface ICredits {
	cast: ICast[]
}

interface ICast { id: number; name: string; profile_path: string | null }

export interface Genre {
	id: number;
	name: string;
}