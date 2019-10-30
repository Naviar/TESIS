import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Horario } from '../models/horario';
import { Disponibilidad2 } from '../models/disponibilidad2';
import { estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class CitasPendientes {

  estudiante: estudiante = {
    NOMBRE:"",
    APELLIDO:"",
    CORREO:"",
    CELULAR:undefined,
    CODIGO:undefined,
    SEMESTRE:undefined,
    USUARIO_ID_USUARIO:undefined,
    FACULTAD_ID_FACULTAD:undefined,
    JORNADA_ID_JORNADA:undefined,
    ID_ESTUDIANTE:undefined,
    FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO:undefined,
    ETAPA:undefined
  };
  readonly URL_API = 'http://198.199.64.187/api/citasPendientes';
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
  getEstudiante(id:number){
    return this.http.get(this.URL_API+`/getestudianteId/${id}`);
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