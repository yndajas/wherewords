export function uniqueWords(phrase) {
  const words = phrase.split(" ");
  if (words.length !== new Set(words).size) return false;

  return words;
}

function matchEnd(lookFor, lookIn) {
  const lookInEnd = lookIn.slice(-lookFor.length);

  return lookFor.every(
    (lookForWord, lookForIndex) => lookForWord == lookInEnd[lookForIndex],
  );
}

export function randomIndex(array, random = Math.random) {
  return Math.floor(random() * array.length);
}

export function candidateWords(words, noise) {
  const non_final_words = words.slice(0, -1);

  return matchEnd(non_final_words, noise) ? non_final_words : words;
}

export function noiseWords(words, length, random = Math.random) {
  const textArray = [];

  while (textArray.length < length - words.length) {
    const candidates = candidateWords(words, textArray);

    textArray.push(candidates[randomIndex(candidates, random)]);
  }

  return textArray;
}
