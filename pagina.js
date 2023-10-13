export default class Pagina{
    constructor(espaco, registros=[]){
        this.espacoInicial = espaco
        this.espaco = espaco
        this.registros = registros
    }
    
    addRegistro(registro){
        this.registros.push(registro)
        this.espaco = this.espaco - 1

        if(this.espaco == 0){
            return false
        }
        
        return true
    }

}