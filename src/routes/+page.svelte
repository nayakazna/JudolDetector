<script lang="ts">
    import { onMount } from 'svelte';
    import { base } from '$app/paths';


    // === Variabel buat state === //
    // buat fitur utama
    let videoInput = '';
    let algorithm = 'regex';
    let keywordsInput = '';
    let keywordsFile: File | null = null;
    let statusMessage = 'Tidak ada komentar yang ditemukan.';
    let results: any[] = [];
    let insertVideoId = '';
    let insertFile: File | null = null;

    // buat bonus
    let isAuthenticated = false;

    // === Fungsi-fungsi === //
    const JUDOL_REGEX = /[a-zA-Z]+[0-9]{2,3}/g;
    function normalizeText(text: string) {
    }

    function findMatches(text: string, algo: string, keywords: string[] | null) {
    }


    const handleAuthenticate = () => {
    };

    const handleDetectComments = async () => {
    };

    const handleInsertComments = async () => {
    };

    const handleDeleteComments = async () => {
    };

</script>
<!-- main -->
<div class="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col items-center justify-center p-4 font-pjs">
    <!-- header (judul sama deskripsi) -->
    <div>
        <header class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-red-400 mb-2">JudolDetectorGacor999</h1>
            <p class="text-lg text-[var(--muted-foreground)]"> Mari berantas komen promosi judol (karena pemerintah gabisa) di vidio yutub pilihanmu, Cik! </p>
        </header>
    </div>
    
    <!-- box buat fitur utama -->
    <div class="bg-[var(--card)] p-8 md:p-12 rounded-2xl w-full max-w-3xl mx-auto border border-[var(--border)]">
        <h2 class="text-2xl font-bold mb-6">Pencarian Komentar</h2>
        <div class="mb-6">
            <label for="videoInput" class="block mb-2">Masukkan URL Video YouTube:</label>
            <input type="text" id="videoInput" bind:value={videoInput} class="w-full p-2 bg-[var(--input)] border border-[var(--border)] rounded" placeholder="https://www.youtube.com/watch?v=...">
        </div>
        <div class="mb-6">
            <label for="algorithm" class="block mb-2">Pilih Algoritma Pencarian:</label>
            <select id="algorithm" bind:value={algorithm} class="w-full p-2 bg-[var(--input)] border border-[var(--border)] rounded">
                <option value="regex">Regex</option>
                <option value="kmp">KMP</option>
                <option value="bm">BM</option>
                <option value="rk">Rabin-Karp</option>
            </select>
        </div>
        
        <!-- input kata kunci -->
        <div class="mb-6">
            <label for="keywordsInput" class="block mb-2">Masukkan Kata Kunci:</label>
            <input type="text" id="keywordsInput" bind:value={keywordsInput} class="w-full p-2 bg-[var(--input)] border border-[var(--border)] rounded" placeholder="Kata kunci...">
        </div>

        <!-- kalo selain regex DAN input teks yg disediain masi kosong, kasi opsi buat upload file txt -->
        {#if (algorithm === 'kmp' || algorithm === 'bm' || algorithm === 'rk') && !videoInput}
        <div class="mb-6">
            <label for="keywordsFile" class="block mb-2">Atau, upload file .txt berisi kata kunci:</label>
            <input type="file" id="keywordsFile" accept=".txt" on:change={(e: Event) => { const target = e.target as HTMLInputElement; keywordsFile = target.files?.[0] ?? null; }} class="w-full p-2 bg-[var(--input)] border border-[var(--border)] rounded">
        </div>
        {/if}
        <!-- else, upload .txt -->

        <button on:click={handleDetectComments} class="bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded hover:bg-[var(--primary-hover)]">Deteksi Komentar</button>
        {#if statusMessage}
            <p class="mt-4 text-sm text-[var(--muted-foreground)]">{statusMessage}</p>
        {/if}
    </div>

    <!-- box buat fitur bonus -->
</div>

<style>
    .font-pjs {
        font-family: 'Plus Jakarta Sans', sans-serif;
    }
</style>
