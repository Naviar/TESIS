import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import decode from 'jwt-decode'
import { SubirarchivosService } from '../../services/subirarchivos.service';
import { convocatoria } from 'src/app/models/convocatoria';

let cargando = true;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  condition:number;
  plataforma: number;
  nombreArchivo: string = "MIA.pdf";
  URLMIA : string;
  existe: boolean = false;

  constructor(public subirarchivosService: SubirarchivosService) { }

  ngOnInit() {
    this.getValidRol();
  }
  getValidRol(){
    cargando=true;
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 
    this.condition = parseInt(tokenPayload.rol_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);    
    this.buscarArchivo();
         
  }
  buscarArchivo() {
    cargando = true;
    let referencia = this.subirarchivosService.getUrlArchivo(this.nombreArchivo);
    referencia.getDownloadURL().subscribe((URL) => {
      this.URLMIA = URL;      
      this.existe = true;
      cargando = false;
    },
      (error) => {
        this.existe = false;
        cargando = false;
      });
  }
  yaCargo() {
    if (cargando == false) { 
      return false;
    } else {
      return true;
    }
  }
}

