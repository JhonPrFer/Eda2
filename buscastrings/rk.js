function rabinKarpSearch(text, pattern, iteracao) {
  const prime = 101; // Número primo para cálculos de hash
  const base = 256; // Base para cálculos de hash
  const textLength = text.length;
  const patternLength = pattern.length;
  const result = [];

  // Função para calcular o hash de uma string
  function calculateHash(str, length) {
      let hash = 0;
      for (let i = 0; i < length; i++) {
          hash = (hash * base + str.charCodeAt(i)) % prime;
      }
      return hash;
  }

  // Função para atualizar o hash durante a busca
  function updateHash(hash, oldChar, newChar, power) {
      hash = (hash - (oldChar.charCodeAt(0) * power) % prime + prime) % prime;
      hash = (hash * base + newChar.charCodeAt(0)) % prime;
      return hash;
  }

  // Calcular hash do padrão e da primeira janela do texto
  const patternHash = calculateHash(pattern, patternLength);
  let textHash = calculateHash(text, patternLength);
  let power = 1;

  // Calcular base^patternLength % prime para atualizações rápidas
  for (let i = 0; i < patternLength - 1; i++) {
      power = (power * base) % prime;
  }

  // Iterar sobre o texto
  for (let i = 0; i <= textLength - patternLength; i++) {
      // Verificar se o hash do texto é igual ao hash do padrão
      if (textHash === patternHash) {
        iteracao++;
          // Verificar caracteres individualmente em caso de colisão de hash
          let match = true;
          for (let j = 0; j < patternLength; j++) {
              if (text[i + j] !== pattern[j]) {
                  match = false;
                  break;
              }
          }
          if (match) {
              result.push(i); // Adicionar posição da ocorrência
          }
      }

      // Atualizar o hash para a próxima janela do texto
      if (i < textLength - patternLength) {
          textHash = updateHash(textHash, text[i], text[i + patternLength], power);
          iteracao++;
      }
  }

  return [result, iteracao];
}

export default rabinKarpSearch