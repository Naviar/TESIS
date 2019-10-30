import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Diagnostico} from '../models/diagnostico';
import { estudiante } from '../models/estudiante';
import { Evaluacion } from '../models/evaluacion';
import { asesoriaFormato } from '../models/asesoriaFormato';
import { asesoria } from '../models/asesoria';
import { compromiso2 } from '../models/compromiso2';
import { convocatoria } from '../models/convocatoria';
import { proyecto } from '../models/proyecto';
import { asesor } from '../models/asesor';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {  
  estudiantes: estudiante[];
  estudianteAsesoria : estudiante = {
    NOMBRE:"",
    APELLIDO:"",
    CORREO:"",
    CELULAR:undefined,
    CODIGO:undefined,
    SEMESTRE:undefined,
    USUARIO_ID_USUARIO:undefined,
    FACULTAD_ID_FACULTAD : undefined,
    JORNADA_ID_JORNADA :undefined,
    ID_ESTUDIANTE:undefined,
    FORMATO_DIAGNOSTICO_ID_DIAGNOSTICO:undefined,
    ETAPA:undefined,
  };
  diagnosticos: Diagnostico[];
  compromisos: compromiso2[]=[];
  asesorias: asesoriaFormato[]=[];
  evaluaciones: Evaluacion[];
  convocatorias: convocatoria[];
  proyectos: proyecto[];
  estudiante: estudiante;
  docente: asesor;
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
    ID_FORMATO_EVALUACION: "",
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

  selected_asesoria : asesoriaFormato = {
    REQUERIMIENTO : '',
    DESCRIPCION : '',
    RESULTADO : '',
    TIPO_ASESORIA_ID_TIPO_ASESORIA: 0,
    TIPO_ASESORIA_ACTUAL: 0,
    FECHA: '' 
  };

  readonly URL_API = 'http://localhost:3500/api/seguimiento';  

  constructor(public http: HttpClient) { 
    // this.selectedDiagnostico= new Diagnostico();
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  } 
  getEstudianteAsesoria(id_asesoria:number){
    return this.http.get(this.URL_API+"/getEstudianteAsesoria/"+`${id_asesoria}`);
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
  getDocente(id_usuario:number){
    return this.http.get(this.URL_API+"/getDocente" + `/${id_usuario}`);
  } 
  getEstudiante(id_usuario:number){
    return this.http.get(this.URL_API+"/getEstudiante" + `/${id_usuario}`);
  } 
  getEvaluaciones(id_estudiante:number){
    return this.http.get(this.URL_API+"/getEvaluaciones" + `/${id_estudiante}`);
  } 
  getEvaluacion(id_evaluacion:number){
    return this.http.get(this.URL_API+"/getEvaluacion" + `/${id_evaluacion}`);
  } 
  getConvocatorias(id_usuario:number){
    return this.http.get(this.URL_API+"/getConvocatoria" + `/${id_usuario}`);
  } 
  getProyectos(id_usuario:number){
    return this.http.get(this.URL_API+"/getProyecto" + `/${id_usuario}`);
  } 

  getNameAsesoria(id_asesoria :number){
    return this.http.get(this.URL_API+"/getNameAsesoria"+`/${id_asesoria}`);
  }

  getCompromisosAsesoria(id_asesoria:number){
    return this.http.get(this.URL_API+'/getCompromisosAsesoria'+`/${id_asesoria}`);
  }

}
