import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Horario} from 'src/app/models/horario';
import { Disponibilidad } from '../models/disponibilidad';
@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  readonly URL_API = 'http://198.199.64.187/api/Horarios';
  constructor(private http:HttpClient) { }

  postHorario(horario: Horario){
    console.log('entro al servicio horarios - posthorario');
    return this.http.post(`${this.URL_API}/AddHorario`,horario);
  }

  getHorarios(codigo_usuario: number){
    return this.http.get(`${this.URL_API}/getHorarios/${codigo_usuario}`);
  }

  getTipoReunion(){
    return this.http.get(`${this.URL_API}/getTiposReunion`);
  }

  getTipoAsesoria(){
   return this.http.get(`${this.URL_API}/getTiposAsesorias`);
  }

  deleteHorario(id: string){
    return this.http.delete(`${this.URL_API}/deleteHorario/${id}`);
  }

  getDisponibilidadeslibreshorario(id:number){
    return this.http.get(`${this.URL_API}/getDisponibilidades/${id}`);
  }

  postDisponibilidades(disponibilidad: Disponibilidad){
    console.log('disponibilidades desde el servicio:',disponibilidad);
    return this.http.post(`${this.URL_API}/disponibilidades`,disponibilidad);
  }
}
