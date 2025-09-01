<script lang="ts">
	import { onMount } from "svelte";
	import { fetchGenres } from "$lib/api/tmdb";
	import SearchIcon from "$lib/components/icons/SearchIcon.svelte";
	import FilterIcon from "$lib/components/icons/FilterIcon.svelte";
	import type { Genre } from '$lib/types/tmdb';

	export let selectedGenre = "";
	export let selectedYear = "";
	export let onFilter: (genreId: string, year: string) => void = () => {};
	export let onSearch: (query: string) => void = () => {};

	let genres: Genre[] = [];
	let showFilters = false;
	let searchQuery = "";

	onMount(async () => {
		genres = await fetchGenres();
	});

	const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);

	function handleSearch() {
		onSearch(searchQuery);
	}

	function handleFilter() {
		onFilter(selectedGenre, selectedYear);
	}
</script>

<div class="bg-[#131316] rounded-lg px-3 py-2 flex items-center justify-between mx-[10px] mt-[27px] h-[48px]">
	<div class="flex items-center gap-2 text-gray-400 flex-1">
		<div class="mr-2 ml-3">
			<SearchIcon size={20} color="#B9C1D9" />
		</div>
		<input
			type="text"
			placeholder="Search"
			bind:value={searchQuery}
			on:input={handleSearch}
			class="bg-transparent text-white placeholder-[#575B66] text-[16px] font-normal outline-none flex-1"
		/>
	</div>

	<button on:click={() => showFilters = !showFilters} class="text-gray-400 hover:text-white ml-1 mr-3">
		<FilterIcon size={20} color="#B9C1D9" />
	</button>
</div>

{#if showFilters}
	<div class="mt-2 p-4 bg-gray-800 rounded-lg space-y-3 mx-[10px]">
		<select
			class="w-full bg-gray-700 p-3 rounded-md text-base border border-gray-600 focus:border-gray-500 focus:outline-none border-r-8 border-gray-700"
			bind:value={selectedGenre}
			on:change={handleFilter}
		>
			<option value="">All Genres</option>
			{#each genres as g (g.id)}
				<option value={g.id}>{g.name}</option>
			{/each}
		</select>

		<select
			class="w-full bg-gray-700 p-3 rounded-md text-base border border-gray-600 focus:border-gray-500 focus:outline-none border-r-8 border-gray-700"
			bind:value={selectedYear}
			on:change={handleFilter}
		>
			<option value="">All Years</option>
			{#each years as year (year)}
				<option value={year}>{year}</option>
			{/each}
		</select>
	</div>
{/if}
