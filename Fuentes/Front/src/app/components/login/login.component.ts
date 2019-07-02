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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  condition: number = 0;
  tokenPayload;
  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() { 
    this.loginForm = this.fb.group({
      correo: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-z]*.[a-z]*@(usantotomas).(edu).(co)$/)])],
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
    console.log(form.value);
    this.loginService.authentication(form.value)
      .subscribe((data) => {        
        if (data['fail'] == 1) {          
          Cargando=true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                <p>Correo y/o contraseña incorrecta</p>
                <hr>
            </div>`});
        }
        else if (data['fail'] == 2) {
          Cargando=true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">FALLO AUTENTICACIÓN</h4>
                 <p>Correo y/o contraseña incorrecta</p>
                 <hr>
             </div>`});
        }
        else if (data['fail'] == 3) {
          Cargando=true;
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                 <h4 class="alert-heading">USUARIO INACTIVO</h4>
                 <p>El usuario ya se encuentra registrado, pero aun no ha sido activado</p>
                 <hr>
             </div>`});
        }
        else {
          localStorage.setItem('usuario', data['token']);
          this.router.navigate(['home'])
          this.tokenPayload = decode(data['token']);
        }

      });
  }


  yaCargo() {
    if (Cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}