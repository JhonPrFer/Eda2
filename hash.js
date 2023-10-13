import {Pagina} from "./pagina"
import {Lista} from "./lista"

export default class Hash{
    constructor(contLista=0, listas=[], next=0, level=0, cargaMax, fatorCarga=0, m, espacoPagina){
        this.contLista = contLista
        this.listas = listas
        this.next = next
        this.level = level
        this.cargaMax = cargaMax
        this.fatorCarga = fatorCarga
        this.m = m
        this.limiteNext = (2 ** this.level * this.m) - 1
        this.espacoPagina = espacoPagina
    }
    
    addLista(quantPags=1, paginas = []){
        let novaLista = new Lista(quantPags, paginas)
        novaLista.addPagina(this.espacoPagina)
        this.listas.push(novaLista)
        this.contLista = this.contLista + 1
    }

    addRegistro(reg){
        let listaEscolhida = reg % ((2**this.level) * this.m)

        if(listaEscolhida >= this.next){
            if (listaEscolhida < this.contLista){           
                for(let i=0; i < this.contLista; i++){
                    if (i == listaEscolhida){
                        let adicionou = this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)

                        if( adicionou == false){
                            this.listas[i].addPagina(this.espacoPagina)
                        }
                    }
                }
            }else{

                while(listaEscolhida >= this.contLista){
                    this.addLista(this.espacoPagina)
                }

                for(let i=0; i < this.contLista; i++){
                    if (i == listaEscolhida){
                        let adicionou = this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)

                        if( adicionou == false){
                            this.listas[i].addPagina(this.espacoPagina)
                        }
                    }
                }  
            }

        }else{
            listaEscolhida = reg % ((2**(this.level+1)) * this.m)
            if (listaEscolhida < this.contLista){           
                for(let i=0; i < this.contLista; i++){
                    if (i == listaEscolhida){
                        let adicionou = this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)

                        if( adicionou == false){
                            this.listas[i].addPagina(this.espacoPagina)
                        }
                    }
                }

            }else{

                while(listaEscolhida >= this.contLista){
                    this.addLista(this.espacoPagina)
                }

                for(let i=0; i < this.contLista; i++){
                    if (i == listaEscolhida){
                        let adicionou = this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)

                        if( adicionou == false){
                            this.listas[i].addPagina(this.espacoPagina)
                        }
                    }
                }  
            }
        }

        this.fatorCarga = this.calcFatorCarga()

        //Quebra de pagina
        while(this.fatorCarga > this.cargaMax){
            if(this.next == this.limiteNext){
                this.next = 0
                this.level++
                this.limiteNext = ((2 ** this.level) * this.m  ) - 1            
            }else{
                this.next++
            }
            this.addLista(this.espacoPagina)
            this.redistriduir(this.next)
            this.listas[this.next].corrigirLista()
            this.fatorCarga = this.calcFatorCarga()
        }
    }

    calcFatorCarga(){
        let fatorCarga = 0
        let espacoTotal = 0
        this.listas.map((lista)=>{
            lista.map((pagina)=>{
                fatorCarga += pagina.espacoInicial - pagina.espaco
                espacoTotal += pagina.espacoInicial
            })
        })
        return fatorCarga / espacoTotal
    }

    redistriduir(list){
        this.listas[list].map((pag)=>{
            pag.map((reg)=>{
                pag.splice(pag.indeOf(reg), 1)
                pag.espaco++
                this.addRegistro(reg)
            })
        })
    }
}

