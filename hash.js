//import {Pagina} from "./pagina.js"
import Lista from "./lista.js"
/* const Lista = require("./lista.js") */

class Hash {
    constructor(cargaMax, m, espacoPagina, contLista = 0, listas = [], next = 0, level = 0, fatorCarga = 0) {
        this.contLista = contLista
        this.listas = listas
        this.next = next
        this.level = level
        this.cargaMax = cargaMax
        this.fatorCarga = fatorCarga
        this.m = m // Numero inicial de listas 
        this.limiteNext = (2 ** this.level * this.m) - 1
        this.espacoPagina = espacoPagina
    }

    addLista() {
        let novaLista = new Lista()
        novaLista.addPagina(this.espacoPagina)
        this.listas.push(novaLista)
        this.contLista = this.contLista + 1
    }

    addRegistro(reg) {
        if (this.contLista == 0) {
            for (let i = 0; i < this.m; i++) {
                this.addLista(this.espacoPagina)
            }
        }
        
        let listaEscolhida = reg % ((2 ** this.level) * this.m)
        console.log(this.next, listaEscolhida)

        //refactor
        if (listaEscolhida < this.next) {
            listaEscolhida = reg % ((2 ** (this.level + 1)) * this.m)
        }
        
        while (listaEscolhida >= this.contLista) {
            this.addLista(this.espacoPagina)
        }

        for (let i = 0; i < this.contLista; i++) {
            if (i == listaEscolhida) {
                if (this.listas[i].paginas[this.listas[i].paginaDisponivel].espaco == 0) {
                    this.listas[i].addPagina(this.espacoPagina)
                }
                
                this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)
            }
        }
        
        // if (listaEscolhida >= this.next) {
        //     if (listaEscolhida < this.contLista) {
        //         for (let i = 0; i < this.contLista; i++) {
        //             if (i == listaEscolhida) {
        //                 if (this.listas[i].paginas[this.listas[i].paginaDisponivel].espaco == 0) {
        //                     this.listas[i].addPagina(this.espacoPagina)
        //                 }
                        
        //                 this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)
        //             }
        //         }
        //     } else {
                
        //         while (listaEscolhida >= this.contLista) {
        //             this.addLista(this.espacoPagina)
        //             /* console.log("Lista adicionada" , listaEscolhida) */
        //         }
                
        //         for (let i = 0; i < this.contLista; i++) {
        //             if (i == listaEscolhida) {
        //                 if (this.listas[i].paginas[this.listas[i].paginaDisponivel].espaco == 0) {
        //                     this.listas[i].addPagina(this.espacoPagina)
        //                 }
                        
        //                 this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)
        //             }
        //         }
        //     }
            
        // } else {
        //     listaEscolhida = reg % ((2 ** (this.level + 1)) * this.m)
        //     if (listaEscolhida < this.contLista) {
        //         for (let i = 0; i < this.contLista; i++) {
        //             if (i == listaEscolhida) {
        //                 if (this.listas[i].paginas[this.listas[i].paginaDisponivel].espaco == 0) {
        //                     this.listas[i].addPagina(this.espacoPagina)
        //                 }
                        
        //                 this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)
        //             }
        //         }
                
        //     } else {
                
        //         while (listaEscolhida >= this.contLista) {
        //             this.addLista(this.espacoPagina)
        //         }
                
        //         for (let i = 0; i < this.contLista; i++) {
        //             if (i == listaEscolhida) {
        //                 if (this.listas[i].paginas[this.listas[i].paginaDisponivel].espaco == 0) {
        //                     this.listas[i].addPagina(this.espacoPagina)
        //                 }
                        
        //                 this.listas[i].paginas[this.listas[i].paginaDisponivel].addRegistro(reg)
        //             }
        //         }
        //     }
        // }
        this.fatorCarga = this.calcFatorCarga()
        while (this.fatorCarga > this.cargaMax) {
            /*  console.log(reg, this.fatorCarga, this.next, this.limiteNext) */
            this.addLista()
            if (this.next == this.limiteNext) {
                this.level++
                this.redistriduir(this.next + 1)
                this.listas[this.next].corrigirLista()
                this.next = 0
            } else {
                this.next++
                this.redistriduir(this.next)
                this.listas[this.next - 1].corrigirLista()
            }
            this.limiteNext = ((2 ** this.level) * this.m) - 1
            this.fatorCarga = this.calcFatorCarga()
            
        }

    }
    
    calcFatorCarga() {
        let fatorCarga = 0
        let espacoTotal = 0
        this.listas.map((lista) => {
            lista.paginas.map((pagina) => {
                fatorCarga += pagina.espacoInicial - pagina.espaco
                espacoTotal += pagina.espacoInicial
            })
        })
        return fatorCarga / espacoTotal
    }

    redistriduir(list) {
        list = list  - 1
        list < 0 ? list = 0: list = list 
        this.listas[list].paginas.map((pag) => {
            for(let i = 0; i < pag.registros.length; i++) {
                if (pag.registros[i] % ((2 ** (this.level + 1)) * this.m) != list) {
                    let reg = pag.registros[i]
                    pag.registros.splice(i, 1)
                    i--
                    pag.espaco++
                    listaEscolhida = reg % ((2 ** (this.level + 1)) * this.m)
                } 
            }  
        })
    }

    exibirHash() {
        console.log("Valor de n: ", this.next)
        console.log("Valor de l: ", this.level)
        console.log("Fator de carga: ", this.fatorCarga)
        console.log("Fator de carga maximo: ", this.cargaMax)

        for (let i = 0; i < this.contLista; i++) {
            console.log("Lista", i)
            this.listas[i].paginas.forEach((pag) => { console.log(pag.registros) })
            console.log()
        }
    }

    buscar(reg) {
        let lista = reg % ((2 ** (this.level)) * this.m)

        if (lista < this.next) {
            lista = reg % ((2 ** (this.level + 1)) * this.m)
        }

        this.listas[lista].paginas.forEach((pag) => {
            if (reg in pag) {
                console.log("Registro encontado")
                return true
            }
        })

        console.log("Registro não encontado")
        return false
    }

}


export default Hash
