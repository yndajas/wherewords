import {
  hasUniqueWords,
  noiseWords,
  randomIndex,
  splitWords,
} from "./search_text.js";

function link(phrase) {
  return `<a href="./well_doner">${phrase}</a>`;
}

function textParagraph(phrase, length) {
  const words = splitWords(phrase);
  if (!hasUniqueWords(words)) return false;

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
