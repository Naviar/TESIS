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
import { NgForm } from '@angular/forms';
import { CitasPendientes } from 'src/app/services/citaspendientes.service';

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

  disponibilidades: Disponibilidad2[] = [];


  constructor(private agendarCitaService: AgendarCitaService, private citasPendientesService: CitasPendientes, private datePipe: DatePipe, private _horarioService: HorariosService) {

  }

  ngOnInit() {
    this.getValidRol();
    this.getCitasPendientes();
    this.getTiposAsesorias();
    this.getTipoReunion();
  }

  getCitasPendientes() {
    cargando=true;
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
    for (let disponibilidad of this.disponibilidades) {      
      this.citasPendientesService.getHorario(disponibilidad.HORARIO_ID_HORARIO)
        .subscribe(res => {
          this.agendarCitaService.horarioSelect = res as Horario;
          if(this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION==1){            
            cal.addEvent({ title: 'Cita ' + this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION, start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO, backgroundColor: "RED" });
          }
          else if(this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION==2){
            cal.addEvent({ title: 'Cita ' + this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION, start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO, backgroundColor: "RED" });
          }
          if (disponibilidad == this.disponibilidades[this.disponibilidades.length - 1]) {
            cargando = false;
          }
        })
    }
    cargando = false;
  }

  evento(info) {
    cargando = true;
    console.log("evento clickeado", info.event);

    this.agendarCitaService.getHorarioId(info.event.id)
      .subscribe(res => {
        this.agendarCitaService.horarioSelect = res as Horario;
        this.horarioSelect = this.agendarCitaService.horarioSelect[0];
        this.tipoReunion = this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION;
        this.fecha = info.event.start;
        this.fecha2 = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
        this.horario_id = info.event.id;
        if(this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION==1){            
          this.titulo = "Diagnostico";
        } 
        else if(this.agendarCitaService.horarioSelect[0].TIPO_REUNION_ID_TIPO_REUNION==2){
          this.titulo = this.tiposAsesoria.find(asesoria => asesoria.ID_TIPO_ASESORIA == this.agendarCitaService.horarioSelect[0].TIPO_ASESORIA_ID_TIPO_ASESORIA).NOMBRE_TIPO_ASESORIA;
        }
        cargando = false;
        this.openModal(true);
      })
  }

  openModal(open: boolean) {
    this.modalOpen = open;
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
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
