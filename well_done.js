import {
  hasUniqueWords,
  noiseWords,
  randomIndex,
  splitWords,
} from "./search_text.js";

function link(phrase) {
  return `<a href="./well_doner">${phrase}</a>`;
}

function textParagraph(words, length) {
  const textArray = noiseWords(words, length);

  textArray.splice(randomIndex(textArray), 0, link(words.join(" ")));
  const innerHtml = textArray.join(" ");
  const paragraph = document.createElement("p");
  paragraph.classList.add("search");
  paragraph.innerHTML = innerHtml;

  return paragraph;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const words = splitWords(
    document.querySelector("input[name='phrase']").value,
  );

  if (words.length === 0) {
    alert("Say something!");
    return;
  }

  if (!hasUniqueWords(words)) {
    alert("No repeated words!");
    return;
  }

  const length = Math.max(
    Number.parseInt(document.querySelector("input[name='length']").value),
    words.length,
  );

  event.target.replaceWith(textParagraph(words, length));
});
