import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { usuario } from 'src/app/models/usuario';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { proyecto } from 'src/app/models/proyecto';

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
  constructor(private loginService: LoginService, private subirarchivosService: SubirarchivosService) { }

  ngOnInit() {
    this.getProyectos();
    this.getFacultades();
    this.getDocentes();
  }
  getFacultades() {
    cargando = true;
    this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];
        cargando = false;
      })
  }
  getDocentes() {
    cargando = true;
    this.loginService.getDocentes()
      .subscribe(res => {
        this.docentes = res as usuario[];   
        cargando = false;     
      })
  }
  getProyectos() {
    cargando = true;
    this.subirarchivosService.getProyectos()
      .subscribe(res => {
        this.proyectos = res as proyecto[];
        this.inicio = res as proyecto[]; 
        cargando = false;
      })
  }
  getProyectosFacultad(id_facultad:number) {
    cargando = true;
    this.subirarchivosService.getProyectosFacultad(id_facultad)
      .subscribe(res => {
        this.proyectos = res as proyecto[];
        this.inicio = res as proyecto[];
        cargando = false;
      })
  }
  getProyectosDocente(id_usuario:number) {
    cargando = true;
    this.subirarchivosService.getProyectosDocente(id_usuario)
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
      this.getProyectos();
    }
  }
  changeFacultad(id_facultad: number) {
    if(id_facultad != 0){
      this.getProyectosFacultad(id_facultad);
      this.busqueda = 1;
    }
  }
  changeDocente(id_usuario: number) {
    if(id_usuario != 0){
      this.getProyectosDocente(id_usuario);
      this.busqueda = 1;
    }
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
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
