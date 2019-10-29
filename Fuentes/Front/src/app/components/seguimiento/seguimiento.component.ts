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
import decode from 'jwt-decode'
import { Router } from '@angular/router'
import { Diagnostico } from 'src/app/models/diagnostico';
import { asesoriaFormato } from 'src/app/models/asesoriaFormato';
import { Evaluacion } from 'src/app/models/evaluacion';


declare var M: any;
let cargando = false;

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  
  seguimientoForm: FormGroup;
  usuario_id: number;
  estudiante_id: number;
  rol: number;
  ruta: string;

  constructor(public diagnosticoService: DiagnosticoService, public asesoriaService: AsesoriaService, public loginService: LoginService, public seguimientoService: SeguimientoService, private fb: FormBuilder, private router: Router) {
    this.buildForm();
  }


  ngOnInit() {
    this.getEstudiantes();
    this.getFacultades();
    this.getJornadas();
    this.getValidRol();
  }

  buildForm() {
    this.seguimientoForm = this.fb.group({
      estudiante: ['', Validators.compose([Validators.required])],
      formato: ['', Validators.compose([Validators.required])],
      selectedFormato: ['', Validators.compose(null)],
      selectedFormato2: ['', Validators.compose(null)],
      selectedFormato3: ['', Validators.compose(null)]
    });
  }
  getEstudiantes() {
    cargando = true;
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {        
        this.seguimientoService.estudiantes = res as estudiante[];
        cargando=false;
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
  @ViewChild('selectFormato') selectFormato;
  cambioEstudiante() {
    if(this.selectFormato != undefined){
      this.cambioFormato(this.selectFormato.nativeElement.value, this.selectEstudiante.nativeElement.value)
    }
    this.getFacultades();
    this.getJornadas();
    this.diagnosticoService.selectedEstudiante = this.seguimientoService.estudiantes.filter(estudiante => estudiante.ID_ESTUDIANTE == this.selectEstudiante.nativeElement.value);
    this.diagnosticoService.estudiantesFilter = this.diagnosticoService.selectedEstudiante[0];
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
  buscarFormato(form?: NgForm){
    console.log("FORMATO", form.value);
    if(form.value.formato==1){         
      this.ruta = "see/diagnostic/" + form.value.selectedFormato;      
      this.router.navigate([this.ruta]);
    }
    else if(form.value.formato==2){
      this.ruta = "see/advisory/" + form.value.selectedFormato2;      
      this.router.navigate([this.ruta]);
    }
    else if(form.value.formato==3){
      this.ruta = "see/evaluation/" + form.value.selectedFormato3;      
      this.router.navigate([this.ruta]);
    }
  }
  
  cambioFormato(tipo_formato:number, id_estudiante:number){
    cargando=true;
    const formato1 = this.seguimientoForm.get('selectedFormato');
    const formato2 = this.seguimientoForm.get('selectedFormato2');
    const formato3 = this.seguimientoForm.get('selectedFormato3');
    if(tipo_formato == 1){
      formato1.setValidators([Validators.required]);      
      this.seguimientoService.getDiagnosticos(id_estudiante)
      .subscribe(res=>{
        this.seguimientoService.diagnosticos = res as Diagnostico[];
        cargando=false;
      })
    }
    else if(tipo_formato == 2){
      formato2.setValidators([Validators.required]);
      this.seguimientoService.getAsesorias(id_estudiante)
      .subscribe(res=>{
        this.seguimientoService.asesorias = res as asesoriaFormato[];        
        cargando=false;
      })
    }
    else if(tipo_formato == 3){      
      formato3.setValidators([Validators.required]);
      this.seguimientoService.getEvaluaciones(id_estudiante)
      .subscribe(res=>{
        this.seguimientoService.evaluaciones = res as Evaluacion[];
        cargando=false;
      })
    }
  }


  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
    this.estudiante_id = parseInt(tokenPayload.id_estudiante);
    this.rol = parseInt(tokenPayload.rol_usuario);
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
