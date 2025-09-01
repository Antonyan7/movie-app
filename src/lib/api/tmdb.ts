import { env } from '$env/dynamic/public';

const API_KEY = env.PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
	const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
	const data = await res.json();
	return data.results;
}

export async function fetchTopRatedMovies() {
	const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
	const data = await res.json();
	return data.results;
}

export async function fetchGenres() {
	const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
	const data = await res.json();
	return data.genres; 
}