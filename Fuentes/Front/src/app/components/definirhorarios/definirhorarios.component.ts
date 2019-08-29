import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Horario } from 'src/app/models/horario'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HorariosService } from 'src/app/services/horarios.service';
import { TipoReunion } from '../../models/tiporeunion';
import { TipoAsesoria } from '../../models/tipoasesoria';
import { Disponibilidad } from '../../models/disponibilidad';
import { promise } from 'protractor';
import { resolve } from 'path';
import decode from 'jwt-decode'
import { NgForm } from '@angular/forms';  
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

declare var M: any;
let cargando = true;
@Component({
  selector: 'app-definirhorarios',
  templateUrl: './definirhorarios.component.html',
  styleUrls: ['./definirhorarios.component.css']
})

export class DefinirhorariosComponent implements OnInit {

  actualizando = false;
  rol_usuario:number = null;
  
  tiposReunion: TipoReunion[] = [];
  tiposReunionTemp : TipoReunion[] = [];
  tiposAsesoria: TipoAsesoria[] = [];
  horarios: Horario[];
  horarioForm: FormGroup;
  horarioForm2: FormGroup;

  fechaActual: Date;
  Dias: any[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  horarioSelect: Horario = {

    DIA: this.Dias[1],
    HORA_INICIO: "",
    HORA_FIN: "",
    LUGAR:'',
    TIPO_REUNION_ID_TIPO_REUNION: null,
    TIPO_ASESORIA_ID_TIPO_ASESORIA: null,
    USUARIO_ID_USUARIO: 1,
    NOMBRE_TIPO_ASESORIA:"" 
  }

  disponibilidadSelect: Disponibilidad = {
    FECHA: [],
    HORARIO_ID_HORARIO: null
  }

  Disponibilidades = new Array();
  diaSelect: string;


  idUltimoHorario: number;

  constructor(private atp: AmazingTimePickerService, private _horarioService: HorariosService, private fb: FormBuilder , 
    private router : Router) {
    this.fechaActual = new Date();
    this.buildForm();    
  }
  
  ngOnInit() {

    this.getValidRol();
    this.getTiposAsesorias();
    this.getTipoReunion();
    this.getHorarios(this.horarioSelect.USUARIO_ID_USUARIO);
  }

  buildForm() {

    this.horarioForm = this.fb.group({      
      dia: ['', Validators.compose([Validators.required]) ],
      tipo_reunion: ['', Validators.compose([Validators.required]) ],
      // hora_inicio: ['', Validators.compose([Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9] [a|p]. m.*$/)]) ],
      hora_inicio: ['', Validators.compose([Validators.required]) ],
      lugar: ['', Validators.compose([Validators.required ])],
      hora_fin: ['', Validators.compose([Validators.required]) ]
    });
    this.horarioForm2 = this.fb.group({    
      tipo_asesoria: ['', Validators.compose([Validators.required]) ],
    });
  }

  getHorarios(codigo: number) {


    this._horarioService.getHorarios(codigo)
      .subscribe(
        res => {
          cargando = false;
          console.log("horarios guardados:", res);
          this.horarios = res as Horario[]
          console.log('horarios guardados en array:', this.horarios);
          
        },
        err => { console.log("error obteniendo horarios:", err); },
        () => { }
        
      );


  }

  getTipoReunion() {
    this._horarioService.getTipoReunion()
      .subscribe(
        res => {
          console.log("tipos de reunion:", res);
          this.tiposReunion = res as TipoReunion[]
        },
        err => { console.log("error obteniendo tipos de reunion:", err); },
        () => {if(this.rol_usuario==1){this.tiposReunionTemp=this.tiposReunion.slice(0,1)}
                if(this.rol_usuario==2){this.tiposReunionTemp=this.tiposReunion.slice(1,2)}}

      )
  }

  getTiposAsesorias() {
    this._horarioService.getTipoAsesoria()
      .subscribe(
        res => {
          console.log("tipos de asesorias:", res);
          this.tiposAsesoria = res as TipoAsesoria[]
        },
        err => { console.log("hubo un error obteniendo tipos asesorias", err); }
      )
  }

  verificarCruce(h_i:number , dia:string ,h_f:number){
    var horarioCruce : Horario[] = []
    
    horarioCruce = this.horarios.filter(horario => horario.DIA==dia && (parseInt(horario.HORA_INICIO.replace(':',''))<=h_i && parseInt(horario.HORA_FIN.replace(':',''))>h_i
                                          || parseInt(horario.HORA_INICIO.replace(':','')) < h_f && parseInt(horario.HORA_FIN.replace(':','')) >= h_f || parseInt(horario.HORA_FIN.replace(':','')) > h_i 
                                            && parseInt(horario.HORA_FIN.replace(':','')) < h_f ));
    if(horarioCruce.length > 0){ 
      return true; }
    else {
      return false;}
  }

  sendHorario(form?: NgForm, form2?: NgForm) {
    // this.resetForm();
    //validar las horas
    cargando = true;
    const h_i = parseInt(this.horarioSelect.HORA_INICIO.replace(':',''));
    const h_f = parseInt(this.horarioSelect.HORA_FIN.replace(':',''));

    // pasar datos de formulario al horarioselect
    this.horarioSelect.DIA = form.value.dia;
    this.horarioSelect.TIPO_REUNION_ID_TIPO_REUNION = form.value.tipo_reunion;
    this.horarioSelect.TIPO_ASESORIA_ID_TIPO_ASESORIA = form2.value.tipo_asesoria;
    this.horarioSelect.LUGAR = form.value.lugar;

    if(h_i > h_f){
      cargando = false;
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 10000;" role="alert">
            <h4 class="alert-heading">ERROR EN LA HORA</h4>
            <p>La hora final debe ser mayor a la hora de inicio de la reunion</p>
            <hr>
        </div>`});
    }
    else if (this.verificarCruce(h_i , this.horarioSelect.DIA , h_f)){
      cargando = false;  
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 10000;" role="alert">
            <h4 class="alert-heading">CRUCE DE HORARIO</h4>
            <p>El horario que esta intentando agregar se cruza con uno de sus horarios actuales</p>
            <hr>
        </div>`});
    }
    else{
    
    // this.calcularDisponibilidades();

    console.log("horarioSelect:", this.horarioSelect);
    this._horarioService.postHorario(this.horarioSelect)
      .subscribe(
        res => { console.log("respuesta sendhorarios: ", res); },
        err => { console.log(err); },
        () => {
          this._horarioService.getHorarios(this.horarioSelect.USUARIO_ID_USUARIO)
          .subscribe(
            res => {
              cargando = false;
              console.log(res);
              this.horarios = res as Horario[];
              this.resetForm();
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 10000;" role="alert">
                    <h4 class="alert-heading">HORARIO GUARDADO</h4>
                    <p>El horario se almaceno con exito.</p>
                    <hr>
                </div>`});
            },
            err => { console.log(err); },
            // () => { this.postDisponibilidades(); }
          )
        })

      }

  }

  getIdUltimoHorario() {
    this.disponibilidadSelect.HORARIO_ID_HORARIO = this.horarios[this.horarios.length - 1].ID_HORARIO

  }

  deleteHorario(id: string) {
    cargando = true;
    console.log("Llegoo con estooo", id)
    this._horarioService.deleteHorario(id)
      .subscribe(
        res => { console.log('respuesta delete:',res);
                  if(res.hasOwnProperty('fallo')){
                    cargando = false;
                    M.toast({
                      html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                          <h4 class="alert-heading">ERROR BORRANDO EL HORARIO</h4>
                          <p>Es posible que ya tenga una cita agendada en este horario</p>
                          <hr>
                      </div>`});
                  } 
                
                },
        err => { console.log('error en delete horario', err);
                  
                    
                   },
        () => {
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">HORARIO BORRADO</h4>
                <p>Horario borrado con exito.</p>
                <hr>
            </div>`}); 
          this.getHorarios(this.horarioSelect.USUARIO_ID_USUARIO) }
      )

  }


  // guardar hora de inicio 
  saveTimeInicio() {
    const amazingTimePicker = this.atp.open({
      theme: 'material-blue',
      time: this.horarioSelect.HORA_INICIO
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.horarioSelect.HORA_INICIO = time;
      this.horarioForm.controls['hora_inicio'].setValue(time);
      // + ( time > 12 ? 'am' : 'pm');
    });
  }

  saveTimeFinal() {
    const amazingTimePicker = this.atp.open({
      theme: 'material-blue',
      time: this.horarioSelect.HORA_FIN
    });
    amazingTimePicker.afterClose().subscribe(time => {
      
      this.horarioSelect.HORA_FIN = time;
      this.horarioForm.controls['hora_fin'].setValue(time);
      
      // + ( time > 12 ? 'am' : 'pm');
    });
  }

  getValidRol(){
    
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token); 

    this.rol_usuario = tokenPayload.rol_usuario;
    console.log('rollll:',this.rol_usuario);
    

    this.horarioSelect.USUARIO_ID_USUARIO = parseInt(tokenPayload.id_usuario);
  }


  resetForm(){
    this.horarioForm.reset();    
  }

  nombreReunion(id_reunion : number){
    return this.tiposReunion.find(tipoReunion => tipoReunion.ID_TIPO_REUNION == id_reunion).NOMBRE_TIPO_REUNION;
  }

  nombreAsesoria(id_asesoria : number){
    return this.tiposAsesoria.find(tipoAsesoria => tipoAsesoria.ID_TIPO_ASESORIA == id_asesoria).NOMBRE_TIPO_ASESORIA;
  }

  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
