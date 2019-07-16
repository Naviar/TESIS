import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import decode from 'jwt-decode';
import { EtapaService } from '../../services/etapa.service';
import { Router } from '@angular/router';

declare var M: any;
let cargando = true;

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  etapa_estudiante: number;
  id_estudiante: number;
  evaluacionForm: FormGroup;
  etapa: number;

  constructor(private fb: FormBuilder, private evaluacionService: EvaluacionService, private etapaService: EtapaService , private router : Router) {
    this.buildForm();
  }

  ngOnInit() {
    this.getValidRol();

  }

  buildForm() {

    this.evaluacionForm = this.fb.group({
      eval_general_q1: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      eval_general_q2: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      eval_general_q3: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      eval_general_q4: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q1: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q2: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q3: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q4: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q5: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      pers_responsable_q6: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      insta_equipos_q1: ['', Validators.compose([Validators.required, Validators.max(4), Validators.min(1)])],
      insta_equipos_q2: ['', Validators.compose([Validators.max(4), Validators.min(1)])],
      insta_equipos_q3: ['', Validators.compose([Validators.max(4), Validators.min(1)])],
      yesno_q1: [false, Validators.compose([])],
      yesno_q2: [false, Validators.compose([])],
      yesno_q3: [false, Validators.compose([])],
      yesno_q4: [false, Validators.compose([])],
      yesno_q5: [false, Validators.compose([])],
      observaciones: ['', Validators.compose([])]
    });
    cargando=false;

  }

  guardarEvaluacion(form?: NgForm) {
    cargando = true;
    console.log("formulariooo", form.value);
    this.evaluacionService.postEvaluacion(form.value)

      .subscribe((data) => {
        console.log("volvemosooo", data);
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">FORMATO GUARDADO</h4>
                  <p>El formato evaluacion ha sido creado satisfactoriamente</p>
                  <hr>
              </div>`});
        cargando=false;
        this.resetForm();
        this.buildForm();
        if (this.etapa_estudiante === 2) {
          this.evaluacionService.actualizarEvaluacionDiagnostico(data[0].ID_FORMATO_EVALUACION, this.id_estudiante)
            .subscribe(
              (res) => { console.log('actualizo la evaluacion del diagnostico', res); },
              (err) => { console.log('error en el update del diagnostico eval', err); },
              () => {
              this.etapa = 3;
                this.etapaService.putEtapa(this.id_estudiante, this.etapa)
                  .subscribe(res => {
                    console.log(res);
                  });
              }
            )
        }

        if (this.etapa_estudiante === 5) {
          this.evaluacionService.actualizarEvaluacionAsesoria(data[0].ID_FORMATO_EVALUACION, this.id_estudiante)
            .subscribe(
              (res) => { console.log('actualizo la evaluacion de la asesoria'); },
              (err) => { console.log('error en el update de la asesoria eval'); },
              () => {
              // this.etapa = 6;
              //   this.etapaService.putEtapa(this.id_estudiante, this.etapa)
              //     .subscribe(res => {
              //       console.log(res);
              //     });
              }
            )
        }

      },
      (err)=>{
       console.log('error',err);},
       () => {this.router.navigate(['home']);} 
        
        );
  }


  resetForm() {
    this.evaluacionForm.reset();
  }

  keyPress(event: any) {
    const pattern = /^[1-4]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar) || event.path[0].value > 0) {
      event.preventDefault();
    }
  }

  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.id_estudiante = parseInt(tokenPayload.id_estudiante);


    console.log("ESTE es el id_estudiante de este men", this.id_estudiante);

    this.etapaService.getEtapa(this.id_estudiante)
      .subscribe(
        (res) => {
          console.log('la respuesta de getetapa', res['ETAPA']);
          this.etapa_estudiante = res['ETAPA'];
          console.log(this.etapa_estudiante);
        },
        (err) => { console.log('error intentando hacer el get etapa:', err); }
      )
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
