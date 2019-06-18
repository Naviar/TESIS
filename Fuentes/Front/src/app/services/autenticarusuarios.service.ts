import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutenticarUsuarios {

  readonly URL_API = `http://localhost:3500/autenticarUsuarios`;
  constructor(private http : HttpClient) { }

  getAsesores(){
    return this.http.get(this.URL_API+"/getAsesores");
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
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