import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Horario } from '../models/horario';
import { Disponibilidad2 } from '../models/disponibilidad2';

@Injectable({
  providedIn: 'root'
})
export class CitasPendientes {

  readonly URL_API = `http://localhost:3500/citasPendientes`;
  constructor(private http : HttpClient) { }

  getCitas(){
    return this.http.get(this.URL_API+"/getCitas");
  }
  getCitasEstudiante(id_estudiante:number){
    return this.http.get(this.URL_API+`/getCitasEstudiante/${id_estudiante}`);
  }
  getCitasAsesor(id_asesor:number){
    return this.http.get(this.URL_API+`/getCitasAsesor/${id_asesor}`);
  }
  getCitasLider(id_lider:number){
    return this.http.get(this.URL_API+`/getCitasLider/${id_lider}`); 
  }
  getHorario(id:number){
    return this.http.get(this.URL_API+`/getHorarioId/${id}`);
  }
  cancelarCita(CitaCancelada : object , id_cita : number){
    console.log('servicio:', CitaCancelada);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: CitaCancelada,
    };
    return this.http.delete(this.URL_API+`/deleteCita/${id_cita}`,options);
  }





}