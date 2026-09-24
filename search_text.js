export function splitWords(phrase) {
  return phrase.split(/\s+/).filter((word) => word.length > 0);
}

export function hasUniqueWords(words) {
  return words.length === new Set(words).size;
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
  const textArray = [];

  while (textArray.length < length - words.length) {
    const candidates = candidateWords(words, textArray);
    if (candidates.length === 0) break;

    textArray.push(candidates[randomIndex(candidates, random)]);
  }

  return textArray;
}
