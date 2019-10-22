import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { proyecto } from '../models/proyecto';
import { documento } from '../models/documento';


@Injectable({
  providedIn: 'root'
})
export class SubirarchivosService {
  proyectos: proyecto[];
  proyectoNuevo: proyecto = {
    ID_PROYECTO : 0,
    NOMBRE_PROYECTO : "",
    ETAPA : 0,
    USUARIO_ID_USUARIO: 0
    };
  documentos: documento[];
  readonly URL_API = 'http://localhost:3500/subirarchivos';  
  

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  SubirArchivo(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  getUrlArchivo(nombreArchivo: string) {    
    return this.storage.ref(nombreArchivo);
  }

  getDocumentos(){
    return this.http.get(this.URL_API+"/getDocumentos");
  }
  getProyectos(){
    return this.http.get(this.URL_API+"/getProyectos");
  }
  getProyectosFacultad(facultad:number){
    return this.http.get(this.URL_API+"/getProyectosFacultad/"+`${facultad}`);
  }
  getProyectosDocente(docente:number){
    return this.http.get(this.URL_API+"/getProyectosDocente/"+`${docente}`);
  }
  sendFixesToProject(id_proyecto : number , stateFixes : boolean, correo :string,nombreProyecto:string,documento:string){
    
    return this.http.put(this.URL_API+`/updateFixes/${id_proyecto}`,{stateFixes,correo,nombreProyecto,documento});

  }

  updateStageProject(ID_Proyecto : number , etapa : number , correo:string , nombreProyecto:string){
    return this.http.put(this.URL_API+`/updateProjectStage/${ID_Proyecto}`,{etapa,correo,nombreProyecto});
  }
  getProyectosByEtapa(etapa:number){
    return this.http.get(this.URL_API+"/getProyectosByEtapa/"+etapa);
  }
  getDocumentosEtapa(etapa:number){
    return this.http.get(this.URL_API+"/getDocumentosEtapa/"+`${etapa}`);
  }
  getDocumentosByEtapa(etapa:number){
    return this.http.get(this.URL_API+"/getDocumentosByEtapa/"+`${etapa}`);
  }
  crearProyecto(proyecto:proyecto){    
    return this.http.post(this.URL_API + '/crearProyecto', proyecto);
  }
  proyectoDuplicado(proyecto:proyecto){
    return this.http.post(this.URL_API + '/proyectoDuplicado', proyecto);
  }
}