import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { candidateWords, noiseWords, uniqueWords } from "./search_text.js";

const words = ["interact", "with", "me"];

// Picks the first candidate, then the second, then the third, which spells
// the phrase out unless the candidate rule intervenes.
function walkThroughPhrase() {
  const fractions = [0, 0.5, 0.9];
  let index = 0;

  return () => fractions[index++ % fractions.length];
}

describe("uniqueWords", () => {
  it("returns the words when every word differs", () => {
    assert.deepEqual(uniqueWords("interact with me"), words);
  });

  it("returns false when a word repeats", () => {
    assert.equal(uniqueWords("interact with interact"), false);
  });
});

describe("candidateWords", () => {
  it("excludes the final word when the noise would complete the phrase", () => {
    assert.deepEqual(candidateWords(words, ["me", "interact", "with"]), [
      "interact",
      "with",
    ]);
  });

  it("allows every word otherwise", () => {
    assert.deepEqual(candidateWords(words, ["interact", "me"]), words);
  });
});

describe("noiseWords", () => {
  it("returns enough words to reach the requested length once the phrase is inserted", () => {
    assert.equal(noiseWords(words, 40, walkThroughPhrase()).length, 37);
  });

  it("never contains the phrase", () => {
    const noise = noiseWords(words, 6, walkThroughPhrase());

    assert.deepEqual(noise, ["interact", "with", "with"]);
  });
});
