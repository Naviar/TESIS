import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../models/horario';
import { Disponibilidad2 } from '../models/disponibilidad2';

@Injectable({
  providedIn: 'root'
})
export class AgendarCitaService {
  Dias: any[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  horariosDiagnostico: Horario[];
  horariosAsesoria: Horario[]
  horarioSelect: Horario = {
    DIA: this.Dias[1],
    HORA_INICIO: "",
    HORA_FIN: "",
    LUGAR:"",
    TIPO_REUNION_ID_TIPO_REUNION: null,
    TIPO_ASESORIA_ID_TIPO_ASESORIA: null,
    USUARIO_ID_USUARIO: 1,
    NOMBRE_TIPO_ASESORIA: ""
  }
  disponibilidadSelect: Disponibilidad2;

  readonly URL_API = `http://localhost:3500/api/agendarCita`;
  constructor(private http : HttpClient) { }

  getHorarios(){
    return this.http.get(this.URL_API+"/getHorarios");
  }
  getHorarioId(id:number){
    return this.http.get(this.URL_API+`/getHorarioId/${id}`);
  }
  getDisponibilidadId(id:number){
    return this.http.get(this.URL_API+`/getDisponibilidadId/${id}`);
  }
  postDisponibilidad(disponibilidad:Disponibilidad2){
    return this.http.post(this.URL_API+`/agendarCita`,disponibilidad);
  }
  disponibilidadesLibres(disponibilidad:Disponibilidad2){
    return this.http.post(this.URL_API+`/disponibilidadesLibres`,disponibilidad);
  }
  disponibilidadesOcupadas(disponibilidad:Disponibilidad2){
    return this.http.post(this.URL_API+`/disponibilidadesOcupadas`,disponibilidad);
  }

  getAsesoria(id_estudiante : number){
    return this.http.get(this.URL_API+`/getAsesorias/${id_estudiante}`);
  }
  asesoriasLibres(disponibilidad:Disponibilidad2){
    return this.http.post(this.URL_API+`/asesoriasLibres`,disponibilidad);
  }
  asesoriasOcupadas(disponibilidad:Disponibilidad2){
    return this.http.post(this.URL_API+`/asesoriasOcupadas`,disponibilidad);
  }

 

}
