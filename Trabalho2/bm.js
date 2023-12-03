function boyerMooreSearch(text, pattern, it) {
    const occurrences = [];
    const textLength = text.length;
    const patternLength = pattern.length;

    const badCharTable = {};
    for (let i = 0; i < patternLength - 1; i++) {
        badCharTable[pattern[i]] = patternLength - 1 - i;
    }

    let i = 0;
    while (i <= textLength - patternLength) {
        let j = patternLength - 1;

        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
            it++;
        }
        if (j < 0) {
            occurrences.push(i);
            i += 1; 
        } else {
            const badCharSkip = badCharTable[text[i + j]] || patternLength;
            i += Math.max(1, badCharSkip - (patternLength - 1 - j));
            it++;
        }
    }

    return [occurrences, it];
}

export default boyerMooreSearch