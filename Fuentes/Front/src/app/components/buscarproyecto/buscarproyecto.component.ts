import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { usuario } from 'src/app/models/usuario';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { proyecto } from 'src/app/models/proyecto';
import { documento } from 'src/app/models/documento';
import { stringify } from '@angular/core/src/util';

let cargando = true;

@Component({
  selector: 'app-buscarproyecto',
  templateUrl: './buscarproyecto.component.html',
  styleUrls: ['./buscarproyecto.component.css']
})
export class BuscarproyectoComponent implements OnInit {

  proyectos: proyecto[] = [];
  inicio: proyecto[] = [];
  docentes: usuario[] = [];
  busqueda: number = 0;
  URL_ActaReunion: string;
  URL_FormatoProyecto: string;
  URL_Caracterizacion: string;
  URL_LineaBase: string;
  URL_ActaInicio: string;
  URL_InformeInicial: string;
  URL_InformeFinal: string;
  URL_ActaFinal: string;
  URLS: string[] = [];
  existe: boolean[] = [];
  index: number = 0; 

  constructor(private loginService: LoginService, private subirarchivosService: SubirarchivosService) { }

  async ngOnInit() {
    await this.getProyectos();
    await this.getFacultades();
    await this.getDocumentos();
    await this.getDocentes();
  } 
  async getFacultades() {
    await this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];        
      })
  }
  async getDocentes() {    
    await this.loginService.getDocentes()
      .subscribe(res => {
        this.docentes = res as usuario[];
        cargando = false;
      })
  }
  async getProyectos() {
    cargando = true;
    await this.subirarchivosService.getProyectos()
      .subscribe(res => {
        this.proyectos = res as proyecto[];
        console.log(`proyectos ${JSON.stringify(this.proyectos)}`);
        // this.inicio = res as proyecto[];        
      })
  }
  async getProyectosFacultad(id_facultad: number) {
    cargando = true;
    await this.subirarchivosService.getProyectosFacultad(id_facultad)
      .subscribe(res => {
        this.proyectos = res as proyecto[];
        this.inicio = res as proyecto[];
        cargando = false;
      })
  }
  async getProyectosDocente(id_usuario: number) {
    cargando = true;
    await this.subirarchivosService.getProyectosDocente(id_usuario)
      .subscribe(res => {
        this.proyectos = res as proyecto[];
        this.inicio = res as proyecto[];
        cargando = false;
      })
  }
  changeStatus(filtro: number) {
    if (filtro == 2 || filtro == 3) {
      this.busqueda = 0;
      this.proyectos = [];
    }
    else if (filtro == 1) {
      this.busqueda = 1;
    }
  }
  changeFacultad(id_facultad: number) {
    if (id_facultad != 0) {
      this.getProyectosFacultad(id_facultad);
      this.busqueda = 1;
    }
  }
  changeDocente(id_usuario: number) {
    if (id_usuario != 0) {
      this.getProyectosDocente(id_usuario);
      this.busqueda = 1;
    }
  }
  async getDocumentos() {    
    await this.subirarchivosService.getDocumentos()
      .subscribe(res => {
        this.subirarchivosService.documentos = res as documento[];        
      })
  }
  buscar(input) {
    var busqueda: proyecto[] = [], i;
    var look = 0;
    for (i = 0; i < this.inicio.length; i++) {
      if (this.inicio[i].NOMBRE_PROYECTO.toUpperCase().indexOf(input.toUpperCase()) > -1) {
        busqueda.push(this.inicio[i]);
        this.proyectos = busqueda;
        look++;
      }
      if (look < 1) {
        this.proyectos = [];
      }
    }
  }
  buscarArchivo(nombreArchivo: string, i:number) {
    cargando = true;
    let referencia = this.subirarchivosService.getUrlArchivo(nombreArchivo);
    referencia.getDownloadURL().subscribe((URL) => {
      cargando = false;      
      this.URLS[i] = URL;
      this.existe[i]=true;      
    },
      (error) => {
        cargando = false;
        this.URLS[i] = "error";    
        this.existe[i]=false;    
      });  
  }
  
  detalles(nombre: string) {
    cargando=true;
    for(this.index=0; this.index < this.subirarchivosService.documentos.length; this.index++){
      this.buscarArchivo(this.subirarchivosService.documentos[this.index].NOMBRE_DOCUMENTO + "_" + nombre + ".docx", this.index);      
      if(this.index==this.subirarchivosService.documentos.length-1){
        cargando=false;
      }
    }
  }
  resetModal(){
    this.URLS=[];
    this.existe=[];
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
