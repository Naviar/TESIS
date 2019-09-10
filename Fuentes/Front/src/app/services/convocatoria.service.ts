import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { convocatoria } from '../models/convocatoria';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  readonly URL_API = 'http://localhost:3500/convocatoria'
  constructor(private http : HttpClient) {

   }

   openAnnouncement(convocatoria_open: convocatoria)
   {
      return this.http.post(this.URL_API+'/abrirConvocatoria',convocatoria_open);
   }
}
