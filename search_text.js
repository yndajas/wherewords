export function splitWords(phrase) {
  return phrase.split(/\s+/).filter((word) => word.length > 0);
}

export function hasUniqueWords(words) {
  return words.length === new Set(words).size;
}

export function searchLength(value, minimum) {
  const requested = Number.parseInt(value, 10);
  if (Number.isNaN(requested)) return minimum;

  return Math.max(requested, minimum);
}

function endsWith(array, sequence) {
  if (sequence.length > array.length) return false;

  const end = array.slice(array.length - sequence.length);

  return sequence.every((word, index) => word === end[index]);
}

export function randomIndex(array, random = Math.random) {
  return Math.floor(random() * array.length);
}

export function candidateWords(words, noise) {
  const nonFinalWords = words.slice(0, -1);

  return endsWith(noise, nonFinalWords) ? nonFinalWords : words;
}

export function noiseWords(words, length, random = Math.random) {
  const noise = [];

  while (noise.length < length - words.length) {
    const candidates = candidateWords(words, noise);
    if (candidates.length === 0) break;

    noise.push(candidates[randomIndex(candidates, random)]);
  }

  return noise;
}
