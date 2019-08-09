import { Component, OnInit } from '@angular/core';
import { AutenticarUsuarios } from 'src/app/services/autenticarusuarios.service';
import decode from 'jwt-decode'
import { usuario } from 'src/app/models/usuario';
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { FormGroup, FormBuilder } from '@angular/forms';


declare var M: any;
let cargando = true;

@Component({
  selector: 'app-autenticarusuarios',
  templateUrl: './autenticarusuarios.component.html',
  styleUrls: ['./autenticarusuarios.component.css']
})
export class AutenticarusuariosComponent implements OnInit {
  
  condicion:number;
  inicio: usuario[] = [];
  usuario_id: number;
  rol: number;
  usuarios: usuario[] = [];
  facultad: string;
  usuarioSelect: estudiante = {
    NOMBRE: "",
    APELLIDO: "",
    CORREO: "",
    CELULAR: undefined,
    CODIGO: undefined,
    SEMESTRE: undefined,
    USUARIO_ID_USUARIO: undefined,
    FACULTAD_ID_FACULTAD: undefined,
    JORNADA_ID_JORNADA: undefined,
    ID_ESTUDIANTE: undefined,
    FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO: undefined,
    ETAPA: undefined
  };

  constructor(private autenticarUsuarioService: AutenticarUsuarios, private loginService: LoginService) {    
   }

  ngOnInit() {
    this.getValidRol();
    this.getFacultades();
    this.getUsuarios();
  }


  getUsuarios() {
    cargando = true;
    // if (this.rol == 1) {            //LIDER      
    //   this.autenticarUsuarioService.getAsesores()
    //     .subscribe(res => {
    //       this.usuarios = res as usuario[]; 
    //       this.inicio = res as usuario[];   
    //       cargando=false;      
    //     })
    // }
    // else if (this.rol == 2) {       //ASESOR    
    //   this.autenticarUsuarioService.getEstudiantes()
    //     .subscribe(res => {
    //       this.usuarios = res as usuario[];    
    //       this.inicio = res as usuario[];
    //       cargando=false;      
    //     })
    // }
    this.autenticarUsuarioService.geUsuarios()
      .subscribe(res => {
        this.usuarios = res as usuario[];
        this.inicio = res as usuario[];
        cargando = false;
      })
  }
  changeStatus(id_usuario: number, estado: any) {
    this.autenticarUsuarioService.changeStatus(id_usuario, estado)
      .subscribe(
        (res) => {
          console.log('respuesta changestatus', res);
          if (res['status'] === false) {

            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO CAMBIANDO STATUS DE USUARIO</h4>
                        <p>Ocurrio un error en la base de datos, no se pudo actualizar el estado de el usuario.</p>
                        <hr>
                    </div>`});
          }
          else {
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">CAMBIO EL STATUS DEL USUARIO</h4>
                        <p>El estado del usuario se ha cambiado correctamente.</p>
                        <hr>
                    </div>`});
          }
        },
        (err) => { console.log('error changestatus', err); },
        () => { }
      )
  }

  detalles(id_usuario: number, rol_usuario: number) {
    cargando = true;
    if (rol_usuario == 2) {            //LIDER       
      this.condicion=1;
      this.autenticarUsuarioService.getAsesorId(id_usuario)
        .subscribe(res => {
          this.usuarioSelect = res[0] as estudiante;
          this.facultad = this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == this.usuarioSelect.FACULTAD_ID_FACULTAD).NOMBRE_FACULTAD;
          cargando = false;
        })
    }
    else if (rol_usuario == 3) {       //ASESOR    
      this.condicion=2;      
      this.autenticarUsuarioService.getEstudianteId(id_usuario)
        .subscribe(res => {
          this.usuarioSelect = res[0] as estudiante;
          this.facultad = this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == this.usuarioSelect.FACULTAD_ID_FACULTAD).NOMBRE_FACULTAD;
          cargando = false;
        })
    }
  }

  getFacultades() {
    this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];
      })
  }
  buscar(input, select) {    
    var busqueda: usuario[] = [], i;
    var look = 0;
    for (i = 0; i < this.inicio.length; i++) {
      if (select == 1) {
        if (this.inicio[i].NOMBRE.toUpperCase().indexOf(input.toUpperCase()) > -1) {
          busqueda.push(this.inicio[i]);
          this.usuarios = busqueda;          
          look++;
        }
        if (look < 1) {
          this.usuarios = [];
        }
      }
      else if (select == 2) {
        if (this.inicio[i].APELLIDO.toUpperCase().indexOf(input.toUpperCase()) > -1) {
          busqueda.push(this.inicio[i]);
          this.usuarios = busqueda;          
          look++;
        }
        if (look < 1) {
          this.usuarios = [];
        }
      }
    }
  }
  resetModal() {
    console.log("T-T");
    this.usuarioSelect= {
      NOMBRE: "",
      APELLIDO: "",
      CORREO: "",
      CELULAR: undefined,
      CODIGO: undefined,
      SEMESTRE: undefined,
      USUARIO_ID_USUARIO: undefined,
      FACULTAD_ID_FACULTAD: undefined,
      JORNADA_ID_JORNADA: undefined,
      ID_ESTUDIANTE: undefined,
      FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO: undefined,
      ETAPA: undefined
    }  
    this.facultad = ""; 
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
