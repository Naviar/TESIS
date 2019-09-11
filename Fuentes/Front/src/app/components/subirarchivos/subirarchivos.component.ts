import { Component, OnInit, ViewChild } from '@angular/core';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


let cargando = true;
declare var M: any;

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})

export class SubirarchivosComponent implements OnInit {

  archivoForm: FormGroup;
  porcentaje: number = 0;
  porcentaje2: string = "0%";
  mensajeArchivo = 'No hay un archivo seleccionado';
  nombreArchivo : string;  
  URLPublica : string;
  TipoArchivo : string = "acta";
  errorNombre : boolean = false;
  
  public datosFormulario = new FormData();

  constructor(public subirarchivosService:SubirarchivosService, private fb: FormBuilder) { 
    this.buildForm();
  }

  ngOnInit() {
    cargando=false;    
  }
  
  buildForm() {
    this.archivoForm = this.fb.group({      
      archivo: ['', Validators.compose([Validators.required])]
    });
  }
  cambioArchivo(event) {   
    var expresion = /[.](docx)|[.](doc)$/; 
    var resultado;
    if (event.target.files.length == 1) {      
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[0].name}`;
        this.nombreArchivo = event.target.files[0].name;
        resultado= this.nombreArchivo.match(expresion);
        if(resultado==null){
         this.errorNombre=true;
        }
        else{
          this.errorNombre=false;
        }        
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[0], event.target.files[0].name)
    } 
    else if(event.target.files.length > 1){
      this.mensajeArchivo = 'Seleccione solo un archivo';
    }
    else if(event.target.files.length < 1){
      this.mensajeArchivo = 'Seleccione un archivo';
    }
  }
  @ViewChild('progreso') progresbar;
  subirArchivo() {
    cargando=true;
    console.log("entramo O_Os");
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this.subirarchivosService.SubirArchivo(this.nombreArchivo, archivo);    
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      this.porcentaje2 = this.porcentaje.toString() + "%";
      this.progresbar.nativeElement.style.width=this.porcentaje2;      
      if (this.porcentaje == 100) {
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ARCHIVO SUBIDO</h4>
              <p>El archivo se ha subido correctamente</p>
              <hr>
          </div>`});        
        let referencia = this.subirarchivosService.getUrlArchivo(this.nombreArchivo);
        referencia.getDownloadURL().subscribe((URL) => { 
          this.URLPublica = URL;
          console.log("DOWNLOAD", this.URLPublica);
          cargando=false;
        });
      }
    });
  }

  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
