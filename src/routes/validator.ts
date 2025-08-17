export let errorMessage = "";

export const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
export const YOUTUBE_URL_REGEX = /^(?:https?:\/\/|\/\/)?(?:www\.|m\.|.+\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|feeds\/api\/videos\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?![\w-])/;

export function getErrorMessage() {
    return errorMessage;
}

export function validateVideoId(id: string): boolean {
    return YOUTUBE_ID_REGEX.test(id);
}

export function validateVideoLink(url: string): boolean {
    return YOUTUBE_URL_REGEX.test(url);
}

export function validateVideo(input: string, isLink: boolean): boolean {
    if (!input) {
        errorMessage = "Input video tidak boleh kosong.";
        return false;
    }

    if (isLink) {
        if (!validateVideoLink(input)) {
            errorMessage = "URL video YouTube tidak valid.";
            return false;
        }
    } else {
        if (!validateVideoId(input)) {
            errorMessage = "ID video YouTube tidak valid.";
            return false;
        }
    }
    errorMessage = "";
    return true;
}