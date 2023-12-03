import boyerMooreSearch from './bm.js'
import boyerMooreHorspoolSearch from './bmh.js'
import kmpSearch from './kmp.js'
import rabinKarpSearch from './rk.js'

let alphabets = [
  ['a', 'b'],
  ['a', 'b', 'c', 'd'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '&']
]

let fullKMP = []
let fullBM = []
let fullBMH = []
let fullRK = []

for (let i = 0; i < 10; i++) {
  alphabets.forEach((alphabet, index) => {
    let somaKMP = []
    let somaBM = []
    let somaBMH = []
    let somaRK = []
    let text = ""

    for (let j = 0; j < 1000; j++) {
      let val = Number(Math.floor((Math.random() * alphabet.length)));
      text += alphabet[val];
    }

    let padroes = [2, 4, 6, 8, 10, 12, 14];
    padroes.forEach(patternLenght => {
      let pattern = text.slice(text.length - patternLenght, text.length)
      let it = 0
      let retorno = []

      retorno = kmpSearch(text, pattern, it)
      somaKMP.push(retorno[1] / 1000)

      it = 0
      retorno = boyerMooreSearch(text, pattern, it)
      somaBM.push(retorno[1] / 1000)

      it = 0
      retorno = boyerMooreHorspoolSearch(text, pattern, it)
      somaBMH.push(retorno[1] / 1000)

      it = 0
      retorno = rabinKarpSearch(text, pattern, it)
      somaRK.push(retorno[1] / 1000)
    })

    if (fullKMP.length < 4) {
      fullKMP.push(somaKMP)
    } else {
      somaKMP.forEach((element, i) => {
        fullKMP[index][i] += element
      });
    }

    if (fullBM.length < 4) {
      fullBM.push(somaBM)
    } else {
      somaBM.forEach((element, i) => {
        fullBM[index][i] += element
      });
    }

    if (fullBMH.length < 4) {
      fullBMH.push(somaBMH)
    } else {
      somaBMH.forEach((element, i) => {
        fullBMH[index][i] += element
      });
    }

    if (fullRK.length < 4) {
      fullRK.push(somaRK)
    } else {
      somaRK.forEach((element, i) => {
        fullRK[index][i] += element
      });
    }
  });
}

for (let i = 0; i < fullKMP.length; i++) {
  fullKMP[i].forEach((element, index) => {
    fullKMP[i][index] = element / 10
  });
}

for (let i = 0; i < fullBM.length; i++) {
  fullBM[i].forEach((element, index) => {
    fullBM[i][index] = element / 10
  });
}

for (let i = 0; i < fullBMH.length; i++) {
  fullBMH[i].forEach((element, index) => {
    fullBMH[i][index] = element / 10
  });
}

for (let i = 0; i < fullRK.length; i++) {
  fullRK[i].forEach((element, index) => {
    fullRK[i][index] = element / 10
  });
}

console.log("KMP: ", fullKMP)
console.log("BM: ", fullBM)
console.log("BMH: ", fullBMH)
console.log("RK: ", fullRK)