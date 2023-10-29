
import Hash from "./hash.js";

let p = [1, 5, 10, 20, 50];
let alphamax = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
// 

function LinearHashing() {

  let arr = []
  p.map((pag) => {

    for (let i = 0; i < 1; i++) {
      let lista = myRandomInts(1000 * pag, 1000 * pag * 20)
      // let lista20 = my20(lista)
      // let listaNot20 = mynot20(lista)
      let arrAlfa = []
      alphamax.map((a) => {
        let hash = new Hash(a, 2, pag)
        lista.map(reg => {
          hash.addRegistro(reg)
        })


        // console.log("fator de carga : " + a)

        // console.log('alfa médio : ' + hash.cargaMedia().toFixed(4))
        // console.log('p* : ' + hash.pAsterisco().toFixed(4)) 

        let C = 0
        lista20.map(reg => {
          C += hash.buscar(reg)
        })
        /* console.log("Busca com sucesso : " + C / lista20.length) */

        let S = 0
        listaNot20.map(reg => {
          S += hash.buscar(reg)
        })
        // console.log("Busca sem sucesso : " + S / listaNot20.length)

        let Obj = {
          p: pag,
          fatorCargaMax: a,
          alfaMedio: hash.cargaMedia().toFixed(4),
          pAsterisco: hash.pAsterisco().toFixed(4),
          buscaComSucesso: C / lista20.length,
          buscaSemSucesso: S / listaNot20.length
        }
        arrAlfa.push(Obj)

        /* console.log("") */
      })
      arr.push(arrAlfa)
    }

  })

  // console.log(arr)

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j <  arr[i].length ; j++) {
      console.log("tamP: " + arr[i][j].p)
      console.log("Carga: " + arr[i][j].fatorCargaMax)
      console.log("Carga media: " + arr[i][j].alfaMedio)
      console.log("p*: " + arr[i][j].pAsterisco)
      console.log("Busca com sucesso: " + arr[i][j].buscaComSucesso)
      console.log("Busca sem sucesso: " + arr[i][j].buscaSemSucesso)
      console.log("")
    }
  }

  // for (let i = 0; i < alphamax.length; i++) {
  //   let cargaMedia = 0
  //   let pMedia = 0
  //   let BuscaS = 0
  //   let BuscaNS = 0
  //   for (let j = 0; j < p.length; j++) {
  //     cargaMedia += Number(arr[j][i].alfaMedio)
  //     pMedia += Number(arr[j][i].pAsterisco)
  //     BuscaS += Number(arr[j][i].buscaComSucesso)
  //     BuscaNS += Number(arr[j][i].buscaSemSucesso)
  //   }
  //   console.log("Carga média: " + (cargaMedia / p.length).toFixed(4))
  //   console.log("p* média: " + (pMedia / p.length).toFixed(4))
  //   console.log("Busca com sucesso média: " + (BuscaS / p.length).toFixed(4))
  //   console.log("Busca sem sucesso média: " + (BuscaNS / p.length).toFixed(4))
  //   console.log("")
  // }
  /* cargaMedia = cargaMedia / arr.length
  console.log("Carga média: " + cargaMedia.toFixed(4)) */
}

LinearHashing()

let listaInc = myRandomInts(10000, 60000)

let hash = new Hash(0.85, 2, 10)

let carga = []
let pA = []
let lMax = []

listaInc.map((reg) => {
  hash.addRegistro(reg)
  carga.push(hash.cargaMedia().toFixed(2))
  pA.push(hash.pAsterisco().toFixed(2))
  lMax.push(hash.lMax())
})

console.log(carga.toString())
console.log(pA.toString())
console.log(lMax.toString())


function myRandomInts(quantity, max) {
  const arr = []
  while (arr.length < quantity) {
    var candidateInt = Math.floor(Math.random() * max) + 1
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
  }
  return (arr)
}

function my20(list) {
  const arr = []
  while (arr.length < Math.floor(list.length * 0.2)) {
    var candidateInt = list[Math.floor(Math.random() * list.length)]
    if (arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
  }
  return (arr)
}

function mynot20(list) {
  const tam = list.length * 3
  const arr = []
  while (arr.length < list.length * 0.2) {
    var candidateInt = Math.floor(Math.random() * tam) + 1
    if (arr.indexOf(candidateInt) === -1 && list.indexOf(candidateInt) === -1) arr.push(candidateInt)
  }
  return (arr)
}

