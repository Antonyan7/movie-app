<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import Play from '$lib/components/icons/Play.svelte';
	import Star from '$lib/components/icons/Star.svelte';
	import Heart from '$lib/components/icons/Heart.svelte';
	import type { IMovie } from '$lib/types/tmdb';

	const API_KEY = env.PUBLIC_TMDB_API_KEY;

	let movie: IMovie | null = null
	let showFullDescription = false;
	const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

	function getTruncatedText(text: string) {
		if (!text) return '';
		const maxChars = 140;
		if (text.length <= maxChars) return text;
		
		const truncated = text.substring(0, maxChars);
		const lastSpace = truncated.lastIndexOf(' ');
		return lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;
	}

	$: id = $page.params.id;

	onMount(async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
		);
		movie = await res.json();
	});
</script>

{#if movie}
	<div class="bg-[#1F1F29] text-white min-h-screen pb-4">
		<div class="md:hidden">
			<div class="relative">
				<img src={posterBaseUrl + movie.poster_path} alt={movie.title} class="w-full h-[482px] object-fill" />
				<div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1F1F29] to-transparent"></div>
				<div class="absolute bottom-[43px] right-[13px] text-white text-[16px] font-semibold">
					{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
				</div>
				<div class="absolute inset-0 flex items-center justify-center">
					<Play size={60} color="#FF0000" />
				</div>
			</div>

			<div class="flex items-center gap-2 px-[10px] mt-4">
				<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg">+18</div>
				<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg">{movie.genres[0]?.name || 'Action'}</div>
				<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg flex items-center gap-1">
					<Star size={16} color="#FFFF00" />
					{movie.vote_average.toFixed(1)}
				</div>
				<div class="ml-auto">
					<Heart size={25} color="#FF0000" opacity={0.88} />
				</div>
			</div>

			<h1 class="text-[#FFFFFF] font-semibold text-[25px] mt-[27px] px-[10px]">{movie.title}</h1>

			<div class="px-[10px]">
				<p class="mt-[16px] text-[18px] text-[#FFFFFF] font-normal md:hidden">
					{#if showFullDescription}
						{movie.overview}
						{#if movie.overview && movie.overview.length > 150}
							<button 
								on:click={() => showFullDescription = false}
								class="text-[#FF0000BA] text-[16px] font-bold ml-1 inline"
							>
								Show Less
							</button>
						{/if}
					{:else}
						{getTruncatedText(movie.overview)}
						{#if movie.overview && movie.overview.length > 150}
							<button 
								on:click={() => showFullDescription = true}
								class="text-[#FF0000BA] text-[16px] font-bold ml-1 inline"
							>
								Show More
							</button>
						{/if}
					{/if}
				</p>
			</div>

			<h2 class="text-[25px] font-semibold mt-[11px] px-[10px]">Actors</h2>
			<div class="flex gap-4 overflow-x-auto px-[10px] mt-[14px]">
				{#each movie.credits.cast.slice(0, 10) as actor (actor.id)}
					<div class="w-[108px]">
						{#if actor.profile_path}
							<div class="w-[108px] h-[108px] ">
								<img src={"https://image.tmdb.org/t/p/w185" + actor.profile_path} alt={actor.name} class="w-full h-full rounded-[5px]" />
							</div>
						{/if}
						<p class="text-[12px] text-[#FFFFFF] font-normal text-center mt-[5px] truncate">{actor.name}</p>
					</div>
				{/each}
			</div>
			<div class="px-[10px] mt-6">
				<button class="w-full bg-[#F5C518] text-[#FFFFFF] text-[18px] font-semibold py-3 rounded-lg cursor-pointer">
					Open IMDb
				</button>
			</div>
		</div>

		<div class="hidden md:flex md:flex-row md:gap-8 md:px-8 lg:gap-8 lg:px-8 lg:mt-8">
			<div class="md:w-[430px] md:flex-shrink-0 lg:w-[430px] lg:flex-shrink-0">
				<div class="relative">
					<img src={posterBaseUrl + movie.poster_path} alt={movie.title} class="w-full h-[482px] md:w-[430px] md:h-[482px] lg:w-[430px] lg:h-[482px] object-fill" />
					<div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1F1F29] to-transparent"></div>
					<div class="absolute bottom-[43px] right-[13px] text-white text-[16px] font-semibold">
						{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
					</div>
					<div class="absolute inset-0 flex items-center justify-center">
						<Play size={60} color="#FF0000" />
					</div>
				</div>
			</div>

			<div class="md:flex-1 md:pt-8 lg:flex-1 lg:pt-8">
				<div class="flex flex-col md:flex-col lg:flex-row items-start gap-2 px-[10px] mt-4 lg:mt-0">
					<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg">+18</div>
					<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg">{movie.genres[0]?.name || 'Action'}</div>
					<div class="bg-[#312F35] text-white text-[16px] font-bold pl-[11px] pr-[10px] py-[8px] rounded-lg flex items-center gap-1">
						<Star size={16} color="#FFFF00" />
						{movie.vote_average.toFixed(1)}
					</div>
					<div class="md:ml-0 lg:ml-auto">
						<Heart size={25} color="#FF0000" opacity={0.88} />
					</div>
				</div>

				<h1 class="text-[#FFFFFF] font-semibold text-[25px] mt-[27px] px-[10px] lg:mt-4">{movie.title}</h1>

				<div class="px-[10px]">
					<p class="mt-[16px] text-[18px] text-[#FFFFFF] font-normal hidden md:block">
						{movie.overview}
					</p>
				</div>
			</div>
		</div>

		<div class="hidden md:block">
			<h2 class="text-[25px] font-semibold mt-[11px] px-[10px] lg:px-8">Actors</h2>
			<div class="flex gap-4 overflow-x-auto px-[10px] mt-[14px] lg:px-8">
				{#each movie.credits.cast.slice(0, 10) as actor (actor.id)}
					<div class="w-[108px]">
						{#if actor.profile_path}
							<div class="w-[108px] h-[108px] ">
								<img src={"https://image.tmdb.org/t/p/w185" + actor.profile_path} alt={actor.name} class="w-full h-full rounded-[5px]" />
							</div>
						{/if}
						<p class="text-[12px] text-[#FFFFFF] font-normal text-center mt-[5px] truncate">{actor.name}</p>
					</div>
				{/each}
			</div>
			<div class="px-[10px] lg:px-8 mt-6">
				<button class="w-full bg-[#F5C518] text-[#FFFFFF] text-[18px] font-semibold py-3 rounded-lg cursor-pointer">
					Open IMDb
				</button>
			</div>
		</div>
	</div>
{:else}
	<p class="text-white">Loading...</p>
{/if}
