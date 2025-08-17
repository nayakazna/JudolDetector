import { normalizeText } from "./normalization";

export function findMatches(
    text: string,
    algo: string,
    keywords: string[] | null,
    returnIndices: boolean = false
): boolean | number[] {
    const normalized = normalizeText(text);
    
    switch (algo) {
        case "regex": {
            const JUDOL_REGEX = /\b[a-zA-Z]{3,}[0-9]{2,3}\b/g;
            const matches = matchRegex(normalized, JUDOL_REGEX);
            return returnIndices
                ? matches.map((m) => normalized.indexOf(m)) // indices
                : matches.length > 0;
        }
        case "bm": {
            if (!keywords) return returnIndices ? [] : false;
            const allMatches: number[] = [];
            for (const k of keywords) {
                const indices = matchBM(normalized, k);
                if (indices.length > 0) {
                    if (!returnIndices) return true;
                    allMatches.push(...indices);
                }
            }
            return returnIndices ? allMatches : false;
        }
        case "kmp": {
            if (!keywords) return returnIndices ? [] : false;
            const allMatches: number[] = [];
            for (const k of keywords) {
                const indices = matchKMP(normalized, k);
                if (indices.length > 0) {
                    if (!returnIndices) return true;
                    allMatches.push(...indices);
                }
            }
            return returnIndices ? allMatches : false;
        }
        case "rk": {
            if (!keywords) return returnIndices ? [] : false;
            const allMatches: number[] = [];
            for (const k of keywords) {
                const indices = matchRK(normalized, k);
                if (indices.length > 0) {
                    if (!returnIndices) return true;
                    allMatches.push(...indices);
                }
            }
            return returnIndices ? allMatches : false;
        }
        default:
            return returnIndices ? [] : false;
    }
}


export function matchRegex(text: string, regex: RegExp) {

    const matches = text.match(regex);
    return matches ? matches : [];
}

// adaptasi dari dari https://github.com/nayakazna/Tubes3_CVMagang
export function matchBM(text: string, pattern: string) {
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();
    const n = txt.length;
    const m = pat.length;
    if (m === 0 || m > n) return [];

    // heuristik bad character 
    const badChar = new Array(256).fill(-1);
    for (let i = 0; i < m; i++) {
        badChar[pat.charCodeAt(i)] = i;
    }

    // heuristik good suffix
    const goodSuffix = new Array(m).fill(m);
    const suffix = new Array(m).fill(0);
    suffix[m - 1] = m;
    let g = m - 1;
    let f = m - 1;
    for (let i = m - 2; i >= 0; i--) {
        if (i > g && suffix[i + m - 1 - f] < i - g) {
            suffix[i] = suffix[i + m - 1 - f];
        } else {
            if (i < g) g = i;
            f = i;
            while (g >= 0 && pat[g] === pat[g + m - 1 - f]) g--;
            suffix[i] = f - g;
        }
    }
    for (let i = 0; i < m - 1; i++) {
        goodSuffix[m - 1 - suffix[i]] = m - 1 - i;
    }
    let j = 0;
    for (let i = m - 1; i >= 0; i--) {
        if (suffix[i] === i + 1) {
            while (j < m - 1 - i) {
                if (goodSuffix[j] === m) {
                    goodSuffix[j] = m - 1 - i;
                }
                j++;
            }
        }
    }

    // search
    const matches: number[] = [];
    let s = 0;
    while (s <= n - m) {
        let j = m - 1;
        while (j >= 0 && pat[j] === txt[s + j]) {
            j--;
        }
        if (j < 0) {
            matches.push(s);
            s += goodSuffix[0];
        } else {
            const bcIndex = txt.charCodeAt(s + j);
            const bc = bcIndex < badChar.length ? badChar[bcIndex] : -1;
            const shift1 = j - bc >= 0 ? j - bc : j + 1;
            const shift2 = goodSuffix[j];
            s += Math.max(shift1, shift2);
        }
    }
    return matches;
}


// adaptasi dari dari https://github.com/nayakazna/Tubes3_CVMagang
export function matchKMP(text: string, pattern: string) {
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();
    const n = txt.length;
    const m = pat.length;
    if (m === 0 || m > n) return [];

    // lps
    const lps = new Array(m).fill(0);
    let len = 0;
    for (let i = 1; i < m; ) {
        if (pat[i] === pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    // search
    const matches: number[] = [];
    let i = 0;
    let j = 0;
    while (i < n) {
        if (pat[j] === txt[i]) {
            i++;
            j++;
            if (j === m) {
                matches.push(i - j);
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return matches;
}

export function matchRK(text: string, pattern: string) {
    const txt = text.toLowerCase();
    const pat = pattern.toLowerCase();
    const n = txt.length;
    const m = pat.length;

    if (m === 0 || m > n) return [];

    const d = 256;
    const q = 1000003;
    const matches: number[] = [];

    let p = 0;
    let t = 0;
    let h = 1;

    // h = pow(d, m-1) % q
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }

    for (let i = 0; i < m; i++) {
        p = (d * p + pat.charCodeAt(i)) % q;
        t = (d * t + txt.charCodeAt(i)) % q;
    }

    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (txt[i + j] !== pat[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                matches.push(i);
            }
        }

        if (i < n - m) {
            t = (d * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;
            if (t < 0) t += q;
        }
    }

    return matches;
}
