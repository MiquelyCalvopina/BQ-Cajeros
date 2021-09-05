export class Client {  
    id!: string
    tipoIdentificacion!: string
    identificacion!: string
    apellidoPaterno!: string
    apellidoMaterno!: string
    nombre1!: string
    nombre2!: string
    provincia!: string
    canton!: string
    parroquia!: string
    direccion!: string
    telefono!: string
    email!: string
    fechaNacimiento!: string
    estadoCivil!: string
    estadoBancaWeb!: string
    estado!: string
    
    constructor(){
        this.id = "",
        this.tipoIdentificacion = "",
        this.identificacion = "",
        this.apellidoPaterno = "",
        this.apellidoMaterno = "",
        this.nombre1 = "",
        this.nombre2 = "",
        this.provincia = "",
        this.canton = "",
        this.parroquia = "",
        this.direccion = "",
        this.telefono = "",
        this.email = "",
        this.fechaNacimiento = "",
        this.estadoCivil = "",
        this.estadoBancaWeb = "",
        this.estado = ""
    }
}
