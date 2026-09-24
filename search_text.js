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

export function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

export function noiseWords(words, length) {
  const non_final_words = words.slice(0, -1);
  const textArray = [];

  while (textArray.length < length - words.length) {
    let candidates;

    if (matchEnd(non_final_words, textArray)) {
      candidates = non_final_words;
    } else {
      candidates = words;
    }

    textArray.push(candidates[randomIndex(candidates)]);
  }

  return textArray;
}
