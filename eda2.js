
import Hash from "./hash.js";

let p = [2];
//1, , 10, 20, 50
let alphamax = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/* LinearHashing(chaves, p, alphamax); */



function LinearHashing() {

  p.map((pag) => {
    for (let i = 0; i < 1; i++) {
      let lista = myRandomInts(1000 * pag, 1000 * pag * 20)
      // let lista = [8, 11, 10, 15, 17, 25, 44, 12]
      // let listaInc = myRandomInts(1000, 10000)
      /* let lista = [47273, 32975, 22514, 34716, 44511, 21861,
        21635, 33591,  44482,  47272] */

      let hash = new Hash(0.8, 2, pag)

      console.time("Incluir");

      lista.map((reg, i) => {
        hash.addRegistro(reg)
        // hash.exibirHash()
/*         console.log(reg, i) */
      })

      console.timeEnd("Incluir");

      console.log(lista)

      console.time("Busca com sucesso");

      let lista20 = my20(lista)
      lista20.map(reg => {
        hash.buscar(reg)
      })

      console.timeEnd("Busca com sucesso");

      console.time("Busca sem sucesso");

      let listaNot20 = mynot20(lista)
      listaNot20.map(reg => {
        hash.buscar(reg)
      })

      console.timeEnd("Busca sem sucesso");

      alphamax.map( a =>{

      })
      hash.exibirHash() 
    }
  }
  )
}

LinearHashing()

// let pInc = 10
// let alphaInc = 0.85
// let listaInc = myRandomInts(1000, 10000)
/* let listaInc = [42, 65, 75, 61, 64, 78,
  89, 92,  9, 15,  5, 87, 80,
73, 84, 13, 19, 30, 31 ] */

/* let listaInc = [8, 11, 10, 15, 17, 25, 44, 12] */

// console.log(listaInc)

// let hash = new Hash (0.8, 2, 2)
// listaInc.map((reg)=>{
//   /* console.log(reg) */
//   hash.addRegistro(reg)
// })
/* hash.listas[2].corrigirLista1() */
// hash.exibirHash() 


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
  while (arr.length < Math.floor(list.length * 1)) {
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

