import Pagina from "./pagina.js" 
/* const Pagina = require("./pagina.js") */
 class Lista{
    constructor(quantPags = 0, paginas=[], paginaDisponivel = 0){
      this.quantPags = quantPags
      this.paginas = paginas
      this.paginaDisponivel = paginaDisponivel
      
    }

    addPagina(espaco, registros=[]){
        let novaPagina = new Pagina(espaco, registros)
        this.paginas.push(novaPagina)
        this.quantPags = this.quantPags + 1
        this.paginaDisponivel = this.quantPags - 1
    }

    checarPaginaDisponivel(){
        for(let i = 0; i<this.quantPags; i++){
            if(this.paginas[i].espaco > 0){
                this.paginaDisponivel = i
                break
            }
        }
    }

    corrigirLista(){
        for(let i=0; i < this.quantPags; i++){
            if((this.paginas[i].espaco > 0) && (i != (this.quantPags-1))){
                while(this.paginas[i].espaco > 0){
                    this.paginas[i].registros.push(this.paginas[this.quantPags-1].registros[0])
                    this.paginas[i].espaco--
                    this.paginas[this.quantPags-1].registros.shift()
                    this.paginas[this.quantPags-1].espaco++
                    if(this.paginas[this.quantPags-1].espaco == this.paginas[this.quantPags-1].espacoInicial){
                        this.paginas.pop()
                        this.quantPags--
                    }
                }
            }
        }
    }
}

export default Lista