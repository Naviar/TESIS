import { Component, OnInit, ViewChild } from '@angular/core';
import { AgendarCitaService } from '../../services/agendar-cita.service';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import decode from 'jwt-decode'
import { Horario } from 'src/app/models/horario';
import { Disponibilidad2 } from 'src/app/models/disponibilidad2';
import { DatePipe } from '@angular/common';
import { HorariosService } from 'src/app/services/horarios.service';
import { TipoReunion } from 'src/app/models/tiporeunion';
import { TipoAsesoria } from 'src/app/models/tipoasesoria';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CitasPendientes } from 'src/app/services/citaspendientes.service';
import { estudiante } from 'src/app/models/estudiante';
import { LoginService } from 'src/app/services/login.service';
import { facultad } from 'src/app/models/facultad';
import { EtapaService } from '../../services/etapa.service';

declare var M: any;
let cargando = true;

@Component({
  selector: 'app-citaspendientes',
  templateUrl: './citaspendientes.component.html',
  styleUrls: ['./citaspendientes.component.css']
})
export class CitaspendientesComponent implements OnInit {

  @ViewChild("CALENDARIO") calendarComponent: FullCalendarComponent;


  private modalOpen: boolean = false;
  private modalOpen2 : boolean = false;
   
  etapa : number ;
  tiposReunion: TipoReunion[] = [];
  tiposAsesoria: TipoAsesoria[] = [];
  calendarPlugins = [dayGridPlugin];
  Dias: any[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  tipoReunion: string;
  vez: number = 0;
  fecha: string;
  fecha2: string;
  horario_id: number;
  usuario_id: number;
  estudiante_id: number;
  rol: number;
  titulo: string;
  cancelarCitaForm : FormGroup;
  nombre: string;
  correo: string;
  celular: string;
  codigo: string;
  semestre: string;
  facultad: string;

  horarioSelect: Horario = {
    ID_HORARIO: 1, 
    DIA: this.Dias[1],
    HORA_INICIO: "",
    HORA_FIN: "",
    LUGAR: '',
    TIPO_REUNION_ID_TIPO_REUNION: null,
    TIPO_ASESORIA_ID_TIPO_ASESORIA: null,
    USUARIO_ID_USUARIO: 1,
    NOMBRE_TIPO_ASESORIA: ""
  }

  // disponibilidades: { FECHA: string, ID_ESTUDIANTE: number, HORARIO_ID_HORARIO: number}[] = [{ FECHA: '', ID_ESTUDIANTE: 0, HORARIO_ID_HORARIO: 0}];
  idDisponibilidadSelect : number =null;
  idHorarioSelect : number = null;
  disponibilidades: Disponibilidad2[] = [];


  constructor(private etapaService : EtapaService,private fb : FormBuilder,private agendarCitaService: AgendarCitaService, private citasPendientesService: CitasPendientes, private datePipe: DatePipe, private _horarioService: HorariosService,  public loginService: LoginService) {

  }

  ngOnInit() {
    
    this.getFacultades();
    this.getValidRol();
    this.getCitasPendientes();
    this.getTiposAsesorias();
    this.getTipoReunion();
    this.buildFormCancelar();
  }

  getCitasPendientes() {
    cargando = true;
    if (this.rol == 1) {            //LIDER      
      this.citasPendientesService.getCitasLider(this.usuario_id)
        .subscribe(res => {
          this.disponibilidades = res as Disponibilidad2[];
          this.calendario();
        })
    }
    else if (this.rol == 2) {       //ASESOR    
      this.citasPendientesService.getCitasAsesor(this.usuario_id)
        .subscribe(res => {
          this.disponibilidades = res as Disponibilidad2[];
          this.calendario();
        })
    }
    else if (this.rol == 3) {       //ESTUDIANTE  
      this.citasPendientesService.getCitasEstudiante(this.estudiante_id)
        .subscribe(res => {
          this.disponibilidades = res as Disponibilidad2[];
          this.calendario();
        })
    }


  }

  calendario() {
    let cal = this.calendarComponent.getApi();
    // cal.removeAllEvents();    
    if (this.disponibilidades.length < 1) {
      M.toast({
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">NO TIENE CITAS</h4>
            <p>El usuario no tiene citas pendientes actualmente</p>
            <hr>
        </div>`});
      cargando = false;
    }
    else {
      for (let disponibilidad of this.disponibilidades) {
        this.citasPendientesService.getHorario(disponibilidad.HORARIO_ID_HORARIO)
          .subscribe(res => {
            this.agendarCitaService.horarioSelect = res as Horario;
            if (this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION == 1) {
              cal.addEvent({ title: 'Cita ' + this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION, start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO, backgroundColor: "RED", groupId: disponibilidad.ID_DISPONIBILIDAD });
            }
            else if (this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION == 2) {
              cal.addEvent({ title: 'Cita ' + this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION, start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO, backgroundColor: "RED", groupId: disponibilidad.ID_DISPONIBILIDAD });
            }
            if (disponibilidad == this.disponibilidades[this.disponibilidades.length - 1]) {
              cargando = false;
            }
          })
      }
      cargando = false;
    }
  }

  evento(info) {
    cargando = true;
    console.log("evento clickeado", info);
    this.idDisponibilidadSelect = info.event.groupId;
    this.idHorarioSelect = info.event.id;
    this.agendarCitaService.getHorarioId(info.event.id)
      .subscribe(res => {
        this.agendarCitaService.horarioSelect = res as Horario;
        this.horarioSelect = this.agendarCitaService.horarioSelect[0];
        this.tipoReunion = this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION;
        this.fecha = info.event.start;
        this.fecha2 = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
        this.horario_id = info.event.id;
        if (this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION == 1) {
          this.titulo = "Diagnostico";
        }
        else if (this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION == 2) {
          this.titulo = this.tiposAsesoria.find(asesoria => asesoria.ID_TIPO_ASESORIA == this.agendarCitaService.horarioSelect[0].TIPO_ASESORIA_ID_TIPO_ASESORIA).NOMBRE_TIPO_ASESORIA;
        }
        this.agendarCitaService.getDisponibilidadId(this.idDisponibilidadSelect)
        .subscribe(res=>{
          this.agendarCitaService.disponibilidadSelect = res as Disponibilidad2;          
          this.citasPendientesService.getEstudiante(this.agendarCitaService.disponibilidadSelect[0].ID_ESTUDIANTE)
          .subscribe(res=>{
            this.citasPendientesService.estudiante = res as estudiante;
            this.nombre = this.citasPendientesService.estudiante[0].NOMBRE + " " + this.citasPendientesService.estudiante[0].APELLIDO;     
            this.correo = this.citasPendientesService.estudiante[0].CORREO;
            this.celular = this.citasPendientesService.estudiante[0].CELULAR;  
            this.codigo = this.citasPendientesService.estudiante[0].CODIGO;    
            this.facultad = this.loginService.facultades.filter(facultad => facultad.ID_FACULTAD == this.citasPendientesService.estudiante[0].FACULTAD_ID_FACULTAD)[0].NOMBRE_FACULTAD;   
            this.semestre = this.citasPendientesService.estudiante[0].SEMESTRE;     
            cargando = false;
            this.openModal(true);
          })
        })
      })
  }

  getFacultades() {
    this.loginService.getFacultades()
      .subscribe(res => {
        this.loginService.facultades = res as facultad[];
      })
  }

  openModal(open: boolean) {
    this.modalOpen = open;
  }

  openModal2(open: boolean){
    this.modalOpen2 = open;
    this.modalOpen = !open;
  }

  getTipoReunion() {
    this._horarioService.getTipoReunion()
      .subscribe(
        res => {
          this.tiposReunion = res as TipoReunion[]
        }
      )
  }

  getTiposAsesorias() {
    this._horarioService.getTipoAsesoria()
      .subscribe(
        res => {
          this.tiposAsesoria = res as TipoAsesoria[]
        },
        err => { console.log("hubo un error obteniendo tipos asesorias", err); }
      )
  }

  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.usuario_id = parseInt(tokenPayload.id_usuario);
    this.estudiante_id = parseInt(tokenPayload.id_estudiante);
    this.rol = parseInt(tokenPayload.rol_usuario);

    if(this.rol == 3){

      this.etapaService.getEtapa(this.estudiante_id).subscribe((res) => {this.etapa = res as number;
                                                                          console.log('etapa:',this.etapa);} );
    }
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

  buildFormCancelar(){
    this.cancelarCitaForm = this.fb.group({      
      Asunto: [`Cancelacion de cita , consultorio empresarial`, Validators.compose([Validators.required]) ],
      Motivo: [``, Validators.compose([Validators.required]) ],
    });
  }

  devolverEtapa(id_estudiante : number , etapa:number){

   this.etapaService.putEtapa(this.estudiante_id, etapa)
   .subscribe(

    res => {
        alert('El estudiante quedo habilitado para agendar cita');
    },

    err => {console.log(err);}

   )

  }

  cancelarCita(){
    if(this.rol == 3){
      var citaCancelada :object = {
        Asunto : this.cancelarCitaForm.value.Asunto,
        Motivo: this.cancelarCitaForm.value.Motivo,
        id_horario: this.idHorarioSelect
      }
      this.etapaService.getEtapa(this.estudiante_id).subscribe(
        (res) => {
          this.etapa = res as number;
          this.etapaService.putEtapa(this.estudiante_id,this.etapa-1)
          .subscribe(
            res => alert(`el estudiante puede agendar nuevamente una cita`),
            err =>console.log(err)
          )
        }        
        );
    }
    else{
      var citaCancelada :object = {
        Asunto : this.cancelarCitaForm.value.Asunto,
        Motivo: this.cancelarCitaForm.value.Motivo,
      }
  }
  this.citasPendientesService.cancelarCita(citaCancelada,this.idDisponibilidadSelect)
      .subscribe(
        async res => {console.log(res);
          if(res['exito'] == true){
            console.log(res['message']);
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">Cita cancenlada </h4>
                  <p>${res['message']}</p>
                  <hr>
              </div>`});
              
          }
          else {
            console.log(res['message']);
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                  <h4 class="alert-heading">ocurrio un error, no se pudo cancelar la cita</h4>
                  <p>${res['message']}</p>
                  <hr>
              </div>`});
          }
        },
        err => {console.log(err);
          M.toast({
            html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                <h4 class="alert-heading">ocurrio un error </h4>
                <p>${err['error']}</p>
                <hr>
            </div>`});},

        
  
      )
  }

  

}
