import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import decode from 'jwt-decode';
import { EtapaService } from './etapa.service';

@Injectable({
  providedIn: 'root'
})
export class GuardFindFiles {

  constructor( public auth: LoginService, public etapaService: EtapaService, public router: Router ) {
    this.getValidRol();
   }
   plataforma:number;
   usuario_id: number;
   estudiante_id: number;
   rol: number;
   etapa: number;

  canActivate(): boolean {    
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);      
      return false; 
    }
    else if (this.plataforma == 2) 
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