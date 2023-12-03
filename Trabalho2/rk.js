function rabinKarpSearch(text, pattern, it) {
  const prime = 101;
  const base = 256;
  const textLength = text.length;
  const patternLength = pattern.length;
  const result = [];

  function calculateHash(str, length) {
      let hash = 0;
      for (let i = 0; i < length; i++) {
          hash = (hash * base + str.charCodeAt(i)) % prime;
      }
      return hash;
  }

  function updateHash(hash, oldChar, newChar, power) {
      hash = (hash - (oldChar.charCodeAt(0) * power) % prime + prime) % prime;
      hash = (hash * base + newChar.charCodeAt(0)) % prime;
      return hash;
  }

  const patternHash = calculateHash(pattern, patternLength);
  let textHash = calculateHash(text, patternLength);
  let power = 1;

  for (let i = 0; i < patternLength - 1; i++) {
      power = (power * base) % prime;
  }

  for (let i = 0; i <= textLength - patternLength; i++) {
      if (textHash === patternHash) {
        it++;
          let match = true;
          for (let j = 0; j < patternLength; j++) {
              if (text[i + j] !== pattern[j]) {
                  match = false;
                  break;
              }
          }
          if (match) {
              result.push(i); 
          }
      }

      if (i < textLength - patternLength) {
          textHash = updateHash(textHash, text[i], text[i + patternLength], power);
          it++;
      }
  }

  return [result, it];
}

export default rabinKarpSearch