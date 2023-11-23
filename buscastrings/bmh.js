function boyerMooreHorspoolSearch(text, pattern, iteracao) {
  const occurrences = [];
  const textLength = text.length;
  const patternLength = pattern.length;

  // Construir tabela de salto para caracteres no padrão
  const badCharTable = {};
  for (let i = 0; i < patternLength - 1; i++) {
      badCharTable[pattern[i]] = patternLength;
  }

  // Preencher a tabela de salto com os valores corretos para os caracteres no padrão
  for (let i = 0; i < patternLength - 1; i++) {
      badCharTable[pattern[i]] = patternLength - 1 - i;
  }

  let i = 0;
  while (i <= textLength - patternLength) {
      let j = patternLength - 1;

      // Enquanto houver correspondência de caracteres
      while (j >= 0 && pattern[j] === text[i + j]) {
          j--;
          iteracao++;
      }

      // Se o padrão for encontrado, adicionar a ocorrência à lista
      if (j < 0) {
          occurrences.push(i);
      }

      // Mover a janela de busca com base na tabela de salto de caracteres
      i += badCharTable[text[i + patternLength - 1]] || patternLength;
  }

  return [occurrences, iteracao];
}

export default boyerMooreHorspoolSearch