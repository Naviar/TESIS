import { Component, OnInit ,ViewChild } from '@angular/core';
import { SubirarchivosService } from '../../services/subirarchivos.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';



let cargando = true;
declare var M: any;
@Component({
  selector: 'app-evaluacion-proyectos',
  templateUrl: './evaluacion-proyectos.component.html',
  styleUrls: ['./evaluacion-proyectos.component.css']
})
export class EvaluacionProyectosComponent implements OnInit {

  selectionProject : string  = '';
  ID_Proyecto : number;
  documentos: any [];
  proyectos : any [];

  proyectoSelected : any= {};

  porcentaje: number = 0;
  porcentaje2: string = "0%";
  nombreArchivo: string = "";
  nombreArchivoCorreciones: string = "";
  URLPublica: string = '';
  existe: boolean = false;
  URLCorrecciones : string;
  existeCorrecciones : boolean = false;

  TipoArchivo: string = "";
  errorNombre: boolean = false;
  public datosFormulario = new FormData();

  archivoForm: FormGroup;

  mensajeArchivo = 'Subir archivo con correciones';

  constructor(private subirArchivosService : SubirarchivosService ,  private fb: FormBuilder) { }

  async ngOnInit() {
  this.buildForm();
  await this.getDocumentos();
  await this.getProyectos();
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
  @ViewChild('progreso') progresbar;

  cambioNombre(documento:string, proyecto:string){

    const Proyecto = this.proyectos.find((proyectofind)=>{
      return proyectofind.NOMBRE_PROYECTO === proyecto;
    });
    this.proyectoSelected = Proyecto;
    this.ID_Proyecto = Proyecto.ID_PROYECTO;
    console.log(this.ID_Proyecto);
    if(documento !== '' && proyecto !== ''){
      
      this.progresbar.nativeElement.textContent = "";
      this.cambioPorcentaje(0);
      this.TipoArchivo = documento; 
      this.nombreArchivo = documento + "_" + proyecto+".docx";
      console.log(":D", this.nombreArchivo);
      this.nombreArchivoCorreciones = documento+"_"+proyecto+ "_correcciones.docx";
      this.buscarArchivo();
      this.buscarArchivoCorreciones();
    }

  }

  buscarArchivoCorreciones(){
    cargando = true;
    let referencia = this.subirArchivosService.getUrlArchivo(this.nombreArchivoCorreciones);
    referencia.getDownloadURL().subscribe((URL) => {
      this.URLCorrecciones = URL;
      console.log("Esto nos trajobuscando correciones", this.URLCorrecciones);
      this.existeCorrecciones = true;
      cargando = false;
    },
      (error) => {
        this.existeCorrecciones = false;
        cargando = false;
      });
  }

  async buscarArchivo() {
    cargando = true;
    const referencia = await this.subirArchivosService.getUrlArchivo(this.nombreArchivo);
    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      console.log("Esto nos trajo", this.URLPublica);
      this.existe = true;
      cargando = false;
    },
      (error) => {
        this.existe = false;
        cargando = false;
      });
  }

  confirmarArchivo(){
    if(this.existeCorrecciones==true){
      if(confirm("¿Esta seguro que desea reemplazar el archivo?")){
        this.subirArchivo();
      }
    }
    else{
      this.subirArchivo();
    }
  }
  subirArchivo() {
    cargando = true;
    console.log("entramo O_Os");
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this.subirArchivosService.SubirArchivo(this.nombreArchivoCorreciones, archivo);
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.cambioPorcentaje(porcentaje);
      if (this.porcentaje == 100) {
        // this.progresbar.nativeElement.style.background = '#5cb85c';
        this.progresbar.nativeElement.textContent = "COMPLETADO";
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ARCHIVO SUBIDO</h4>
              <p>El archivo  se ha subido correctamente</p>
              <hr>
          </div>`});
        cargando = false;
        this.sendCorrecionesToProject();
      }

    });
  }

  sendCorrecionesToProject(){
    cargando = true;
    this.subirArchivosService.sendFixesToProject(this.ID_Proyecto,true,this.proyectoSelected.CORREO,this.proyectoSelected.NOMBRE_PROYECTO,this.archivoForm.get('documento').value)
    .subscribe(
      res => {
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ESTADO DE CORRECIONES ACTUALIZADO</h4>
              <p>se ha actualizado el estado para las correciones del proyecto</p>
              <hr>
          </div>`});
          this.getProyectos();
          cargando =false;
      },

      err => {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ERROR ACTUALIZANDO CORRECIONES</h4>
              <p>Error actualizando el estado para las correciones del proyecto</p>
              <hr>
          </div>`});
          cargando =false;
      }
    );
  }
  cambioPorcentaje(porcentaje: number){
    this.porcentaje = Math.round(porcentaje);
    this.porcentaje2 = this.porcentaje.toString() + "%";
    this.progresbar.nativeElement.style.width = this.porcentaje2;
  }

  async getDocumentos(){
    cargando = true;
    await this.subirArchivosService.getDocumentosByEtapa(1)
    .subscribe(

      res =>{
        this.documentos = res as any [];
        console.log(this.documentos);
      }
    );
    cargando =false;
  }

  async getProyectos(){
    cargando = true;
    await this.subirArchivosService.getProyectosByEtapa(1)
    .subscribe(
      res => {
        this.proyectos = res as any [];
        console.log(`proyectos : ${JSON.stringify(this.proyectos)}`);
        
      }
    );
    cargando =false;
  }

  mostrarEstado(estado : any){
    
    if(estado == 1)
    return ' (correcciones pendientes)';
    else
    return '';
  }

 updateStageProject(){
  cargando = true;
  this.subirArchivosService.updateStageProject(this.ID_Proyecto, 2, this.proyectoSelected.CORREO, this.archivoForm.get('proyecto').value)
  .subscribe(
    res => {
      M.toast({
        html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">SE AVALO EL PROYECTO</h4>
            <p>Se avalo el proyecto ${this.archivoForm.get('proyecto').value} sin correciones</p>
            <hr>
        </div>`});
        this.getProyectos();
        cargando = false;
    },
    err => {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ERROR AVALANDO EL PROYECTO</h4>
            <p>ocurrio un error en el servidor intentando actualizar la etapa del proyecto</p>
            <hr>
        </div>`});
        cargando =false;
    }

  );

 }

 yaCargo() {
  if (cargando == false) {
    return false;
  } else {
    return true;
  }
}

}
