<script lang="ts">
	import { onMount } from "svelte";
	import { fetchGenres } from "$lib/api/tmdb";
	import type { Genre } from '$lib/types/tmdb';

	export let selectedGenre: Genre | null = null;
	export let onFilter: (genre: Genre | null) => void = () => {};

	let genres: Genre[] = [];

	onMount(async () => {
		genres = await fetchGenres();
	});
</script>

<nav class="flex items-center justify-between p-4 bg-gray-900 text-white">
	<h1 class="text-lg font-bold">Movie App</h1>

	<select
		class="bg-gray-800 text-sm px-3 py-1 rounded"
		bind:value={selectedGenre}
		on:change={() => onFilter(selectedGenre)}
	>
		<option value="">All Genres</option>
		{#each genres as g (g.id)}
			<option value={g.id}>{g.name}</option>
		{/each}
	</select>
</nav>
