function boyerMooreHorspoolSearch(text, pattern, iteracao) {
  const occurrences = [];
  const textLength = text.length;
  const patternLength = pattern.length;

  const badCharTable = {};
  for (let i = 0; i < patternLength - 1; i++) {
      badCharTable[pattern[i]] = patternLength;
  }

  for (let i = 0; i < patternLength - 1; i++) {
      badCharTable[pattern[i]] = patternLength - 1 - i;
  }

  let i = 0;
  while (i <= textLength - patternLength) {
      let j = patternLength - 1;

      while (j >= 0 && pattern[j] === text[i + j]) {
          j--;
          iteracao++;
      }

      if (j < 0) {
          occurrences.push(i);
      }

      i += badCharTable[text[i + patternLength - 1]] || patternLength;
  }

  return [occurrences, iteracao];
}

export default boyerMooreHorspoolSearch