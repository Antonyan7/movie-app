<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import FilterBar from "$lib/components/FilterBar.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import { fetchPopularMovies, fetchTopRatedMovies } from "$lib/api/tmdb";
	import { onMount } from "svelte";
	import type { IMovie } from '$lib/types/tmdb';



	let popular: IMovie[] = [];
	let recommended: IMovie[] = [];
	let filtered: IMovie[] = [];
	let selectedGenre = "";
	let selectedYear = "";
	let searchQuery = "";

	onMount(async () => {
		popular = await fetchPopularMovies();
		recommended = await fetchTopRatedMovies();
		filtered = popular;
	});

	function handleFilter(genreId: string, year: string) {
		filtered = popular.filter(m => {
			const matchGenre = !genreId || m.genre_ids.includes(Number(genreId));
			const matchYear = !year || (m.release_date && m.release_date.startsWith(year));
			const matchSearch = !searchQuery || m.title.toLowerCase().includes(searchQuery.toLowerCase());
			return matchGenre && matchYear && matchSearch;
		});
	}

	function handleSearch(query: string) {
		searchQuery = query;
		handleFilter(selectedGenre, selectedYear);
	}
</script>

<div class="bg-[#1F1F29] min-h-screen text-white">
	<Header />
	<div class="p-4">
		<FilterBar bind:selectedGenre bind:selectedYear onFilter={handleFilter} onSearch={handleSearch} />
	</div>

	<Carousel title="Popular" movies={filtered} />
	{#if filtered.length === 0 && (selectedGenre || selectedYear || searchQuery)}
		<div class="flex flex-col items-center justify-center py-16 px-4">
			<div class="text-center">
				<h3 class="text-[#FFFFFF] text-[24px] font-semibold mb-4">No Results Found</h3>
				<p class="text-[#FFFFFF] text-[16px] font-normal opacity-70">
					Try adjusting your search criteria or filters to find more movies.
				</p>
			</div>
		</div>
	{/if}
	<Carousel title="Recommended" movies={recommended} />
</div>
