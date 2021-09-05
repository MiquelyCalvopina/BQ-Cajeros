export class Cliente{
    cuentaId!:String
    tipoIdentificacion!:String
    apellidoPaterno!:String
    apellidoMaterno!:String
    nombre1!:String
    nombre2!:String
    provincia!:String
    canton!:String
    parroquia!:String
    direccion!:String
    telefono!:String
    email!:String
    fechaNacimiento!:Date
    estadoCivil!:String
    estado!:String
    nombres:String=this.nombre1+''+this.nombre2


}