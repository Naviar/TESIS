import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { register } from '../../models/register'
import decode from 'jwt-decode'
import { rol } from 'src/app/models/rol';
import { facultad } from 'src/app/models/facultad';
import { jornada } from 'src/app/models/jornada';
import { asesor } from 'src/app/models/asesor';

declare var M: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  estudianteForm: FormGroup;
  asesorForm: FormGroup;
  tokenPayload;
  conditionRol: number = 0;
  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }
  buildForm() {
    this.registerForm = this.fb.group({
      nombre_usuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z]*$/)])],
      apellido_usuario: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z A-Z]*$/)])],
      celular: ['', Validators.compose([Validators.required, Validators.min(3000000000), Validators.max(3999999999), Validators.pattern(/^[0-9]*$/)])],
      correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas).(edu).(co)$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      rol: ['', Validators.compose([Validators.required])]
    });
    this.estudianteForm = this.fb.group({
      codigo_estudiante: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      semestre_estudiante: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(10), Validators.min(1)])],
      facultad: ['', Validators.compose([Validators.required])],
      jornada: ['', Validators.compose([Validators.required])]
    });
    this.asesorForm = this.fb.group({
      facultad: ['', Validators.compose([Validators.required])]
    });
  }
  ngOnInit() {
    this.getRoles();
    this.getFacultades();
    this.getJornadas();
  }

  register(form?: NgForm) {
    this.loginService.usuarioDuplicado(form.value)
      .subscribe((data) => {
        console.log("esto llegoooooooo", data);
        if (data[0].DUPLICATE == 0) {
          this.loginService.register(form.value)
            .subscribe((data) => {
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                        <p>El usuario se ha registrado correctamente y espera activacion</p>
                        <hr>
                    </div>`});
                    this.router.navigate(['login'])
            });
        }
        else {
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">FALLO REGISTRO</h4>
                    <p>El celular y/o correo que diligencio ya se encuentra registrado</p>
                    <hr>
                </div>`});
        }
      });
  }
  registerAsesor(form?: NgForm, form2?: NgForm) {
    this.loginService.usuarioDuplicado(form.value)
      .subscribe((data) => {
        console.log("esto llegoooooooo", data);
        if (data[0].DUPLICATE == 0) {
          this.loginService.register(form.value)
            .subscribe((dataa) => {
              this.loginService.getIdUsuario(form.value.correo)
                .subscribe((data) => {
                  console.log("esto responde", data[0].ID_USUARIO);
                  form2.value.id_usuario = data[0].ID_USUARIO;
                  this.loginService.registerAsesor(form2.value)
                    .subscribe((data) => {
                      M.toast({
                        html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                                <p>El usuario se ha registrado correctamente y espera activacion</p>
                                <hr>
                            </div>`});
                      this.router.navigate(['login'])
                    });
                });
            });

        }
        else {
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">FALLO REGISTRO</h4>
              <p>El celular y/o correo que diligencio ya se encuentra registrado</p>
              <hr>
          </div>`});
        }
      });
  }
  registerEstudiante(form?: NgForm, form2?: NgForm) {
    this.loginService.usuarioDuplicado(form.value)
      .subscribe((data) => {
        
        if (data[0].DUPLICATE == 0) {
          console.log("formularioo",form.value);
          this.loginService.estudianteDuplicado(form2.value)
            .subscribe((data) => {
              console.log("esto llegoooooooo", data[0].DUPLICATE);
              if (data[0].DUPLICATE == 0) {
                this.loginService.register(form.value)
                  .subscribe((dataa) => {
                    this.loginService.getIdUsuario(form.value.correo)
                      .subscribe((data) => {
                        console.log("esto responde", data[0].ID_USUARIO);
                        form2.value.id_usuario = data[0].ID_USUARIO;
                        this.loginService.registerEstudiante(form2.value)
                          .subscribe((data) => {
                            M.toast({
                              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                      <h4 class="alert-heading">REGISTRO COMPLETADO</h4>
                                      <p>El usuario se ha registrado correctamente y espera activacion</p>
                                      <hr>
                                  </div>`});
                            this.router.navigate(['login'])
                          });
                      });
                  });
              }
              else {
                M.toast({
                  html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                    <h4 class="alert-heading">FALLO REGISTRO</h4>
                    <p>El codigo que diligencio ya se encuentra registrado</p>
                    <hr>
                </div>`});
              }
            });
        }
        else {
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">FALLO REGISTRO</h4>
              <p>El celular y/o correo que diligencio ya se encuentra registrado</p>
              <hr>
          </div>`});
        }
      });
  }
  getRoles() {
    this.loginService.getRoles()
      .subscribe(res => {
        this.loginService.roles = res as rol[];
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

}