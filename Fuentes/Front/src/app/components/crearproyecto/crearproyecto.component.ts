import { Component, OnInit, ViewChild } from '@angular/core';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { documento } from 'src/app/models/documento';
import { proyecto } from 'src/app/models/proyecto';
import decode from 'jwt-decode'


let cargando = true;
declare var M: any;

@Component({
  selector: 'app-crearproyecto',
  templateUrl: './crearproyecto.component.html',
  styleUrls: ['./crearproyecto.component.css']
})
export class CrearproyectoComponent implements OnInit {

  usuario_id: number;
  archivoForm: FormGroup;
  porcentaje: number = 0;
  porcentaje2: string = "0%";
  mensajeArchivo = 'No hay un archivo seleccionado';
  nombreDocumento: string = "Acta reunion";
  nombreArchivo: string = "";
  nombreArchivoOficial: string = "";
  URLPublica: string;
  URLOficial: string;
  TipoArchivo: string = "";
  errorNombre: boolean = false;
  existe: boolean = false;
  existeOficial: boolean = false;
  vez: number = 1;
  public datosFormulario = new FormData();

  constructor(public subirarchivosService: SubirarchivosService, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    cargando = false;
    this.getValidRol();
    this.getDocumentos();
    this.getProyectos();
  }
  buscarArchivo() {
    cargando = true;
    let referencia = this.subirarchivosService.getUrlArchivo(this.nombreArchivo);
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

  buscarArchivoOficial() {
    cargando = true;
    let referencia = this.subirarchivosService.getUrlArchivo(this.nombreArchivoOficial);
    referencia.getDownloadURL().subscribe((URL) => {
      this.URLOficial = URL;
      console.log("Esto nos trajo", this.URLOficial);
      this.existeOficial = true;
      cargando = false;
    },
      (error) => {
        this.existeOficial = false;
        cargando = false;
      });
  }

  buildForm() {
    this.archivoForm = this.fb.group({
      archivo: ['', Validators.compose([Validators.required])],
      proyecto: ['', Validators.compose([Validators.required])]
    });
  }
  cambioArchivo(event) {
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
  @ViewChild('progreso') progresbar;
  @ViewChild('documento') documento;
  @ViewChild('proyecto') proyecto;
  @ViewChild('archivo') file;

  crearProyecto(form?: NgForm) {
    this.cambioNombre(this.documento.nativeElement.value, this.proyecto.nativeElement.value);
    cargando = true;
    this.subirarchivosService.proyectoNuevo.NOMBRE_PROYECTO = form.value.proyecto;
    this.subirarchivosService.proyectoNuevo.ETAPA = 1;
    this.subirarchivosService.proyectoNuevo.USUARIO_ID_USUARIO = this.usuario_id;
    this.subirarchivosService.proyectoDuplicado(this.subirarchivosService.proyectoNuevo)
      .subscribe((data) => {
        if (data[0].DUPLICATE == 0) {
          this.subirArchivo();
        }
        else {
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">FALLO LA CREACION DEL PROYECTO</h4>
                    <p>El nombre de proyecto que diligencio ya se encuentra registrado, intente con uno diferente.</p>
                    <hr>
                </div>`});
          cargando = false;
        }
      })
  }


  async subirArchivo() {
    cargando = true;
    console.log("entramo O_Os");
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this.subirarchivosService.SubirArchivo(this.nombreArchivo, archivo);
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.cambioPorcentaje(porcentaje);
      if (this.porcentaje == 100) {
        this.archivoSubido();
      }
    });
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  async archivoSubido(){
    this.progresbar.nativeElement.textContent = "COMPLETADO";
    M.toast({
      html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
          <h4 class="alert-heading">ARCHIVO SUBIDO</h4>
          <p>El archivo se ha subido correctamente</p>
          <hr>
      </div>`});
      await this.delay(2000); 
    if (this.vez == 2) {
      this.subirarchivosService.crearProyecto(this.subirarchivosService.proyectoNuevo)
        .subscribe(res => {
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">PROYECTO CREADO</h4>
                 <p>El proyecto se ha creado correctamente</p>
                 <hr>
                 </div>`}); 
          cargando = false;
        })
    }
    else if (this.vez == 1) {
      this.nombreDocumento = "Formato proyecto";
      this.cambioPorcentaje(0);
      this.progresbar.nativeElement.textContent = "";
      M.toast({
        html: `<div class="alert alert-warning" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">ARCHIVO REQUERIDO</h4>
            <p>Por favor suba el formato proyecto para terminar con la creación</p>
            <hr>
        </div>`});
      cargando = false;
      this.vez++;
      this.proyecto.nativeElement.disabled = true;
      this.file.nativeElement.value = "";
      this.mensajeArchivo = 'No hay un archivo seleccionado';
      this.cambioNombre(this.nombreDocumento, this.proyecto.nativeElement.value);
    }
  }
  cambioPorcentaje(porcentaje: number) {
    this.porcentaje = Math.round(porcentaje);
    this.porcentaje2 = this.porcentaje.toString() + "%";
    this.progresbar.nativeElement.style.width = this.porcentaje2;
  }

  getDocumentos() {
    cargando = true;
    this.subirarchivosService.getDocumentosEtapa(1)
      .subscribe(res => {
        this.subirarchivosService.documentos = res as documento[];
        cargando = false;
      })
  }
  getProyectos() {
    cargando = true;
    this.subirarchivosService.getProyectos()
      .subscribe(res => {
        this.subirarchivosService.proyectos = res as proyecto[];
        cargando = false;
      })
  }
  cambioNombre(documento: string, proyecto: string) {
    this.progresbar.nativeElement.textContent = "";
    this.cambioPorcentaje(0);
    this.TipoArchivo = documento;
    this.nombreArchivo = documento + "_" + proyecto + ".docx";
    console.log(":D", this.nombreArchivo);
    this.nombreArchivoOficial = documento + "_oficial.docx";
    this.buscarArchivo();
    this.buscarArchivoOficial();
  }
  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
