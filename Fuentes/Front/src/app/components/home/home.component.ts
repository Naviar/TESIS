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
  constructor() { }

  ngOnInit() {
    this.getValidRol();
  }
  getValidRol(){
    cargando=true;
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 
    this.condition = parseInt(tokenPayload.rol_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);    
    cargando=false;
         
  }
  yaCargo() {
    if (cargando == false) { 
      return false;
    } else {
      return true;
    }
  }
}
