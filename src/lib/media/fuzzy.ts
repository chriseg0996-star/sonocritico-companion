/** Normaliza texto para búsqueda (minúsculas, sin acentos). */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

export function tokenizeSearch(value: string): string[] {
  return normalizeSearchText(value)
    .split(/[\s,/+-]+/)
    .filter((t) => t.length > 0);
}

/** Distancia de Levenshtein (cadenas cortas). */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = temp;
    }
  }
  return row[b.length];
}

export function fuzzyTokenMatch(queryToken: string, fieldToken: string): boolean {
  if (fieldToken.includes(queryToken) || queryToken.includes(fieldToken)) return true;
  if (queryToken.length < 3 || fieldToken.length < 3) return false;
  return levenshtein(queryToken, fieldToken) <= 1;
}
