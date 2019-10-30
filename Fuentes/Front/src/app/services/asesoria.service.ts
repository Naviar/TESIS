import { Injectable } from '@angular/core';
import { estudiante } from '../models/estudiante';
import { HttpClient } from '@angular/common/http';
import { asesoria} from '../models/asesoria';
import { compromiso } from '../models/compromiso';
import { asesoriaFormato } from '../models/asesoriaFormato';
@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  
  readonly URL_API = 'http://198.199.64.187/api/asesoria'; 
  responsables = [{actor:'asesor',nombre:'',id:0},{actor:'estudiante',nombre:'',id: undefined}];
  asesorias : asesoria []; 
  selectedEstudiante: estudiante[];
  estudiantes: estudiante[];
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

  compromisos : compromiso[] = [];

  constructor(private http : HttpClient) { }

  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  }

  getAsesorias(){
    return this.http.get(this.URL_API+"/getAsesorias");
  }

  getAsesoriaActual(id_estudiante : number){
    return this.http.get(this.URL_API+`/getAsesoriaActual/${id_estudiante}`);
  }

  postfFormatoAsesoria(asesoria :asesoriaFormato){

    return this.http.post(`${this.URL_API}/postFormAsesoria`,asesoria);
  }

  postFormatoAsesoria2(data :Object ){
    console.log('data:');
    return this.http.post(`${this.URL_API}/postAsesoriaEstudiante`,data);
  }

  postCompromisos(){
    return this.http.post(`${this.URL_API}/postCompromisos`,this.compromisos);
  }

  
}
