import { Component, OnInit, ViewChild } from '@angular/core';
import { SubirarchivosService } from 'src/app/services/subirarchivos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { documento } from 'src/app/models/documento';
import { proyecto } from 'src/app/models/proyecto';
import decode from 'jwt-decode'

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
  nombreArchivo: string = "";
  nombreArchivoOficial: string = "";
  nombreArchivoCorrecciones: string = "";
  URLPublica: string;
  URLOficial: string;
  URLCorrecciones: string;
  TipoArchivo: string = "";
  errorNombre: boolean = false;
  existe: boolean = false;
  existeOficial: boolean = false;
  existeCorrecciones: boolean = false;
  usuario_id: number;
  rol: number;
  proyectoSeleccionado: proyecto;

  public datosFormulario = new FormData();
  inicioDocumentos: documento[];

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
  buscarArchivoCorreciones() {
    cargando = true;
    let referencia = this.subirarchivosService.getUrlArchivo(this.nombreArchivoCorrecciones);
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

  buildForm() {
    this.archivoForm = this.fb.group({
      archivo: ['', Validators.compose([Validators.required])],
      documento: ['', Validators.compose([Validators.required])],
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
  subirArchivo() {
    cargando = true;
    console.log("entramo O_Os");
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this.subirarchivosService.SubirArchivo(this.nombreArchivo, archivo);
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.cambioPorcentaje(porcentaje);
      if (this.porcentaje == 100) {
        // this.progresbar.nativeElement.style.background = '#5cb85c';
        this.progresbar.nativeElement.textContent = "COMPLETADO";
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">ARCHIVO SUBIDO</h4>
              <p>El archivo se ha subido correctamente</p>
              <hr>
          </div>`});

        if (this.proyectoSeleccionado.ETAPA == 1 && this.proyectoSeleccionado.CORRECCIONES == true) {
          this.subirarchivosService.updateProject(this.proyectoSeleccionado.ID_PROYECTO, true, true)
            .subscribe(res => {
              cargando = false;
            })
        }
        else {
          cargando = false;
        }
      }
    });
  }
  cambioPorcentaje(porcentaje: number) {
    this.porcentaje = Math.round(porcentaje);
    this.porcentaje2 = this.porcentaje.toString() + "%";
    this.progresbar.nativeElement.style.width = this.porcentaje2;
  }
  confirmarArchivo() {
    if (this.existe == true) {
      if (confirm("¿Esta seguro que desea reemplazar el archivo?")) {
        this.subirArchivo();
      }
    }
    else {
      this.subirArchivo();
    }
  }
  getDocumentos() {
    cargando = true;
    this.subirarchivosService.getDocumentos()
      .subscribe(res => {
        this.subirarchivosService.documentos = res as documento[];
        this.inicioDocumentos = res as documento[]
        cargando = false;
      })
  }
  getProyectos() {
    cargando = true;
    this.subirarchivosService.getProyectosById(this.usuario_id)
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
    if (documento != '') {
      if (this.subirarchivosService.documentos.find(documento => documento.NOMBRE_DOCUMENTO == this.TipoArchivo).ETAPA == 1) {
        this.nombreArchivoCorrecciones = documento + "_" + proyecto + "_correcciones.docx";
        this.buscarArchivoCorreciones();
      }
    }
  }

  filtrarDocumentos() {
    this.subirarchivosService.documentos = this.inicioDocumentos.filter((documento) => {
      return documento.ETAPA <= this.proyectoSeleccionado.ETAPA;
    });
  }
  cambioDocumento(documento: string, proyecto: string) {
    if (this.subirarchivosService.documentos.find(documento => documento.NOMBRE_DOCUMENTO == this.TipoArchivo).ETAPA == 1) {
      this.nombreArchivoCorrecciones = documento + "_" + proyecto + "_correcciones.docx";
      this.buscarArchivoCorreciones();
    }
  }
  cambioProyecto(proyecto: string) {
    this.subirarchivosService.getProyectosByNombre(proyecto)
      .subscribe(res => {
        this.proyectoSeleccionado = res[0] as proyecto;
        console.log("correcciones", this.proyectoSeleccionado.CORRECCIONES);
        this.filtrarDocumentos();
      })
  }
  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
    this.rol = parseInt(tokenPayload.rol_usuario);
  }

  mostrarEstado(correcciones : any,corregido : any){
    console.log('entro mostrar estado');
    if(correcciones == 1 && corregido == 0)
    return ' (correcciones pendientes)';
    else if (correcciones == 1 && corregido == 1)
    return ' (correcciones atendidas)';
    else
    return "";
  }

  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
