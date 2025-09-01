<script lang="ts">
	import Star from "./icons/Star.svelte";
	import StarHalf from "./icons/StarHalf.svelte";
	import type { IMovie } from '$lib/types/tmdb';
	
	export let movie: IMovie;
	const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

	function calculateStars(rating: number) {
		const ratingOutOf5 = rating / 2;
		const fullStars = Math.floor(ratingOutOf5);
		const hasHalfStar = ratingOutOf5 % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
		
		return { fullStars, hasHalfStar, emptyStars };
	}
</script>

<a href={`/movie/${movie.id}`} class="flex-shrink-0">
	{#if movie.poster_path}
		<img
			src={posterBaseUrl + movie.poster_path}
			alt={movie.title}
			class="rounded-lg w-[150px] h-[217px] object-cover"
		/>
	{:else}
		<div class="w-[150px] h-[217px] bg-gray-700 flex items-center justify-center text-xs text-gray-400 rounded-lg">
			No Image
		</div>
	{/if}

	<p class="mt-[7px] text-[14px] font-semibold truncate w-[150px] text-center text-[#FFFFFF]">{movie.title}</p>
	<p class="text-center flex justify-center items-center gap-1">
		{#each Array(calculateStars(movie.vote_average).fullStars) as _}
			<Star color="#FFFF00" />
		{/each}
		{#if calculateStars(movie.vote_average).hasHalfStar}
			<StarHalf color="#FFFF00" />
		{/if}
		{#each Array(calculateStars(movie.vote_average).emptyStars) as _}
			<Star color="#808080" />
		{/each}
	</p>
</a>
