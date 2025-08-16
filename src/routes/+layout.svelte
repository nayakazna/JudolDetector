<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import { initFlowbite } from 'flowbite';
  	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initFlowbite();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
