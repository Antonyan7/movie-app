<script>
	import MenuIcon from '$lib/components/icons/MenuIcon.svelte';

	export let name = "Aymen Missaoui";
	export let photo = "/profile-picture.jpg";
</script>

<header class="flex justify-between pl-[15px] pt-[27px] pr-2.5">
	<div class="flex flex-start gap-3">
		<img
			src={photo}
			alt={name}
			class="rounded-full object-cover mt-[2px] w-[40px] h-[40px] md:w-[56px] md:h-[56px]"
		/>

		<div class="flex flex-col space-y-1 md:space-y-2 lg:spacy-y-5">
    <span
			class="text-[#B9C1D9] text-[12px] font-normal leading-[100%] md:text-[14px]"
		>
      Welcome back
    </span>
			<span
				class="mt-[2px] text-white text-[16px] font-semibold leading-[100%] md:text-[20px]"
			>
      {name}
    </span>
		</div>
	</div>
	<MenuIcon/>
</header>
