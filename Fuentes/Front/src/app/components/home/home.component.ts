import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import decode from 'jwt-decode'
import { SubirarchivosService } from '../../services/subirarchivos.service';
import { convocatoria } from '../../models/convocatoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  condition:number;
  plataforma: number;
  constructor(private subirArchivoService : SubirarchivosService) { }

  ngOnInit() {
    this.getValidRol();
  }
  getValidRol(){
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 
    this.condition = parseInt(tokenPayload.rol_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);
    if(this.plataforma === 2){
      this.subirArchivoService.getCurrentAnnouncement()
      .subscribe(
        res => {
          this.subirArchivoService.convocatoria = res as convocatoria;
          console.log(`convocatoria actual ${JSON.stringify(this.subirArchivoService.convocatoria)}`);
          localStorage.setItem('convocatoria',JSON.stringify(this.subirArchivoService.convocatoria));
        }
      )
    }     
  }
}
