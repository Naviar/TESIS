import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { convocatoria } from '../models/convocatoria';

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  readonly URL_API = 'http://198.199.64.187/api/convocatoria'
  constructor(private http : HttpClient) {

   }

   openAnnouncement(convocatoria_open: convocatoria)
   {
      return this.http.post(this.URL_API+'/abrirConvocatoria',convocatoria_open);
   }
  
   updateAnnouncement(convocatoria_open : convocatoria, id_convocatoria : number){
     return this.http.put(this.URL_API+`/actualizarConvocatoria/${id_convocatoria}`, convocatoria_open);
   }
   getAnnouncements()
   {
     return this.http.get(this.URL_API+'/obtenerConvocatorias');
   }
}
