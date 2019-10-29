import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {login} from '../models/login'
import {register} from '../models/register'
import { JwtHelperService } from '@auth0/angular-jwt';
import {rol} from '../models/rol'
import { facultad } from '../models/facultad';
import { jornada } from '../models/jornada';
import {asesor} from '../models/asesor';
import {estudiante} from '../models/estudiante'
import { Usuario } from '../classes/usuario';
import { usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  registro: register[];
  roles: rol[];
  
  facultades: facultad[];
  docentes: usuario[];
  jornadas: jornada[];
  readonly URL_API = 'http://localhost:3500/usuario';  
  helper = new JwtHelperService();

  constructor(private http: HttpClient) { }
  logout(){
    return this.http.get(this.URL_API+'/logout');
  }
  authentication(usuario:login){
    return this.http.post(this.URL_API + '/login', usuario);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('usuario');
    return !this.helper.isTokenExpired(token);
  }
  getIdUsuarioDuplicado(){
  return this.http.get(this.URL_API+"/idusuario");
  }
  register(usuario:register){    
    return this.http.post(this.URL_API + '/register', usuario);
  }
  getRoles(){
    return this.http.get(this.URL_API+"/roles");
  }
  getFacultades(){
    return this.http.get(this.URL_API+"/facultades");
  }
  getDocentes(){
    return this.http.get(this.URL_API+"/docentes");
  }
  getDocentesWithProjects(){
    return this.http.get(this.URL_API+'/docentesWithProjects')
  }
  getJornadas(){
    return this.http.get(this.URL_API+"/jornadas");
  }
  getIdUsuario(correo:string){
    return this.http.get(this.URL_API+"/id"+`/${correo}`);
  }
  registerAsesor(asesor: asesor){        
    return this.http.post(this.URL_API + '/registerAsesor', asesor);
  }
  registerDecano(decano: asesor){        
    return this.http.post(this.URL_API + '/registerDecano', decano);
  }
  registerEstudiante(estudiante: estudiante){        
    return this.http.post(this.URL_API + '/registerEstudiante', estudiante);
  }
  usuarioDuplicado(usuario:register){
    return this.http.post(this.URL_API + '/usuarioDuplicado', usuario);
  }
  estudianteDuplicado(usuario:estudiante){    
    return this.http.post(this.URL_API + '/estudianteDuplicado', usuario);
  }
  recoveryPassword(recovery:any){    
    return this.http.post(this.URL_API+'/recoveryPassword',recovery);
  }
  recoveryCode(correo:string){
    return this.http.post(this.URL_API+'/recoveryCode',{correo});
  }
}