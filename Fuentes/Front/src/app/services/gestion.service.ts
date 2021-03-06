import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GestionService {
  
  readonly URL_API = 'http://198.199.64.187/api/gestion';  

  constructor(private http :HttpClient) { }

  getAsesorias(){
    return this.http.get(`${this.URL_API}/asesorias`)
  }

  changeStatus(id_asesoria:number , status:boolean){
    console.log(`idasesoriaaa: ${id_asesoria} , status: ${status}`);
    var estado : object = {status}
    return this.http.put(`${this.URL_API}/status/${id_asesoria}`,estado);
  }

  postAsesoria(nombre_asesoria : string){
    var nombre: object = {nombre_asesoria}
    return this.http.post(`${this.URL_API}/nuevaasesoria`,nombre);
  }
}
