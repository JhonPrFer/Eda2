import Hash from "./hash";
let chaves = [];
let p = [1];
//, 5, 10, 20, 50
let alphamax = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

/* LinearHashing(chaves, p, alphamax); */

function LinearHashing(lista, p, alphamax){
  
p.map((pag)=>{
    for(let i = 0;i<10;i++){

        let lista = myRandomInts(1000 * pag, 1000 * pag * 2)

        let lista20 = my20(lista)
        let listaNot20 = mynot20(lista)

        alphamax.map( a =>{
            
        })
    }
  }
)}

let pInc = 10
let alphaInc = 0.85
let listaInc = myRandomInts(10000, 20000)


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
  
let hash = new Hash (2, 0.2, 0, 1)
hash.addRegistro(1)
hash.addRegistro(2)
console.log(hash)