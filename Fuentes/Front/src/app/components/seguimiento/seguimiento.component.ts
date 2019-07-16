import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { AsesoriaService } from 'src/app/services/asesoria.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { jornada } from 'src/app/models/jornada';

declare var M: any;
let cargando = false;

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  seguimientoForm: FormGroup;

  constructor(public diagnosticoService: DiagnosticoService, public asesoriaService: AsesoriaService, public loginService: LoginService, public seguimientoService: SeguimientoService, private fb: FormBuilder) {
    this.buildForm();
  }


  ngOnInit() {
    this.getEstudiantes();
  }

  buildForm() {
    this.seguimientoForm = this.fb.group({
      estudiante: ['', Validators.compose([Validators.required])]
    });
  }
  getEstudiantes() {
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        console.log("ha vuelto", res);
        this.seguimientoService.estudiantes = res as estudiante[];
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
  @ViewChild('selectEstudiante') selectEstudiante;
  cambioEstudiante() {
    this.getFacultades();
    this.getJornadas();
    this.diagnosticoService.selectedEstudiante = this.seguimientoService.estudiantes.filter(estudiante => estudiante.ID_ESTUDIANTE == this.selectEstudiante.nativeElement.value);
    this.diagnosticoService.estudiantesFilter = this.diagnosticoService.selectedEstudiante[0];
  }

  clickEstudiante() {
    this.getFacultades();
    this.getJornadas();
  }
  resetForm() {
    this.seguimientoForm.reset();
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
