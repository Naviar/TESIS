import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutenticarUsuarios {

  readonly URL_API = 'http://198.199.64.187/api/autenticarUsuarios';
  constructor(private http : HttpClient) { } 

  getAsesores(){
    return this.http.get(this.URL_API+"/getAsesores");
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  }
  geUsuarios(){
    return this.http.get(this.URL_API+"/getUsuarios");
  }
  getLiderId(id:number){
    return this.http.get(this.URL_API+`/getLiderId/${id}`);
  }
  getAsesorId(id:number){
    return this.http.get(this.URL_API+`/getAsesorId/${id}`);
  }
  getEstudianteId(id:number){
    return this.http.get(this.URL_API+`/getEstudianteId/${id}`);
  }
  changeStatus(id_asesoria:number , status:boolean){    
    var estado : object = {status}
    return this.http.put(`${this.URL_API}/changeStatus/${id_asesoria}`,estado);
  }
} 