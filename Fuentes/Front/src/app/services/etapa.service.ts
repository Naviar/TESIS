import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  readonly URL_API = 'http://localhost:3500/etapa';  

  constructor(public http: HttpClient) { 
    
  }
  getEtapa(id_estudiante:number){    
    return this.http.get(this.URL_API+"/getEtapa" + `/${id_estudiante}`);
  }
  putEtapa(id_estudiante:number, etapa:number){    
    console.log("ETAPALLL",etapa); 
    return this.http.put(this.URL_API+"/putEtapa"+ `/${id_estudiante}`,{etapa});
  }
}
