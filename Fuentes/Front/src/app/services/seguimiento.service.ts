import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Diagnostico} from '../models/diagnostico';
import { estudiante } from '../models/estudiante';
import { Evaluacion } from '../models/evaluacion';
import { asesoriaFormato } from '../models/asesoriaFormato';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService { 
  estudiantes: estudiante[];
  diagnosticos: Diagnostico[];
  asesorias: asesoriaFormato[];
  evaluaciones: Evaluacion[];
  selected_diagnostico: Diagnostico = {
    ID_FORMATO_DIAGNOSTICO:"",     
    ETAPA_ID_ETAPA: 0, 
    SECTOR_ID_SECTOR: 0,     
    AMBITO_SOCIAL: "", 
    DESCRIPCION_PROYECTO: "",    
    SOCIOS_CLAVE: "", 
    ACTIVIDADES_CLAVE: "", 
    RECURSOS_CLAVE: "", 
    PROPUESTA_VALOR: "", 
    RELACION_CLIENTES: "", 
    CANALES: "", 
    SEGMENTOS_CLIENTES: "", 
    ESTRUCTURA_COSTOS: "", 
    FUENTE_INGRESOS: "", 
    TIPO_ASESORIA_ID_TIPO_ASESORIA: 0,
    FORMATO_EVALUACION: 0,
    FECHA: "",
    ESTUDIANTE_ID_ESTUDIANTE: 0
  };
  selected_evaluacion: Evaluacion = {
    EVAL_GENERAL_Q1: "",
    EVAL_GENERAL_Q2: "",
    EVAL_GENERAL_Q3: "",
    EVAL_GENERAL_Q4: "",
    PERS_RESPONSABLE_Q1: "",
    PERS_RESPONSABLE_Q2: "",
    PERS_RESPONSABLE_Q3: "",
    PERS_RESPONSABLE_Q4: "",
    PERS_RESPONSABLE_Q5: "",
    PERS_RESPONSABLE_Q6: "",
    INSTA_EQUIPOS_Q1: "",
    INSTA_EQUIPOS_Q2: "",
    INSTA_EQUIPOS_Q3: "",
    YESNO_Q1: "",
    YESNO_Q2: "",
    YESNO_Q3: "",
    YESNO_Q4: "",
    YESNO_Q5: "",
    OBSERVACIONES: "",
    FECHA: ""
  };
  readonly URL_API = 'http://localhost:3500/seguimiento';  

  constructor(public http: HttpClient) { 
    // this.selectedDiagnostico= new Diagnostico();
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  } 
  getDiagnosticos(id_estudiante:number){
    return this.http.get(this.URL_API+"/getDiagnosticos" + `/${id_estudiante}`);
  }
  getDiagnostico(id_diagnostico:number){
    return this.http.get(this.URL_API+"/getDiagnostico" + `/${id_diagnostico}`);
  }  
  getAsesorias(id_estudiante:number){
    return this.http.get(this.URL_API+"/getAsesorias" + `/${id_estudiante}`);
  } 
  getAsesoria(id_asesoria:number){
    return this.http.get(this.URL_API+"/getAsesoria" + `/${id_asesoria}`);
  } 
  getEvaluaciones(id_estudiante:number){
    return this.http.get(this.URL_API+"/getEvaluaciones" + `/${id_estudiante}`);
  } 
  getEvaluacion(id_evaluacion:number){
    return this.http.get(this.URL_API+"/getEvaluacion" + `/${id_evaluacion}`);
  } 

}
