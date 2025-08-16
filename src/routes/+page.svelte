<script lang="ts">
    import { onMount } from 'svelte';
    import { Label, Input, Helper, Fileupload, Select, Button, Dropdown, DropdownItem, GradientButton } from 'flowbite-svelte';
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import { base } from '$app/paths';


    // === Variabel buat state === //
    // buat fitur utama
    let videoInput = $state("");
    let isDropdownOpen = $state(false);
    let algo = $state("");
    let algoName = $state("Pilih algoritma...");
    let algos : { value: string; name: string}[] = [
        { value: 'regex', name: 'Regular Expression' },
        { value: 'kmp', name: 'Knuth-Morris-Pratt' },
        { value: 'bm', name: 'Boyer-Moore' },
        { value: 'rk', name: 'Rabin-Karp' }
    ];

    let keywordsInput = $state("");
    let keywordsFile = $state<FileList | null>(null);
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
            <h1 class="text-4xl font-extrabold mb-2">JudolDetectorGacor999</h1>
            <p class="text-lg text-gray-200"> Mari berantas komen promosi judol (karena pemerintah gabisa) di vidio yutub pilihanmu, Cik! </p>
        </header>
    </div>
    
    <!-- box buat fitur utama -->
    <div class="bg-[var(--surface-2)] p-8 md:p-12 rounded-2xl w-full max-w-3xl backdrop-blur-md mx-auto border border-[var(--border)] shadow-md">
        <h2 class="text-2xl font-bold mb-6">Pencarian Komentar</h2>
        
        <!-- form untuk URL vidio yutub -->
        <div class="mb-6">
            <Label class="label block mb-2" for="videoInput">
                URL Video YouTube
                <Input id="videoInput" class="input" name="yutub" required placeholder="https://www.youtube.com/watch?v=..." bind:value={videoInput} />
                <Helper class="helper mt-2">
                    Masukkan tautan video YouTube yang mau diperiksa. 
                </Helper>
            </Label>
        </div>

        <!-- dropdown untuk algo -->
        <div class="mb-6">
            <Label class="label block mb-2" for="algorithm">
                Algoritma Pencarian
                <div>
                    <Button onclick={() => (isDropdownOpen = !isDropdownOpen)} class="input w-full">
                        {algoName} <ChevronDownOutline class="w-4 h-4" />
                    </Button>
                    <Dropdown bind:isOpen={isDropdownOpen} simple class="w-ful">
                    {#each algos as { value, name }}
                        <DropdownItem class="w-full" onclick={() => { algo = value; algoName = name; isDropdownOpen = false; }}>
                            {name}
                        </DropdownItem>
                    {/each}
                    </Dropdown>

                    <Helper class="helper mt-2">Pilih algoritma untuk pencocokan string. </Helper>
                </div>
            </Label>
        </div>
        
        <!-- input kata kunci -->
        <!-- ada 2 cara, via kolom input atau upload file .txt (buat selain regex) -->
        {#if (algo === 'bm' || algo === 'kmp' || algo === 'rk')}
        <div class="border-b border-[var(--border)] my-4"></div>
        {/if}
        
        <!-- kolom input -->
        <!-- kalo udah upload file, kolom ini diilangin -->
        {#if !keywordsFile && (algo === 'bm' || algo === 'kmp' || algo === 'rk')}
        <div class="mb-6">
            <Label class="label block mb-2" for="keywordsInput">
                Kata Kunci
                <Input id="keywordsInput" class="input" name="keywords" required placeholder="DanantaraIKNGacor999" bind:value={keywordsInput} />
            </Label>
            <Helper class="helper mt-2">Masukkan kata kunci yang ingin dicari. Pisahkan antarkata kunci dengan tanda koma. </Helper>
        </div>
        {/if}

        <!-- upload file .txt -->
        <!-- kalo selain regex DAN kolom input yg disediain masi kosong, kasi opsi buat upload file txt -->
        
        {#if !keywordsInput && !keywordsFile && (algo === 'bm' || algo === 'kmp' || algo === 'rk')}
        <div class="mb-6 flex items-center justify-center" >
            <p class="text-[var(--tonal-6)]">atau</p>
        </div>
        {/if}

        {#if !keywordsInput && (algo === 'bm' || algo === 'kmp' || algo === 'rk')}
        <div class="mb-6">
            <Label class="label block mb-2" for="keywordsFile">
                File .txt
                <Fileupload id="keywordsFile" class="input" name="keywordsFile" accept=".txt" bind:files={keywordsFile} />   
                <Helper class="helper mt-2">Unggah file .txt yang berisi kata kunci. Pisahkan antarkata kunci dengan newline.</Helper>
            </Label>
        </div>
        {/if}

        <!-- button buat deteksi komentar -->
        <GradientButton color="greenToBlue" pill class="w-full" onclick={handleDetectComments}>Deteksi Komentar</GradientButton>
        
        <!-- status message -->
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
