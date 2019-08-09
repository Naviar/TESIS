import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  
    usuarios: usuario[];

  readonly URL_API = 'http://localhost:3500/reporte';   

  constructor(private http :HttpClient) { }

  getReporte(){
    return this.http.get(`${this.URL_API}/general`)
  }
}
