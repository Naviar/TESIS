import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from '../../app-routing.module'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';
import { Usuario } from 'src/app/classes/usuario';


declare var M: any;
let Cargando = false;
let Cargando2 = false;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  recovery: FormGroup;
  changePassword: FormGroup;
  condition: number = 0;
  tokenPayload;
  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas)[.](edu)[.](co)$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.recovery = this.fb.group({
      correoRecovery: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas)[.](edu)[.](co)$/)])]
    });
    this.changePassword = this.fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas)[.](edu)[.](co)$/)])],
      key: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
    this.loginService.logout()
      .subscribe((data) => {
        localStorage.setItem('usuario', data['token']);
      });
    Cargando = true;
  }


  login(form?: NgForm) {
    Cargando = false;    
    this.loginService.authentication(form.value)
      .subscribe((data) => {
        if (data['fail'] == 1) {
          Cargando = true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                <p>Correo y/o contraseña incorrecta</p>
                <hr>
            </div>`});
        }
        else if (data['fail'] == 2) {
          Cargando = true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                 <p>Correo y/o contraseña incorrecta</p>
                 <hr>
             </div>`});
        }
        else if (data['fail'] == 3) {
          Cargando = true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">USUARIO INACTIVO</h4>
                 <p>El usuario ya se encuentra registrado, pero aun no ha sido activado</p>
                 <hr>
             </div>`});
        }
        else {
          localStorage.setItem('usuario', data['token']);
          this.router.navigate(['home']);
          this.tokenPayload = decode(data['token']);
        }

      });
  }
  recoveryCode() {
    Cargando2=true;
    var correo = this.recovery.controls['correoRecovery'].value;

    this.loginService.recoveryCode(correo)
      .subscribe(
        res => {          
          if (res['exito'] === true) {
            M.toast({
              html: `<div class="alert alert-info" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                         <h4 class="alert-heading">SOLICITUD DE CAMBIO DE CONTRASEÑA EXITOSO</h4>
                         <p>Se ha enviado un codigo al correo ${correo} para permitir el cambio de contraseña</p>
                         <hr>
                     </div>`});
                     Cargando2=false;
          }
        },
        err => { console.log('error en el post recoveryPassword', err); }
      )
  }
  recoveryPassword(form: NgForm) {
    Cargando2=true;
    const recovery: Object = {
      correo: form.value.correo,
      key: form.value.key,
      password: form.value.password
    }

    this.loginService.recoveryPassword(recovery)
      .subscribe(
        res => {
          console.log('respondio esto', res);
          if (res['error']) {
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                       <h4 class="alert-heading">ERROR EN EL SISTEMA</h4>
                                       <p>Ha ocurrido un error.</p>
                                       <hr>
                                   </div>`});
                                   Cargando2=false;
          }
          else if (res['exito'] === false) {

            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                       <h4 class="alert-heading">ERROR EN LA SOLICITUD DE CAMBIO DE CONTRASEÑA</h4>
                                       <p>${res['mensaje']}</p>
                                       <hr>
                                   </div>`});
                                   Cargando2=false;

          }
          else if (res['exito'] === true) {
            M.toast({
              html: `<div class="alert alert-info" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                                       <h4 class="alert-heading">CAMBIO DE CONTRASEÑA EXITOSO</h4>
                                       <p>${res['mensaje']}</p>
                                       <hr>
                                   </div>`});
                                   Cargando2=false;
          }
        },
        err => { console.log('error intentando recoveryPassword()', err); }
      )
  }

  yaCargo() {
    if (Cargando == false) {
      return false;
    } else {
      return true;
    }
  }
  yaCargo2() {
    if (Cargando2 == false) {
      return false;
    } else {
      return true;
    }
  }
}