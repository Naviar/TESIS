import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
import decode from 'jwt-decode';
import { EtapaService } from './etapa.service';
import { etapa } from '../models/etapa';

@Injectable({
  providedIn: 'root'
})
export class GuardScheduleAdvice {

    constructor( public auth: LoginService, public etapaService: EtapaService, public router: Router ) {
    
    }
 
    usuario_id: number;
    estudiante_id: number;
    rol: number;
    etapa: etapa ={
     ID_ETAPA: "",
     NOMBRE_ETAPA: "",
     ETAPA: 9
    };
    rta: boolean;
    temp: boolean;
 
   canActivate():boolean { 
     
     if (!this.auth.isAuthenticated()) {
       this.router.navigate(['login']);      
       return false; 
     }
     else 
     {        
        this.rta=  this.getValidRol();
        return this.rta;
     }
     
   }
 
   getValidRol() :boolean{
     const token = localStorage.getItem('usuario');
     const tokenPayload = decode(token);
     this.usuario_id = parseInt(tokenPayload.id_usuario);
     this.rol = parseInt(tokenPayload.rol_usuario);
     if (this.rol==3)
     {
         this.estudiante_id = parseInt(tokenPayload.id_estudiante);
         this.etapaService.getEtapa(this.estudiante_id)
         .subscribe(
           (res) => {
             console.log('la respuesta de getetapa', res);
             this.etapa = res as etapa;            
             console.log('la respuesta de getetap WTFa', this.etapa.ETAPA);
             if (this.etapa.ETAPA==3){
                 this.temp = true;
             }
             else
             {
                 this.router.navigate(['login']);  
                 this.temp= false;
             }
           },
           (err) => { console.log('error intentando hacer el get etapa:', err); }
         )
         return this.temp;
 
     } 
   }
 }