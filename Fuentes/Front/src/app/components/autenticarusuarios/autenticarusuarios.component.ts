import { Component, OnInit } from '@angular/core';
import { AutenticarUsuarios } from 'src/app/services/autenticarusuarios.service';
import decode from 'jwt-decode'
import { usuario } from 'src/app/models/usuario';
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';

declare var M: any;
let cargando = true;

@Component({
  selector: 'app-autenticarusuarios',
  templateUrl: './autenticarusuarios.component.html',
  styleUrls: ['./autenticarusuarios.component.css']
})
export class AutenticarusuariosComponent implements OnInit {

  usuario_id: number;
  rol: number;
  usuarios: usuario[] = [];
  facultad:string;
  usuarioSelect: estudiante = {
    NOMBRE: "",
    APELLIDO: "",
    CORREO: "",
    CELULAR: 0,
    CODIGO: 0,
    SEMESTRE: 0,
    USUARIO_ID_USUARIO: 0,
    FACULTAD_ID_FACULTAD: 0,
    JORNADA_ID_JORNADA: 0,    
    ID_ESTUDIANTE: 0,
    FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO:0,
    ETAPA: 0
  };

  constructor(private autenticarUsuarioService: AutenticarUsuarios, private loginService: LoginService) { }

  ngOnInit() {
    this.getValidRol();
    this.getFacultades();
    this.getUsuarios();
  }
  getUsuarios(){
    cargando=true;
    if (this.rol == 1) {            //LIDER      
      this.autenticarUsuarioService.getAsesores()
        .subscribe(res => {
          this.usuarios = res as usuario[];    
          cargando=false;      
        })
    }
    else if (this.rol == 2) {       //ASESOR    
      this.autenticarUsuarioService.getEstudiantes()
        .subscribe(res => {
          this.usuarios = res as usuario[];    
          cargando=false;      
        })
    }
  }
  changeStatus(id_usuario :number , estado :any){
    this.autenticarUsuarioService.changeStatus(id_usuario, estado)
    .subscribe(
      (res) =>{console.log('respuesta changestatus',res);
                if(res['status']=== false){
                  
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO CAMBIANDO STATUS DE USUARIO</h4>
                        <p>Ocurrio un error en la base de datos, no se pudo actualizar el estado de el usuario.</p>
                        <hr>
                    </div>`});
                }
                else{
                  M.toast({
                    html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">CAMBIO EL STATUS DEL USUARIO</h4>
                        <p>El estado del usuario se ha cambiado correctamente.</p>
                        <hr>
                    </div>`});
                }
              },
      (err) =>{console.log('error changestatus',err);},
      ()=>{}
    )
  }

  detalles(id_usuario:number){    
    cargando=true;
    if (this.rol == 1) {            //LIDER       
      this.autenticarUsuarioService.getAsesorId(id_usuario)
        .subscribe(res => {          
          this.usuarioSelect = res[0] as estudiante;   
          this.facultad = this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == this.usuarioSelect.FACULTAD_ID_FACULTAD).NOMBRE_FACULTAD;
          cargando=false;            
        })
    }
    else if (this.rol == 2) {       //ASESOR    
      this.autenticarUsuarioService.getEstudianteId(id_usuario)
        .subscribe(res => { 
          this.usuarioSelect = res[0] as estudiante;  
          this.facultad = this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == this.usuarioSelect.FACULTAD_ID_FACULTAD).NOMBRE_FACULTAD;
          cargando=false;      
        })
    }
  }

  getFacultades() {
    this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];        
      })
  }
  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
    this.rol = parseInt(tokenPayload.rol_usuario);
  }

  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
