import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  candidateWords,
  hasUniqueWords,
  noiseWords,
  searchLength,
  splitWords,
} from "./search_text.js";

const words = ["interact", "with", "me"];

// Picks the first candidate, then the second, then the third, which spells
// the phrase out unless the candidate rule intervenes.
function walkThroughPhrase() {
  const fractions = [0, 0.5, 0.9];
  let index = 0;

  return () => fractions[index++ % fractions.length];
}

describe("splitWords", () => {
  it("splits the phrase on spaces", () => {
    assert.deepEqual(splitWords("interact with me"), words);
  });

  it("ignores repeated and surrounding whitespace", () => {
    assert.deepEqual(splitWords("  interact   with\tme \n"), words);
  });

  it("returns no words for a blank phrase", () => {
    assert.deepEqual(splitWords("   "), []);
  });
});

describe("hasUniqueWords", () => {
  it("is true when every word differs", () => {
    assert.equal(hasUniqueWords(words), true);
  });

  it("is false when a word repeats", () => {
    assert.equal(hasUniqueWords(["interact", "with", "interact"]), false);
  });
});

describe("searchLength", () => {
  it("uses the requested length", () => {
    assert.equal(searchLength("10", 3), 10);
  });

  it("falls back to the minimum when the length is blank", () => {
    assert.equal(searchLength("", 3), 3);
  });

  it("falls back to the minimum when the length is not a number", () => {
    assert.equal(searchLength("lots", 3), 3);
  });

  it("raises a length below the minimum", () => {
    assert.equal(searchLength("2", 3), 3);
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

  it("allows no word at all when the phrase is a single word", () => {
    assert.deepEqual(candidateWords(["interact"], ["interact"]), []);
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

  it("adds no words when none can safely follow", () => {
    assert.deepEqual(noiseWords(["interact"], 20, walkThroughPhrase()), []);
  });
});
