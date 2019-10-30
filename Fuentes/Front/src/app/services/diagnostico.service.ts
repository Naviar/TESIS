import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Diagnostico} from '../models/diagnostico'
import { estudiante } from '../models/estudiante';
import { etapa } from '../models/etapa';
import { sector } from '../models/sector';
import { asesoria } from '../models/asesoria';
@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  estudiantes: estudiante[];
  etapas: etapa[];
  sectores: sector[];
  asesorias: asesoria[];
  estudiantesFilter: estudiante = {
    NOMBRE:"",
    APELLIDO:"",
    CORREO:"",
    CELULAR:0,
    CODIGO:0,
    SEMESTRE:0,
    USUARIO_ID_USUARIO:0,
    FACULTAD_ID_FACULTAD:0, 
    JORNADA_ID_JORNADA:0,
    ID_ESTUDIANTE:0,
    FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO:0,
    ETAPA:0
  };

  selectedEstudiante: estudiante[];
  selectedDiagnostico: Diagnostico;
  readonly URL_API = 'http://localhost:3500/api/diagnostico';  

  constructor(public http: HttpClient) { 
    // this.selectedDiagnostico= new Diagnostico();
  }
  postDiagnostico(diagnostico:Diagnostico){
    return this.http.post(this.URL_API, diagnostico)
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  }
  getEtapas(){
    return this.http.get(this.URL_API+"/getEtapas");
  }
  getSectores(){
    return this.http.get(this.URL_API+"/getSectores");
  }
  getAsesorias(){
    return this.http.get(this.URL_API+"/getAsesorias");
  }
  putEstudiante(id_estudiante:string,id_diagnostico:Diagnostico){    
    return this.http.put(this.URL_API+"/putEstudiante"+ `/${id_estudiante}`,id_diagnostico);
  }
}
