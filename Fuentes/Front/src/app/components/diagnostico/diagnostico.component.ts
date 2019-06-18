import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { jornada } from 'src/app/models/jornada';
import { etapa } from 'src/app/models/etapa';
import { sector } from 'src/app/models/sector';
import { asesoria } from 'src/app/models/asesoria';
import { NgForm } from '@angular/forms';
import { Diagnostico } from 'src/app/models/diagnostico';
import { EtapaService } from 'src/app/services/etapa.service';

import decode from 'jwt-decode';

declare var M: any;

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  negocio: boolean = false;
  diagnosticoForm: FormGroup;
  negocioForm: FormGroup;
  etapa:number;
  constructor(private diagnosticoService: DiagnosticoService, private etapaService: EtapaService, private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.getEstudiantes();
    this.getEtapas();
    this.getSectores();
    this.getAsesorias();    
  }

  buildForm() {

    this.diagnosticoForm = this.fb.group({
      estudiante: ['', Validators.compose([Validators.required])],
      etapa_proyecto: ['', Validators.compose([Validators.required])],
      sector_proyecto: ['', Validators.compose([Validators.required])],
      ambito_social: ['', Validators.compose([Validators.required])],
      descripcion_proyecto: ['', Validators.compose([Validators.required])],
      tipo_asesoria: ['', Validators.compose([Validators.required])]
    });

    this.negocioForm = this.fb.group({
      socios_clave: ['', Validators.compose([Validators.required])],
      actividades_clave: ['', Validators.compose([Validators.required])],
      recursos_clave: ['', Validators.compose([Validators.required])],
      propuesta_valor: ['', Validators.compose([Validators.required])],
      relacion_clientes: ['', Validators.compose([Validators.required])],
      canales: ['', Validators.compose([Validators.required])],
      segmentos_clientes: ['', Validators.compose([Validators.required])],
      estructura_costos: ['', Validators.compose([Validators.required])],
      fuente_ingresos: ['', Validators.compose([Validators.required])]
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
  getEstudiantes() {
    this.diagnosticoService.getEstudiantes()
      .subscribe(res => {
        this.diagnosticoService.estudiantes = res as estudiante[];
      })
  }
  getAsesorias() {
    this.diagnosticoService.getAsesorias()
      .subscribe(res => {
        this.diagnosticoService.asesorias = res as asesoria[];
      })
  }
  @ViewChild('selectEstudiante') selectEstudiante;
  cambioEstudiante() {
    this.getFacultades();
    this.getJornadas();
    this.diagnosticoService.selectedEstudiante = this.diagnosticoService.estudiantes.filter(estudiante => estudiante.ID_ESTUDIANTE == this.selectEstudiante.nativeElement.value);
    this.diagnosticoService.estudiantesFilter = this.diagnosticoService.selectedEstudiante[0];
  }

  clickEstudiante() {
    this.getFacultades();
    this.getJornadas();
  }
  @ViewChild('slider') check;
  cambioSlider() {
    this.negocio = this.check.nativeElement.checked;
  }

  guardarDiagnostico(form?: NgForm, form2?: NgForm) {
    console.log("este es el form", form.value);
    form.value.actividades_clave = form2.value.actividades_clave;
    form.value.canales = form2.value.canales;
    form.value.estructura_costos = form2.value.estructura_costos;
    form.value.fuente_ingresos = form2.value.fuente_ingresos;
    form.value.propuesta_valor = form2.value.propuesta_valor;
    form.value.recursos_clave = form2.value.recursos_clave;
    form.value.relacion_clientes = form2.value.relacion_clientes;
    form.value.segmentos_clientes = form2.value.segmentos_clientes;
    form.value.socios_clave = form2.value.socios_clave;
    this.diagnosticoService.postDiagnostico(form.value)
      .subscribe((data: Diagnostico[]) => {
        this.diagnosticoService.putEstudiante(form.value.estudiante, data[0])
          .subscribe((data) => {
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                      <h4 class="alert-heading">FORMATO GUARDADO</h4>
                      <p>El formato diagnostico ha sido creado satisfactoriamente</p>
                      <hr>
                  </div>`});
            this.getEstudiantes();
            this.etapa=2;
            this.etapaService.putEtapa(form.value.estudiante, this.etapa)
            .subscribe(res =>{
              console.log(res); 
            });
            this.resetForm();
          });
      });
  }
  resetForm() {
    this.diagnosticoForm.reset();
    this.negocioForm.reset();
  }
  nombreFacultad(id_facultad : number){
    return this.loginService.facultades.find(facultad => facultad.ID_FACULTAD == id_facultad).NOMBRE_FACULTAD;
  }
  nombreJornada(id_jornada : number){
    return this.loginService.jornadas.find(jornada => jornada.ID_JORNADA == id_jornada).NOMBRE_JORNADA;
  }
}
