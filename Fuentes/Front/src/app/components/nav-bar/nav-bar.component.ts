import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { Router } from '@angular/router'

import decode from 'jwt-decode';
import { EtapaService } from 'src/app/services/etapa.service';
import { etapa_estudiante } from 'src/app/models/etapa_estudiante';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { convocatoria } from 'src/app/models/convocatoria';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  condition:number=0;
  plataforma:number=0;
  etapa_estudiante:etapa_estudiante;
  etapa: number;
  nombre_Usuario: any;
  rol: any;
  convocatoria:boolean=false;
  fecha_now : number = new Date().getTime();

  constructor(private loginService : LoginService, public subirarchivosService: SubirarchivosService, private etapaService : EtapaService,private router:Router) { }

  ngOnInit() {    
    this.getValidRol();
  }
  logout(){
    this.loginService.logout()
    .subscribe( (data)=>{
      localStorage.setItem('usuario', data['token']);
      console.log('Saliendo');
      this.router.navigate(['login'])
    });
  }
  getValidRol(){
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 
    this.condition = parseInt(tokenPayload.rol_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);
    this.nombre_Usuario = tokenPayload.nombre_usuario;
    console.log("ESTE ES EL ROL",this.condition);
    if(this.condition==3)
    {
      this.etapaService.getEtapa(tokenPayload.id_estudiante)
      .subscribe(res=>{
        this.etapa_estudiante = res as etapa_estudiante;
        this.etapa = this.etapa_estudiante.ETAPA;
      })
    }
    if(this.plataforma == 2){
      this.subirarchivosService.getCurrentAnnouncement()
      .subscribe(
        res => {
          this.subirarchivosService.convocatoria = res as convocatoria;
          localStorage.setItem('convocatoria',JSON.stringify(this.subirarchivosService.convocatoria));
          console.log(`convocatoria actual ${JSON.stringify(this.subirarchivosService.convocatoria)}`);
          if (this.fecha_now >= new Date(this.subirarchivosService.convocatoria.FECHA_INICIO).getTime() && this.fecha_now <= new Date(this.subirarchivosService.convocatoria.FECHA_FIN).getTime()){            
            this.convocatoria = true;
          }      
        }
      )
    } 
  }

}
