export class Usuario {

   
    public id_usuario: number;
    public nombre_usuario :string;
    public rol_usuario :number;

    constructor(
        nombre_usuario:string,
        id_usuario :number,
        rol_usuario : number,
        
    ){
        this.nombre_usuario = nombre_usuario;
        this.id_usuario = id_usuario;
        this.rol_usuario = rol_usuario;
    }
}