import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AsesoriaService } from '../../services/asesoria.service';
import { estudiante } from '../../models/estudiante';
import { LoginService } from '../../services/login.service';
import { facultad } from '../../models/facultad';
import { jornada } from '../../models/jornada';
import { asesoria } from '../../models/asesoria';
import { asesoriaFormato } from '../../models/asesoriaFormato';
import { compromiso } from '../../models/compromiso';
import decode from 'jwt-decode';
import { EtapaService } from '../../services/etapa.service';

declare var M: any;
let cargando = false;

@Component({ 
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.css']
})
export class AsesoriaComponent implements OnInit {
  data_has: object;
  asesoriaForm: FormGroup;
  compromisoForm: FormGroup;
  etapa: number;
  formato: asesoriaFormato = {
    REQUERIMIENTO: '',
    DESCRIPCION: '',
    RESULTADO: '',
    TIPO_ASESORIA_ACTUAL: undefined,
    FECHA: '' 
  };

  compromiso: compromiso = {
    ACTIVIDAD: '',
    FECHA: '',
    OBSERVACION: '',
    ID_USUARIO: undefined
  };


  constructor(private fb: FormBuilder,
    public asesoriaService: AsesoriaService,
    private etapaService: EtapaService,
    public loginService: LoginService) { this.Buildform(); }

