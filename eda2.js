
import Hash from "./hash.js";

let chaves = [];
let p = [1];
//, 5, 10, 20, 50
let alphamax = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/* LinearHashing(chaves, p, alphamax); */

function LinearHashing(lista, p, alphamax){
  
p.map((pag)=>{
    for(let i = 0;i<10;i++){

        let lista = myRandomInts(1000 * pag, 1000 * pag * 10)

        
        lista.map(reg => {

        })

        let lista20 = my20(lista)
        let listaNot20 = mynot20(lista)

        alphamax.map( a =>{
            
        })
    }
  }
)}

let pInc = 10
let alphaInc = 0.85
let listaInc = myRandomInts(1000, 10000)
/* let listaInc = [42, 65, 75, 61, 64, 78,
  89, 92,  9, 15,  5, 87, 80,
73, 84, 13, 19, 30, 31 ] */

/* let listaInc = [8, 11, 10, 15, 17, 25, 44, 12] */
  
  console.log(listaInc)

let hash = new Hash (0.8, 2, 2)
listaInc.map((reg)=>{
  /* console.log(reg) */
  hash.addRegistro(reg)
})
/* hash.listas[2].corrigirLista1() */
hash.exibirHash() 


function myRandomInts(quantity, max){
    const arr = []
    while(arr.length < quantity){
      var candidateInt = Math.floor(Math.random() * max) + 1
      if(arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
  return(arr)
  }

function my20(list){
    const arr = []
    while(arr.length < Math.floor(list.length * 0.2)){
        var candidateInt = list[Math.floor(Math.random() * list.length)]
        if(arr.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
    return(arr)
}

function mynot20(list){
    const tam = list.length * 1.2
    const arr = []
    while(arr.length < list.length * 0.2){
        var candidateInt = Math.floor(Math.random() * tam) + 1
        if(arr.indexOf(candidateInt) === -1 && list.indexOf(candidateInt) === -1) arr.push(candidateInt)
    }
    return(arr)
}

