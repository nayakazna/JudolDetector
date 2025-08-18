# Judol Detector 🎰

Aplikasi web untuk mendeteksi dan menghapus komentar promosi judi online ("judol") di video YouTube.

## Spesifikasi
### Wajib (done semua)
1. Web based application dengan Svelte.
2. Pencarian video berbasis URL/ID.
3. Pencocokan string komentar dengan Regex, BM, KMP, dan Rabin-Karp.
4. Input kata kunci berbasis teks untuk algoritma selain Regex.
5. Normalisasi font Unicode Mathematical Italic, Mathematical Sans-Serif Bold, Mathematical Sans-Serif Bold Italic, Fullwidth, dan Monospace.

### Bonus
1. Insert dan delete komentar (unfinished, cuma sampai bikin API dan autentikasi akun Google).
2. Normalisasi selain 5 font fitur wajib.

## Tech Stack

* **Frontend & Backend**: SvelteKit
* **Styling**: Tailwind CSS
* **Autentikasi**: Auth.js (Google OAuth 2.0)
* **API**: YouTube Data API v3

## Cara Menjalankan (Lokal)

1.  **Clone** repositori ini dan masuk ke folder proyek.
    ```bash
    git clone [URL_REPO]
    cd JudolDetector
    ```
2.  **Install dependensi** dengan `pnpm`.
    ```bash
    pnpm install
    ```
3.  **Siapkan file `.env`**: Buat file `.env` di root folder dengan format berikut (isi dengan kredensial API Anda dari Google Cloud Console).
    ```
    YOUTUBE_API_KEY="KEY_API_ANDA_DI_SINI"
    GOOGLE_CLIENT_ID="ID_CLIENT_ANDA_DI_SINI"
    GOOGLE_CLIENT_SECRET="RAHASIA_CLIENT_ANDA_DI_SINI"
    AUTH_SECRET="SEKRET_ACAK_YANG_AMAN_DI_SINI"
    ```
4.  **Jalankan aplikasi** di mode development.
    ```bash
    pnpm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:5173`.
