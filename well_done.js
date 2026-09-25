import {
  hasUniqueWords,
  noiseWords,
  searchLength,
  splitWords,
} from "./search_text.js";

function link(phrase) {
  const anchor = document.createElement("a");
  anchor.href = "./well_doner";
  anchor.textContent = phrase;

  return anchor;
}

function textParagraph(words, length) {
  const { before, after } = noiseWords(words, length);
  const paragraph = document.createElement("p");
  paragraph.classList.add("search");

  if (before.length > 0) paragraph.append(`${before.join(" ")} `);
  paragraph.append(link(words.join(" ")));
  if (after.length > 0) paragraph.append(` ${after.join(" ")}`);

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

  const length = searchLength(
    document.querySelector("input[name='length']").value,
    words.length,
  );

  event.target.replaceWith(textParagraph(words, length));
});
