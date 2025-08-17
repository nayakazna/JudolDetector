import mapJson from './map.json' assert { type: 'json' };
type CharMap = {[key: string]: string;};
const charMap: CharMap = mapJson as CharMap;

export function normalizeText(text: string): string {
  return [...text].map(ch => charMap[ch] || ch).join('');
}