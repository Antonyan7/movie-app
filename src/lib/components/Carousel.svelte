<script lang="ts">
	import MovieCard from "./MovieCard.svelte";
	import ArrowRight from "./icons/ArrowRight.svelte";
	import type { IMovie } from '$lib/types/tmdb.js';

	export let title = "Section";
	export let movies: IMovie[] = [];
</script>

<section class="pl-[15px] pr-[16px] pt-[54px] pb-4">
	<div class="flex items-center justify-between mb-[30px]">
		<h2 class="text-[#FFFFFF] font-semibold text-[20px] md:text-[24px] lg:text-[28px]">{title}</h2>
		<button class="cursor-pointer">
			<ArrowRight size={26} color="white" />
		</button>
	</div>
	<div class="flex gap-[15px] overflow-x-auto scrollbar-hide">
		{#each movies as movie (movie.id)}
			<MovieCard {movie} />
		{/each}
	</div>
</section>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
</style>
