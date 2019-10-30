import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';
import { usuario } from 'src/app/models/usuario';

import * as XLSX from 'xlsx';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { jornada } from 'src/app/models/jornada';
import { rol } from 'src/app/models/rol';
import { Diagnostico } from 'src/app/models/diagnostico';
import { asesoriaFormato } from 'src/app/models/asesoriaFormato';
import { AsesoriaService } from 'src/app/services/asesoria.service';
import { asesoria } from 'src/app/models/asesoria';
import { compromiso2 } from 'src/app/models/compromiso2';
import { Evaluacion } from 'src/app/models/evaluacion';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { etapa } from 'src/app/models/etapa';
import { sector } from 'src/app/models/sector';
import decode from 'jwt-decode';
import { convocatoria } from 'src/app/models/convocatoria';
import { runInThisContext } from 'vm';
import { proyecto } from 'src/app/models/proyecto';
import { asesor } from 'src/app/models/asesor';


let cargando = false;
let imprimir: any[] = [];

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  reporteForm: FormGroup;
  cont: number = 0;
  fin: number = 0;
  fin2: number = 0;
  final: number = 0;
  compromisos = [];
  condition: number = 0;
  plataforma: number = 0;
  rol: any;
  index: number = 0;

  constructor(public diagnosticoService: DiagnosticoService, private reporteService: ReporteService, private fb: FormBuilder, public seguimientoService: SeguimientoService, public loginService: LoginService, public asesoriaService: AsesoriaService) {
    this.buildForm();
  }

  ngOnInit() {
    this.getValidRol();
    this.getFacultades();
    this.getJornadas();
    this.getRoles();
    this.getTiposAsesorias();
  }

  buildForm() {
    this.reporteForm = this.fb.group({
      tipoReporte: ['', Validators.compose([Validators.required])]
    });
  }
  getFacultades() {
    this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];
      })
  }
  getJornadas() {
    this.loginService.getJornadas()
      .subscribe(res => {
        this.loginService.jornadas = res as jornada[];
      })
  }
  getRoles() {
    this.loginService.getRoles()
      .subscribe(res => {
        this.loginService.roles = res as rol[];
      })
  }
  getTiposAsesorias() {
    this.asesoriaService.getAsesorias()
      .subscribe(res => {
        this.asesoriaService.asesorias = res as asesoria[];
      })
  }
  getEtapas() {
    this.diagnosticoService.getEtapas()
      .subscribe(res => {
        this.diagnosticoService.etapas = res as etapa[];
      })
  }
  getSectores() {
    this.diagnosticoService.getSectores()
      .subscribe(res => {
        this.diagnosticoService.sectores = res as sector[];
      })
  }
  getUsuarios() {
    cargando = true;
    this.reporteService.getReporte()
      .subscribe(res => {
        this.index = 0;
        this.reporteService.usuarios = res as usuario[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'CORREO', 'CELULAR', 'ACTIVO', 'FECHA', 'ROL']);
        for (let usuario of this.reporteService.usuarios) {
          this.index++;
          imprimir.push([usuario.ID_USUARIO, usuario.NOMBRE, usuario.APELLIDO, usuario.CORREO, usuario.CELULAR, (usuario.ACTIVO == true) ? "Activo" : "Inactivo", usuario.FECHA,
          this.loginService.roles.filter(rol => rol.ID_ROL == usuario.ROL_ID_ROL)[0].NOMBRE_ROL]);
        }
        if (this.reporteService.usuarios.length == this.index) {
          this.descargarExcel('Reporte_Usuarios');
          cargando = false;
        }
      })
  }
  getEstudiantes() {
    cargando = true;
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        this.index = 0;
        this.seguimientoService.estudiantes = res as estudiante[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'CORREO', 'CELULAR', 'CODIGO', 'SEMESTRE', 'FACULTAD', 'JORNADA', 'ETAPA']);
        for (let estudiante of this.seguimientoService.estudiantes) {
          this.index++;
          imprimir.push([estudiante.ID_ESTUDIANTE, estudiante.NOMBRE, estudiante.APELLIDO, estudiante.CORREO, estudiante.CELULAR, estudiante.CODIGO, estudiante.SEMESTRE,
          this.loginService.facultades.filter(facultad => facultad.ID_FACULTAD == estudiante.FACULTAD_ID_FACULTAD)[0].NOMBRE_FACULTAD,
          this.loginService.jornadas.filter(jornada => jornada.ID_JORNADA == estudiante.JORNADA_ID_JORNADA)[0].NOMBRE_JORNADA, estudiante.ETAPA]);
        }
        if (this.seguimientoService.estudiantes.length == this.index) {
          this.descargarExcel('Reporte_Estudiantes');
          cargando = false;
        }
      })
  }
  getDiagnosticos() {
    cargando = true;
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        this.seguimientoService.estudiantes = res as estudiante[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'ID_DIAGNOSTICO', 'AMBITO SOCIAL', 'DESCRIPCION DEL PROYECTO',
          'SOCIOS CLAVE', 'ACTIVIDADES CLAVE', 'RECURSOS CLAVE', 'PROPUESTA VALOR', 'RELACION CLIENTES', 'CANALES',
          'SEGMENTOS CLIENTES', 'ESTRUCTURA DE COSTOS', 'FUENTE DE INGRESOS',
          'ETAPA',
          'TIPO DE ASESORIA REQUERIDA',
          'SECTOR DEL PROYECTO']);
        for (let estudiante of this.seguimientoService.estudiantes) {
          this.seguimientoService.getDiagnosticos(estudiante.ID_ESTUDIANTE)
            .subscribe(res => {
              this.seguimientoService.diagnosticos = res as Diagnostico[];
              this.fin = 0;
              for (let diagnostico of this.seguimientoService.diagnosticos) {
                imprimir.push([estudiante.ID_ESTUDIANTE, estudiante.NOMBRE, estudiante.APELLIDO, diagnostico.ID_FORMATO_DIAGNOSTICO, diagnostico.AMBITO_SOCIAL, diagnostico.DESCRIPCION_PROYECTO,
                diagnostico.SOCIOS_CLAVE, diagnostico.ACTIVIDADES_CLAVE, diagnostico.RECURSOS_CLAVE, diagnostico.PROPUESTA_VALOR, diagnostico.RELACION_CLIENTES, diagnostico.CANALES,
                diagnostico.SEGMENTOS_CLIENTES, diagnostico.ESTRUCTURA_COSTOS, diagnostico.FUENTE_INGRESOS,
                this.diagnosticoService.etapas.filter(etapa => etapa.ID_ETAPA == diagnostico.ETAPA_ID_ETAPA)[0].NOMBRE_ETAPA,
                this.asesoriaService.asesorias.filter(asesoria => asesoria.ID_TIPO_ASESORIA == diagnostico.TIPO_ASESORIA_ID_TIPO_ASESORIA)[0].NOMBRE_TIPO_ASESORIA,
                this.diagnosticoService.sectores.filter(sector => sector.ID_SECTOR == diagnostico.SECTOR_ID_SECTOR)[0].NOMBRE_SECTOR]);
                if (diagnostico == this.seguimientoService.diagnosticos[this.seguimientoService.diagnosticos.length - 1]) {
                  this.fin = 1;
                }
              }
              if (estudiante == this.seguimientoService.estudiantes[this.seguimientoService.estudiantes.length - 1] && (this.fin == 1 || this.seguimientoService.diagnosticos.length == 0)) {
                this.descargarExcel('Reporte_Diagnosticos');
                cargando = false;
              }
            })
        }
      })
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async getAsesorias() {
    cargando = true;
    this.final = 0;
    await this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        this.seguimientoService.estudiantes = res as estudiante[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'ID_ASESORIA', 'REQUERIMIENTO', 'DESCRIPCIÓN', 'RESULTADO',
          'ID_EVALUACIÓN',
          'TIPO DE ASESORIA REQUERIDA',
          'TIPO DE ASESORIA ACTUAL',
          'ID_COMPROMISO', 'ACTIVIDAD', 'FECHA', 'OBSERVACION', 'NOMBRE DEL RESPONSABLE', 'APELLIDO DEL RESPONSABLE',
          'ROL']);
        for (let estudiante of this.seguimientoService.estudiantes) {
          this.seguimientoService.getAsesorias(estudiante.ID_ESTUDIANTE)
            .subscribe(res => {
              this.seguimientoService.asesorias = res as asesoriaFormato[];
              if (this.seguimientoService.asesorias.length == 0 && estudiante == this.seguimientoService.estudiantes[this.seguimientoService.estudiantes.length - 1]) {
                this.fin2 = 1;
                this.fin = 1;
              }
              else {
                this.fin2 = 0;
              }
              for (let asesoria of this.seguimientoService.asesorias) {
                console.log("entro N veces");
                this.seguimientoService.getCompromisosAsesoria(asesoria.ID_FORMATO_ASESORIA)
                  .subscribe(res => {
                    this.seguimientoService.compromisos = res as compromiso2[];
                    if (this.seguimientoService.compromisos.length == 0 && asesoria == this.seguimientoService.asesorias[this.seguimientoService.asesorias.length - 1]) {
                      this.fin = 1;
                    }
                    if (this.seguimientoService.compromisos.length == 0) {
                      imprimir.push([estudiante.ID_ESTUDIANTE, estudiante.NOMBRE, estudiante.APELLIDO, asesoria.ID_FORMATO_ASESORIA, asesoria.REQUERIMIENTO, asesoria.DESCRIPCION, asesoria.RESULTADO,
                      asesoria.FORMATO_EVALUACION_ID_FORMATO_EVALUACION,
                      (asesoria.TIPO_ASESORIA_ID_TIPO_ASESORIA != null) ? this.asesoriaService.asesorias.filter(tipoAsesoria => tipoAsesoria.ID_TIPO_ASESORIA == asesoria.TIPO_ASESORIA_ID_TIPO_ASESORIA)[0].NOMBRE_TIPO_ASESORIA : 'N/A',
                      (asesoria.TIPO_ASESORIA_ACTUAL != null) ? this.asesoriaService.asesorias.filter(tipoAsesoria => tipoAsesoria.ID_TIPO_ASESORIA == asesoria.TIPO_ASESORIA_ACTUAL)[0].NOMBRE_TIPO_ASESORIA : 'N/A',
                        'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A',
                        'N/A']);
                    }
                    else {
                      this.fin = 0;
                      this.cont = 0;
                      for (let compromiso of this.seguimientoService.compromisos) {
                        if (this.cont == 0) {
                          imprimir.push([estudiante.ID_ESTUDIANTE, estudiante.NOMBRE, estudiante.APELLIDO, asesoria.ID_FORMATO_ASESORIA, asesoria.REQUERIMIENTO, asesoria.DESCRIPCION, asesoria.RESULTADO,
                          asesoria.FORMATO_EVALUACION_ID_FORMATO_EVALUACION,
                          (asesoria.TIPO_ASESORIA_ID_TIPO_ASESORIA != null) ? this.asesoriaService.asesorias.filter(tipoAsesoria => tipoAsesoria.ID_TIPO_ASESORIA == asesoria.TIPO_ASESORIA_ID_TIPO_ASESORIA)[0].NOMBRE_TIPO_ASESORIA : 'N/A',
                          (asesoria.TIPO_ASESORIA_ACTUAL != null) ? this.asesoriaService.asesorias.filter(tipoAsesoria => tipoAsesoria.ID_TIPO_ASESORIA == asesoria.TIPO_ASESORIA_ACTUAL)[0].NOMBRE_TIPO_ASESORIA : 'N/A',
                          compromiso.ID_COMPROMISO, compromiso.ACTIVIDAD, compromiso.FECHA, compromiso.OBSERVACION, compromiso.NOMBRE, compromiso.APELLIDO,
                          this.loginService.roles.filter(rol => rol.ID_ROL == compromiso.ROL_ID_ROL)[0].NOMBRE_ROL]);
                          this.cont++;
                        }
                        else {
                          imprimir.push([' ', ' ', ' ', ' ', ' ', ' ', ' ',
                            ' ',
                            ' ',
                            ' ',
                            compromiso.ID_COMPROMISO, compromiso.ACTIVIDAD, compromiso.FECHA, compromiso.OBSERVACION, compromiso.NOMBRE, compromiso.APELLIDO,
                            this.loginService.roles.filter(rol => rol.ID_ROL == compromiso.ROL_ID_ROL)[0].NOMBRE_ROL]);
                          this.cont++;
                        }
                        if (compromiso == this.seguimientoService.compromisos[this.seguimientoService.compromisos.length - 1]) {
                          this.fin = 1;
                        }
                      }
                    }
                    if (asesoria == this.seguimientoService.asesorias[this.seguimientoService.asesorias.length - 1]) {
                      this.fin2 = 1;
                    }

                  })
              }
              if (estudiante == this.seguimientoService.estudiantes[this.seguimientoService.estudiantes.length - 1] &&
                this.fin2 == 1 &&
                this.fin == 1) {
                  this.finalfinal('Reporte_Asesorias');
              }
            })
        }
      })

  }
  async finalfinal(nombre:string){
    await this.delay(1000);
    this.descargarExcel(nombre); 
    cargando = false;
  }
  getEvaluaciones() {
    cargando = true;
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        this.seguimientoService.estudiantes = res as estudiante[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'ID_EVALUACION',
          'EVAL_GENERAL_Q1', 'EVAL_GENERAL_Q2', 'EVAL_GENERAL_Q3', 'EVAL_GENERAL_Q4',
          'PERS_RESPONSABLE_Q1', 'PERS_RESPONSABLE_Q2', 'PERS_RESPONSABLE_Q3', 'PERS_RESPONSABLE_Q4', 'PERS_RESPONSABLE_Q5', 'PERS_RESPONSABLE_Q6',
          'INSTA_EQUIPOS_Q1', 'INSTA_EQUIPOS_Q2', 'INSTA_EQUIPOS_Q3',
          'YESNO_Q1', 'YESNO_Q2', 'YESNO_Q3', 'YESNO_Q4', 'YESNO_Q5',
          'OBSERVACIONES', 'FECHA',]);
        for (let estudiante of this.seguimientoService.estudiantes) {
          this.seguimientoService.getEvaluaciones(estudiante.ID_ESTUDIANTE)
            .subscribe(res => {
              this.seguimientoService.evaluaciones = res as Evaluacion[];
              this.fin = 0;
              for (let evaluacion of this.seguimientoService.evaluaciones) {
                imprimir.push([estudiante.ID_ESTUDIANTE, estudiante.NOMBRE, estudiante.APELLIDO, evaluacion.ID_FORMATO_EVALUACION,
                evaluacion.EVAL_GENERAL_Q1, evaluacion.EVAL_GENERAL_Q2, evaluacion.EVAL_GENERAL_Q3, evaluacion.EVAL_GENERAL_Q4,
                evaluacion.PERS_RESPONSABLE_Q1, evaluacion.PERS_RESPONSABLE_Q2, evaluacion.PERS_RESPONSABLE_Q3, evaluacion.PERS_RESPONSABLE_Q4, evaluacion.PERS_RESPONSABLE_Q5, evaluacion.PERS_RESPONSABLE_Q6,
                evaluacion.INSTA_EQUIPOS_Q1, evaluacion.INSTA_EQUIPOS_Q2, evaluacion.INSTA_EQUIPOS_Q3,
                (evaluacion.YESNO_Q1 == '1') ? "SI" : "NO", (evaluacion.YESNO_Q2 == '1') ? "SI" : "NO", (evaluacion.YESNO_Q3 == '1') ? "SI" : "NO", (evaluacion.YESNO_Q4 == '1') ? "SI" : "NO", (evaluacion.YESNO_Q5 == '1') ? "SI" : "NO",
                evaluacion.OBSERVACIONES, evaluacion.FECHA]);
                if (evaluacion == this.seguimientoService.evaluaciones[this.seguimientoService.evaluaciones.length - 1]) {
                  this.fin = 1;
                }
              }
              if (estudiante == this.seguimientoService.estudiantes[this.seguimientoService.estudiantes.length - 1] && (this.fin == 1 || this.seguimientoService.evaluaciones.length == 0)) {
                this.descargarExcel('Reporte_Evaluaciones');
                cargando = false;
              }
            })
        }
      })
  }
  getConvocatorias() {
    cargando = true;
    this.reporteService.getReporte()
      .subscribe(res => {
        this.reporteService.usuarios = res as usuario[];
        imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'ID_CONVOCATORIA',
          'NOMBRE', 'FECHA_INICIO', 'FECHA_FIN', 'FECHA_INFORME_INICIAL',
          'FECHA_INFORME_FINAL']);
        for (let usuario of this.reporteService.usuarios) {
          this.seguimientoService.getConvocatorias(usuario.ID_USUARIO)
            .subscribe(res => {
              this.seguimientoService.convocatorias = res as convocatoria[];
              this.fin = 0;
              for (let convocatoria of this.seguimientoService.convocatorias) {
                imprimir.push([usuario.ID_USUARIO, usuario.NOMBRE, usuario.APELLIDO, convocatoria.ID_CONVOCATORIA,
                convocatoria.NOMBRE, convocatoria.FECHA_INICIO, convocatoria.FECHA_FIN, convocatoria.FECHA_INFORME_INICIAL,
                convocatoria.FECHA_INFORME_FINAL]);
                if (convocatoria == this.seguimientoService.convocatorias[this.seguimientoService.convocatorias.length - 1]) {
                  this.fin = 1;
                }
              }
              if (usuario == this.reporteService.usuarios[this.reporteService.usuarios.length - 1] && (this.fin == 1 || this.seguimientoService.convocatorias.length == 0)) {
                this.descargarExcel('Reporte_Convocatorias');
                cargando = false;
              }
            })
        }
      })
  }
  traerTodosLosUsuarios() : Promise<usuario[]>{
    return new Promise (async (resolve,reject)=>{
      
   await  this.reporteService.getReporte()
    .subscribe(
      res =>{
        this.reporteService.usuarios = res as usuario[];
        resolve();
      },
      err => {
        reject(err);
      }
    )
    });
  }
  traerProyectosPorUsuario(id_usuario : number){

    return new Promise(async(resolve,reject)=>{
      await this.seguimientoService.getProyectos(id_usuario)
      .subscribe(
        res =>{
          this.seguimientoService.proyectos = res as proyecto[];
          resolve();
        },
        err => {
          reject(err);
        }
      )
    });

  }

  getFacultadDocente(id_usuario: number){
    return new Promise(async(resolve,reject)=>{
      await this.seguimientoService.getDocente(id_usuario)
      .subscribe(
        res => {
          this.seguimientoService.docente = res[0] as asesor;          
          resolve();
        },
        err => {
          reject(err);
        }
      )
    });
  }
  getFacultadEstudiante(id_usuario: number){
    return new Promise(async(resolve, reject)=>{
      await this.seguimientoService.getEstudiante(id_usuario)
      .subscribe(
        res => {
          this.seguimientoService.estudiante = res[0] as estudiante;
          resolve();
        },
        err =>  {
          reject(err);
        }
      )
    })
  }

  async getProyectos2(){
    try {

      cargando = true;

      imprimir.push(['ID', 'NOMBRE', 'APELLIDO', 'FACULTAD', 'ID_PROYECTO',
      'NOMBRE', 'ETAPA', 'FECHA', 'CORRECCIONES',
      'CORREGIDO', 'ID_CONVOCATORIA']); 

      await this.traerTodosLosUsuarios();
      const usuarios = this.reporteService.usuarios;
      for(let usuario of usuarios)
      {
          await this.traerProyectosPorUsuario(usuario.ID_USUARIO);
          const proyectos_usuario = this.seguimientoService.proyectos;
          if(usuario.ROL_ID_ROL == 2){
            await this.getFacultadDocente(usuario.ID_USUARIO);
            const docente = this.seguimientoService.docente;
            for(let proyecto of proyectos_usuario){
                imprimir.push([usuario.ID_USUARIO, usuario.NOMBRE, usuario.APELLIDO, this.loginService.facultades.filter(facultad => facultad.ID_FACULTAD == docente.FACULTAD_ID_FACULTAD)[0].NOMBRE_FACULTAD, proyecto.ID_PROYECTO,
                proyecto.NOMBRE_PROYECTO, proyecto.ETAPA, proyecto.FECHA, proyecto.CORRECCIONES,
                proyecto.CORREGIDO, proyecto.CONVOCATORIA_ID_CONVOCATORIA]);
            }
          }
          if(usuario.ROL_ID_ROL == 3){
            await this.getFacultadEstudiante(usuario.ID_USUARIO);
            const estudiante = this.seguimientoService.estudiante;
            for(let proyecto of proyectos_usuario){
                imprimir.push([usuario.ID_USUARIO, usuario.NOMBRE, usuario.APELLIDO, this.loginService.facultades.filter(facultad => facultad.ID_FACULTAD == estudiante.FACULTAD_ID_FACULTAD)[0].NOMBRE_FACULTAD, proyecto.ID_PROYECTO,
                proyecto.NOMBRE_PROYECTO, proyecto.ETAPA, proyecto.FECHA, proyecto.CORRECCIONES,
                proyecto.CORREGIDO, proyecto.CONVOCATORIA_ID_CONVOCATORIA]);
            }
          }
      }
      cargando = false;
      this.descargarExcel('Reporte_Proyectos');
      
    } catch (error) {
      console.log(error);
    }
  }




  generarExcel(form?) {
    imprimir = [];
    if (form.value.tipoReporte == 1) {
      this.getUsuarios();
    }
    else if (form.value.tipoReporte == 2) {
      this.getEstudiantes();
    }
    else if (form.value.tipoReporte == 3) {
      this.getEtapas();
      this.getSectores();
      this.getDiagnosticos();
    }
    else if (form.value.tipoReporte == 4) {
      this.getAsesorias();
    }
    else if (form.value.tipoReporte == 5) {
      this.getEvaluaciones();
    }
    else if (form.value.tipoReporte == 6) {
      this.getConvocatorias();
    }
    else if (form.value.tipoReporte == 7) {
      this.getProyectos2();
    }
  }
  descargarExcel(nombre: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(imprimir);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    const today = new Date();
    const date = '_' + today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();

    XLSX.writeFile(wb, nombre + date + '.xlsx');
  }

  resetForm() {
    this.reporteForm.reset();
  }
  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.rol = parseInt(tokenPayload.rol_usuario);
    this.plataforma = parseInt(tokenPayload.plataforma);
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
