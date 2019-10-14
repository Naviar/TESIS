import { Component, OnInit } from '@angular/core';
import { SubirarchivosService } from '../../services/subirarchivos.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-evaluacion-proyectos',
  templateUrl: './evaluacion-proyectos.component.html',
  styleUrls: ['./evaluacion-proyectos.component.css']
})
export class EvaluacionProyectosComponent implements OnInit {
  
  documentos: any [];
  proyectos : any [];

  TipoArchivo: string = "";
  errorNombre: boolean = false;
  public datosFormulario = new FormData();

  archivoForm: FormGroup;

  mensajeArchivo = 'Subir archivo con correciones';

  constructor(private subirArchivosService : SubirarchivosService ,  private fb: FormBuilder) { }

  ngOnInit() {
this.getDocumentos();
this.getProyectos();
this.buildForm();
  }

  cambioArchivo(event) {
    console.log('entro aca');
    var expresion = /[.](docx)|[.](doc)$/;
    var resultado;
    if (event.target.files.length == 1) {
      this.mensajeArchivo = `Archivo preparado: ${event.target.files[0].name}`;
      resultado = event.target.files[0].name.match(expresion);
      if (resultado == null) {
        this.errorNombre = true;
      }
      else {
        this.errorNombre = false;
      }
      this.datosFormulario.delete('archivo');
      this.datosFormulario.append('archivo', event.target.files[0], event.target.files[0].name)
    }
    else if (event.target.files.length > 1) {
      this.mensajeArchivo = 'Seleccione solo un archivo';
    }
    else if (event.target.files.length < 1) {
      this.mensajeArchivo = 'Seleccione un archivo';
    }
  }

  buildForm() {
    this.archivoForm = this.fb.group({
      archivo: ['', Validators.compose([Validators.required])],
      documento: ['', Validators.compose([Validators.required])],
      proyecto: ['', Validators.compose([Validators.required])]
    });
  }

  getDocumentos(){
    this.subirArchivosService.getDocumentosByEtapa(1)
    .subscribe(

      res =>{
        this.documentos = res as any [];
        console.log(this.documentos);
      }
    )
  }

  getProyectos(){
    this.subirArchivosService.getProyectosByEtapa(1)
    .subscribe(
      res => {
        this.proyectos = res as any [];
        console.log(`proyectos : ${this.proyectos}`);
      }
    )
  }

}