  ngOnInit() {
    this.getEstudiantes();
    this.getAsesorias();
    this.obtenerIDasesor();

  }
  Buildform() {
    this.asesoriaForm = this.fb.group({
      estudiante: ['', Validators.compose([Validators.required])],
      requerimiento_asesoria: ['', Validators.compose([Validators.required])],
      descripcion_asesoria: ['', Validators.compose([Validators.required])],
      resultado_asesoria: ['', Validators.compose([Validators.required])],
      asesoria_requerida: ['0', Validators.compose([Validators.required])],
    })

    this.compromisoForm = this.fb.group({
      actividad: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])],
      observacion: ['', Validators.compose([Validators.required])],
      responsable: ['', Validators.compose([Validators.required])],
    })
  }

  getEstudiantes() {
    cargando= true;
    this.asesoriaService.getEstudiantes()
      .subscribe(res => {
        cargando = false;
        console.log('trajo los estudiantes', res);
        this.asesoriaService.estudiantes = res as estudiante[];
      })
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

  getAsesorias() {
    this.asesoriaService.getAsesorias()
      .subscribe(res => {
        console.log('asesorias', JSON.stringify(res));
        this.asesoriaService.asesorias = res as asesoria[];
      })
  }

  @ViewChild('selectEstudiante') selectEstudiante;
  cambioEstudiante() {
    this.getFacultades();
    this.getJornadas();

    this.asesoriaService.selectedEstudiante = this.asesoriaService.estudiantes.filter(estudiante => estudiante.ID_ESTUDIANTE == this.selectEstudiante.nativeElement.value);
    this.asesoriaService.estudiantesFilter = this.asesoriaService.selectedEstudiante[0];
    this.asesoriaService.responsables[1].id = this.asesoriaService.estudiantesFilter.USUARIO_ID_USUARIO;
    this.asesoriaService.responsables[1].nombre = this.asesoriaService.estudiantesFilter.NOMBRE;
    this.getAsesoriaActual(this.asesoriaService.estudiantesFilter.ID_ESTUDIANTE);
  }


  enviarFormato(form: NgForm) {
    console.log('formulario ', form);
    this.formato.REQUERIMIENTO = form.value.requerimiento_asesoria;
    this.formato.DESCRIPCION = form.value.descripcion_asesoria;
    this.formato.RESULTADO = form.value.resultado_asesoria;
    this.formato.TIPO_ASESORIA_ID_TIPO_ASESORIA = form.value.asesoria_requerida;

    console.log('formato', this.formato);
    cargando=true;
    this.asesoriaService.postfFormatoAsesoria(this.formato)
      .subscribe(
        (res) => {
          console.log('respuesta de enviar formato', res);
          for (var i = 0, l = this.asesoriaService.compromisos.length; i < l; i++) {
            this.asesoriaService.compromisos[i].FORMATO_ASESORIA_ID_FORMATO_ASESORIA = res[0].ID_FORMATO_ASESORIA
          }

          this.data_has = {
            ESTUDIANTE_ID_ESTUDIANTE: this.asesoriaService.estudiantesFilter.ID_ESTUDIANTE,
            FORMATO_ASESORIA_ID_FORMATO_ASESORIA: res[0].ID_FORMATO_ASESORIA,
          }


        },
        (err) => { console.log('error en post formato', err); },

        () => {
          

          this.asesoriaService.postFormatoAsesoria2(this.data_has)
            .subscribe(
              (res) => { console.log('guardo tabla intermedia', res);
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FORMATO GUARDADO</h4>
                        <p>El formato asesoria ha sido creado satisfactoriamente</p>
                        <hr>
                    </div>`}); },
              (err) => { console.log('error guardadno tabla intermedia', err); },

              () => {
                
                this.etapa = 5;
                      this.etapaService.putEtapa(form.value.estudiante, this.etapa)
                        .subscribe(res => {
                          console.log(res);
                          cargando=false;
                          this.getEstudiantes();
                          this.resetForm();
                        });

                if (this.asesoriaService.compromisos.length > 0) {
                  this.asesoriaService.postCompromisos().subscribe(
                    (res) => { console.log('srespuesta de compromisos', res); },
                    (err) => { console.log('error enviando compromisos', err); },
                    () => {
                      
                    }
                  )
                }
              }
              

            )



        }
      )
  }
  resetForm() {
    this.asesoriaForm.reset();
    this.compromisoForm.reset();
  }
  addCompromiso(form: NgForm) {


    console.log('compromiso que va a guardar', form);
    const newcompromiso: compromiso = {
      ACTIVIDAD: form.value.actividad,
      FECHA: form.value.fecha,
      ID_USUARIO: form.value.responsable,
      OBSERVACION: form.value.observacion,
      FORMATO_ASESORIA_ID_FORMATO_ASESORIA: undefined
    };

    this.asesoriaService.compromisos.push(newcompromiso);

    console.log('arreglo compromisos ', this.asesoriaService.compromisos);
    this.compromisoForm.reset();

  }

  obtenerIDasesor() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);

    this.asesoriaService.responsables[0].id = tokenPayload.id_usuario;
    this.asesoriaService.responsables[0].nombre = tokenPayload.nombre_usuario;
  }

  obtenerNombreResponsable(id: number) {
    return this.asesoriaService.responsables.find(responsable => responsable.id == id).nombre;
  }


  borrarCompromiso(idx: number) {
    this.asesoriaService.compromisos.splice(idx, 1);
  }

  getAsesoriaActual(id_estudiante: number) {
    this.asesoriaService.getAsesoriaActual(id_estudiante)

      .subscribe(
        (res) => {
          console.log('repondio asesoria actual', res);
          this.formato.TIPO_ASESORIA_ACTUAL = res['tipo_asesoria_actual'];
          console.log('asesoria actual en el formato ', this.formato.TIPO_ASESORIA_ACTUAL);
        },
        (err) => { console.log('eeror en get asesori aactual', err); }
      )

  }

  requiereAsesoria(requiere: boolean) {
    if (requiere == false) {
      this.asesoriaForm.controls['asesoria_requerida'].setValue('0');
    }
    else if (requiere == true) {
      this.asesoriaForm.controls['asesoria_requerida'].setValue('');
    }
    console.log(this.asesoriaForm);
  }

  clickEstudiante() {
    this.getFacultades();
    this.getJornadas();
  }

  nombreFacultad(id_facultad: number) {
    return this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == id_facultad).NOMBRE_FACULTAD;
  }
  nombreJornada(id_jornada: number) {
    return this.loginService.jornadas.find(jornada => jornada.ID_JORNADA == id_jornada).NOMBRE_JORNADA;
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
