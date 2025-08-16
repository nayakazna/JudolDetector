<script lang="ts">
    import { CloseButton } from 'flowbite-svelte';
    let { id, name, accept, clearable = false, files = $bindable(), class: customClass = "" } = $props();

    let fileName = $state("Pilih file...");
    $effect(() => {
        if (files && files.length > 0) {
        fileName = files[0].name;
        } else {
        fileName = "Pilih file...";
        }
    });

    function clearFile() {
        files = undefined;
        fileName = "Pilih file...";
        const inputElement = document.getElementById(id) as HTMLInputElement;
        if (inputElement) {
        inputElement.value = '';
        }
    }
</script>

<div class="custom-file-input-wrapper relative w-full flex items-center">
    <label for={id} class="custom-file-label w-full flex items-center justify-between cursor-pointer">
        <span class="file-name flex-1 block truncate px-4 py-2 text-sm">
        {fileName}
        </span>
        <span class="custom-button px-4 py-2 text-sm">
        Browse
        </span>
        <input
        type="file"
        {id}
        {name}
        {accept}
        bind:files
        class="hidden"
        />
    </label>

    {#if clearable && files && files.length > 0}
        <CloseButton
        onclick={clearFile}
        class="clear-button absolute top-1/2 right-1 -translate-y-1/2"
        aria-label="Clear selected files"
        />
    {/if}
</div>

<style>
    .custom-file-label {
        background-color: var(--surface-3);
        border: 0px;
        color: var(--light);
        border-radius: 0.5rem;
        padding: 0;
    }
    
    .file-name {
        color: var(--surface-4);
    }
    
    .custom-button {
        background-color: var(--tonal-5);
        color: var(--light);
        border-radius: 0 0.5rem 0.5rem 0;
        border-left: 1px solid var(--surface-4);
    }
    
    .clear-button {
        background-color: transparent !important;
        border: none;
    }
</style>
