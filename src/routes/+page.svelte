<script lang="ts">
    import { onMount } from 'svelte';
    import { Label, Input, Helper, Select, Button, Dropdown, DropdownItem, GradientButton } from 'flowbite-svelte';
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import Fileupload from '$lib/components/Fileupload.svelte';
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { base } from '$app/paths';
    import { page } from '$app/stores';

    // === Variabel buat state === //
    // buat fitur utama
    let videoLink = $state("");
    let youtubeAPI = $state("");
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
    
    // buat bonus
    const { session } = $page.data;
    let isAuthenticated = $derived(!!session);
    let user = $derived(() => session?.user);
    
    let insertVideoLink = $state("");
    let insertFile = $state<File | null>(null);

    let deleteVideoLink = $state("");

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
    <div class="mb-6">
        <header class="text-center mb-6">
            <h1 class="text-4xl font-extrabold mb-2">JudolDetectorGacor999</h1>
            <p class="text-lg text-gray-200"> Mari berantas komen promosi judol (karena pemerintah gabisa) di vidio yutub pilihanmu, Cik! </p>
        </header>
    </div>
    
    <!-- form untuk URL vidio yutub -->
    <div class="mb-6 w-full max-w-3xl mx-auto">
        <Label class="label block mb-2" for="videoLink">
            ID/URL Video YouTube
            <Input 
                id="videoLink" 
                class="input w-full" 
                name="yutub" 
                required 
                placeholder="https://www.youtube.com/watch?v=..." 
                bind:value={videoLink} 
            />
            <Helper class="helper mt-2">
                Masukkan tautan video YouTube yang mau diperiksa. Anda juga bisa memasukkan ID dari video tersebut, misalnya <code>abc123xyz</code> dari <code>https://www.youtube.com/watch?v=abc123xyz</code>.
            </Helper>
        </Label>
    </div>


    <!-- box buat fitur utama -->
    <div class="bg-[var(--surface-2)] p-8 md:p-12 rounded-2xl w-full max-w-3xl backdrop-blur-md mx-auto border border-[var(--border)] shadow-md">
        <h2 class="text-2xl font-bold mb-6">Pencarian Komentar</h2>


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
                <Fileupload id="keywordsFile" name="keywordsFile" accept=".txt" bind:files={keywordsFile} />   
                <Helper class="helper mt-2">Unggah file .txt yang berisi kata kunci. Pisahkan antarkata kunci dengan newline.</Helper>
            </Label>
        </div>
        {/if}

        <!-- button buat deteksi komentar -->
        <GradientButton color="greenToBlue" class="w-full" onclick={handleDetectComments}>Deteksi Komentar</GradientButton>
        
        <!-- status message -->
        {#if statusMessage}
            <p class="mt-4 text-sm text-[var(--muted-foreground)]">{statusMessage}</p>
        {/if}
    </div>

    <!-- box buat fitur bonus -->

    <div class="bg-[var(--surface-2)] p-8 md:p-12 rounded-2xl w-full max-w-3xl backdrop-blur-md mx-auto border border-[var(--border)] shadow-md mt-6">
        <h2 class="text-2xl font-bold mb-6">Fitur Bonus</h2>
        
        <!-- login gan -->
        <div class="mb-6">
            {#if isAuthenticated}
            <div class="mb-6">
                <div class="flex items-center gap-4 mb-4">
                    <img src={session?.user?.image || 'https://placehold.co/40x40/4B5563/FFFFFF?text=P'} alt={session?.user?.name ? `Foto profil ${session.user.name}` : 'Foto profil pengguna'} class="h-10 w-10 rounded-full" />
                    <div>
                        <p class="font-semibold">{session?.user?.name}</p>
                        <p class="text-sm text-[var(--muted-foreground)]">{session?.user?.email}</p>
                    </div>
                </div>
                <GradientButton color="greenToBlue" class="w-full input flex items-center justify-center gap-2" onclick={() => signOut()}>
                    <svg class="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff" d="M44.5 20H24v8.5h11.8c-.83 5.4-4.84 8.7-10.8 8.7-6.57 0-11.97-5.4-11.97-11.97s5.4-11.97 11.97-11.97c3.34 0 5.86 1.44 7.6 3.03l5.8-5.8c-3.56-3.32-8.15-5.33-13.4-5.33-11.23 0-20.37 9.14-20.37 20.37s9.14 20.37 20.37 20.37c11.3 0 19.8-8.13 19.8-19.8 0-1.3-.12-2.58-.33-3.8z"/>
                    </svg>
                    Keluar
                </GradientButton>
            </div>
            {:else}
            <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2">Login, Gan!</h3>
                <p class="mb-6">Fitur bonus hanya bisa diakses setelah login. </p>
                <GradientButton color="greenToBlue" class="w-full input flex items-center justify-center gap-2" onclick={() => signIn('google')}>
                    <svg class="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffffff" d="M44.5 20H24v8.5h11.8c-.83 5.4-4.84 8.7-10.8 8.7-6.57 0-11.97-5.4-11.97-11.97s5.4-11.97 11.97-11.97c3.34 0 5.86 1.44 7.6 3.03l5.8-5.8c-3.56-3.32-8.15-5.33-13.4-5.33-11.23 0-20.37 9.14-20.37 20.37s9.14 20.37 20.37 20.37c11.3 0 19.8-8.13 19.8-19.8 0-1.3-.12-2.58-.33-3.8z"/>
                    </svg>
                    Otentikasi Akun Google
                </GradientButton>
            </div>
            {/if}
        </div>

        <!-- fitur bonusnya -->
        {#if isAuthenticated}
        <!-- insert -->
        <div class="mb-6">
            <h3 class="text-xl font-semibold mb-2">Sisipkan Komentar</h3>
            <Label class="label block mb-2" for="insertFile">
                File .txt Komentar
                <Fileupload id="insertFile" name="insertFile" accept=".txt" bind:files={insertFile} />
            </Label>
            <GradientButton color="greenToBlue" class="w-full mt-2" onclick={handleInsertComments}>Sisipkan Komentar</GradientButton>
        </div>
        
        <div class="border-b border-[var(--border)] my-4"></div>

        <!-- del -->
        <div>
            <h3 class="text-xl font-semibold mb-2">Hapus Komentar Judol</h3>
            <p class="text-gray-200 mb-4">Ini akan menghapus semua komentar yang terdeteksi "judol" dari video Anda.</p>
            <GradientButton color="greenToBlue" class="w-full" onclick={handleDeleteComments}>Hapus Komentar</GradientButton>
        </div>
        {/if}
    </div>
</div>

<style>
    .font-pjs {
        font-family: 'Plus Jakarta Sans', sans-serif;
    }
</style>
