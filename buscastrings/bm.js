function boyerMooreSearch(text, pattern, iteracao) {
    const occurrences = [];
    const textLength = text.length;
    const patternLength = pattern.length;

    // Construir tabela de salto para caracteres no padrão
    const badCharTable = {};
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
            i += 1; // Mover para a próxima posição para buscar outras ocorrências
        } else {
            // Mover a janela de busca
            const badCharSkip = badCharTable[text[i + j]] || patternLength;
            i += Math.max(1, badCharSkip - (patternLength - 1 - j));
            iteracao++;
        }
    }

    return [occurrences, iteracao];
}

export default boyerMooreSearch