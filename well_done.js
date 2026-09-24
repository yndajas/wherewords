function uniqueWords(phrase) {
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

function randomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function link(phrase) {
  return `<a href="./well_doner">${phrase}</a>`;
}

function noiseWords(words, length) {
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

function textParagraph(phrase, length) {
  const words = uniqueWords(phrase);
  if (!words) return false;

  const textArray = noiseWords(words, length);

  textArray.splice(randomIndex(textArray), 0, link(phrase));
  const innerHtml = textArray.join(" ");
  const paragraph = document.createElement("p");
  paragraph.classList.add("search");
  paragraph.innerHTML = innerHtml;

  return paragraph;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const phrase = document.querySelector("input[name='phrase']").value.trim();
  if (phrase.length === 0) {
    alert("Say something!");
    return;
  }

  const length = Math.max(
    Number.parseInt(document.querySelector("input[name='length']").value),
    phrase.split(" ").length,
  );
  const paragraph = textParagraph(phrase, length);

  if (paragraph) {
    event.target.replaceWith(paragraph);
  } else {
    alert("No repeated words!");
  }
});
