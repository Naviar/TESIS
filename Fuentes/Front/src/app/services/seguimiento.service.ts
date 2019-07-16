import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Diagnostico} from '../models/diagnostico';
import { estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  estudiantes: estudiante[];

  readonly URL_API = 'http://localhost:3500/seguimiento';  

  constructor(public http: HttpClient) { 
    // this.selectedDiagnostico= new Diagnostico();
  }
  getEstudiantes(){
    return this.http.get(this.URL_API+"/getEstudiantes");
  } 

}
