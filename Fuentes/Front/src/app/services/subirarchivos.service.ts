import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class SubirarchivosService {

  readonly URL_API = 'http://localhost:3500/subirarchivos';  
  

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  SubirArchivo(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  getUrlArchivo(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}