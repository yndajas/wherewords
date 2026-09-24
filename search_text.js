export function splitWords(phrase) {
  return phrase.split(" ");
}

export function hasUniqueWords(words) {
  return words.length === new Set(words).size;
}

function endsWith(array, sequence) {
  const end = array.slice(-sequence.length);

  return sequence.every((word, index) => word == end[index]);
}

export function randomIndex(array, random = Math.random) {
  return Math.floor(random() * array.length);
}

export function candidateWords(words, noise) {
  const non_final_words = words.slice(0, -1);

  return endsWith(noise, non_final_words) ? non_final_words : words;
}

export function noiseWords(words, length, random = Math.random) {
  const textArray = [];

  while (textArray.length < length - words.length) {
    const candidates = candidateWords(words, textArray);

    textArray.push(candidates[randomIndex(candidates, random)]);
  }

  return textArray;
}
