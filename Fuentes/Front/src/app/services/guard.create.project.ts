import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import decode from 'jwt-decode';
import { EtapaService } from './etapa.service';
import { SubirarchivosService } from './subirarchivos.service';

@Injectable({
  providedIn: 'root'
})
export class GuardCreateProject {

  constructor( public auth: LoginService, public etapaService: EtapaService, public subirarchivosService: SubirarchivosService, public router: Router ) {
    this.getValidRol();
   }
   plataforma:number;
   usuario_id: number;
   estudiante_id: number;
   rol: number;
   etapa: number;
   fecha_now : number = new Date().getTime();

  canActivate(): boolean { 
    console.log("now", this.fecha_now);
    console.log("inicio", new Date(JSON.parse(localStorage.getItem('convocatoria')).FECHA_INICIO).getTime());
    console.log("fin", new Date(JSON.parse(localStorage.getItem('convocatoria')).FECHA_FIN).getTime());
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);      
      return false; 
    }
    else if (this.plataforma == 2 && (this.rol==2 || this.rol==3) && this.fecha_now >= new Date(JSON.parse(localStorage.getItem('convocatoria')).FECHA_INICIO).getTime() && this.fecha_now <= new Date(JSON.parse(localStorage.getItem('convocatoria')).FECHA_FIN).getTime() ) 
    {        
      return true; 
    }
    else 
    {        
        this.router.navigate(['login']);
        return false;
    }
    
  }

  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);
    this.rol = parseInt(tokenPayload.rol_usuario);

  }
}