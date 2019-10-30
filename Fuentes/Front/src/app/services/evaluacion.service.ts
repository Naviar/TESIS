import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Evaluacion} from '../models/evaluacion'


@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  readonly URL_API = 'http://localhost:3500/api/evaluacion';  

  constructor(public http: HttpClient) { 
    
  }
  postEvaluacion(evaluacion:Evaluacion){
    return this.http.post(this.URL_API, evaluacion)
  }

  actualizarEvaluacionDiagnostico(id_formato_evaluacion : number,id_estudiante:number){
    return this.http.put(`${this.URL_API}/UpdateEvalDiagnostico`,{id_formato_evaluacion,id_estudiante});
  }

  actualizarEvaluacionAsesoria(id_formato_evaluacion : number , id_estudiante :number){
    return this.http.put(`${this.URL_API}/UpdateEvalAsesoria`,{id_formato_evaluacion,id_estudiante});
  }
}
