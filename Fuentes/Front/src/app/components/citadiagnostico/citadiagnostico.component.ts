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
import { EtapaService } from 'src/app/services/etapa.service';
import { estudiante } from 'src/app/models/estudiante';

declare var M: any;
let cargando = true;

@Component({
  selector: 'app-citadiagnostico',
  templateUrl: './citadiagnostico.component.html',
  styleUrls: ['./citadiagnostico.component.css']
})

export class CitadiagnosticoComponent implements OnInit {

  @ViewChild("CALENDARIO") calendarComponent: FullCalendarComponent;


  public modalOpen: boolean = false;
  tiposReunion: TipoReunion[] = [];
  tiposAsesoria: TipoAsesoria[] = [];
  rango: number = 4;
  calendarPlugins = [dayGridPlugin];
  Dias: any[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  fechaActual: Date;
  tipoReunion: string;
  vez: number = 0;
  fecha: string;
  fecha2: string;
  horario_id: number;
  estudiante_id: number;

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
  etapa: number;
  // disponibilidades: { FECHA: string, ID_ESTUDIANTE: number, HORARIO_ID_HORARIO: number}[] = [{ FECHA: '', ID_ESTUDIANTE: 0, HORARIO_ID_HORARIO: 0}];

  disponibilidades: Disponibilidad2[] = [];


  constructor(private agendarCitaService: AgendarCitaService, private etapaService: EtapaService, private datePipe: DatePipe, private _horarioService: HorariosService, private router: Router) {
    this.fechaActual = new Date();
  }

  ngOnInit() {
    this.getHorarios();
    this.getTiposAsesorias();
    this.getTipoReunion();
    this.getValidRol();
  }

  getHorarios() {
    this.agendarCitaService.getHorarios()
      .subscribe(res => {
        this.agendarCitaService.horariosDiagnostico = res as Horario[];        
        // this.calendario();
      },
      (err)=>{console.log('error');},
        ()=>{this.calendario();})
  }

   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  async calendario() {
    cargando = true;
    let cal = this.calendarComponent.getApi();
    cal.removeAllEvents();
    console.log("los borro");
    if (this.vez < 1) {
      for (let horario of this.agendarCitaService.horariosDiagnostico) {
        this.horarioSelect = horario;
        this.calcularDisponibilidades();
      }
      this.vez = 1;
    }
    for (let disponibilidad of this.disponibilidades) {
      // await this.delay(500); 
      this.agendarCitaService.disponibilidadesLibres(disponibilidad)
        .subscribe(res => {
          console.log("Que es esta respuestaaaaaaaa",res); 
          this.agendarCitaService.horarioSelect = res as Horario;
          if (this.agendarCitaService.horarioSelect[0] == undefined) {
            this.agendarCitaService.disponibilidadesOcupadas(disponibilidad)
              .subscribe(res => {
                this.agendarCitaService.horarioSelect = res as Horario;
                if (this.agendarCitaService.horarioSelect[0] == undefined) {
                  console.log("Hubo un error disponibilidad no encontrada", disponibilidad);
                }
                else {
                  // console.log("hora inicio", this.agendarCitaService.horarioSelect[0].HORA_INICIO, "de la fecha ",  disponibilidad.FECHA, "y el id", disponibilidad.HORARIO_ID_HORARIO);
                  cal.addEvent({ title: 'Cita diagnostico', start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO, backgroundColor: "RED" });
                }
              })
          }
          // console.log("estas son las fechas",this.agendarCitaService.horarioSelect[0]);
          else {
            console.log("hora inicio", disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO);
            cal.addEvent({ title: 'Cita diagnostico', start: disponibilidad.FECHA + "T" + this.agendarCitaService.horarioSelect[0].HORA_INICIO, id: disponibilidad.HORARIO_ID_HORARIO });
          }
          if (disponibilidad == this.disponibilidades[this.disponibilidades.length - 1]) {
            cargando = false;
          }
        })
    }

  }

  evento(info) {
    cargando = true;
    console.log("evento clickeado", info.event);
    if (info.event.backgroundColor == "RED") {
      M.toast({ 
        html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
            <h4 class="alert-heading">CITA OCUPADA</h4>
            <p>La cita que selecciono ya esta ocupada, por favor seleccione otra</p>
            <hr>
        </div>`});
      cargando = false;
    }
    else {
      this.agendarCitaService.getHorarioId(info.event.id)
        .subscribe(res => {
          this.agendarCitaService.horarioSelect = res as Horario;
          this.horarioSelect = this.agendarCitaService.horarioSelect[0];
          this.tipoReunion = this.tiposReunion.find(reunion => reunion.ID_TIPO_REUNION == this.horarioSelect.TIPO_REUNION_ID_TIPO_REUNION).NOMBRE_TIPO_REUNION;
          this.fecha = info.event.start;
          this.fecha2 = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
          this.horario_id = info.event.id;
          cargando = false;
          this.openModal(true);
        })
    }


  }
  openModal(open: boolean) {
    this.modalOpen = open;
  }
  // obtener la fecha sumandole dias 
  getFechaSiguiente(fecha, sumarDia: number) {
    fecha.setDate(fecha.getDate() + sumarDia);
    return fecha;

  }

  // obtener el index de el arreglo de dias , el index es del dia seleccionado por el usuario 
  getIdxDiaSelect() {
    var diaIdx = this.Dias.indexOf(this.horarioSelect.DIA);
    return diaIdx;
  }

  // calcular las disponibilidades segun el dia seleccionado
  calcularDisponibilidades() {

    let DiaSelect = this.getIdxDiaSelect();
    let DiaActual = this.fechaActual.getDay();
    let DiaSiguiente: number;
    let FechaSiguiente = new Date();

    var disponibilidad: Disponibilidad2 = {
      FECHA: "",
      ID_ESTUDIANTE: 0,
      HORARIO_ID_HORARIO: 1
    };


    if (DiaSelect <= DiaActual) {

      DiaSiguiente = (DiaSelect + 7) - DiaActual;
    }
    else if (DiaSelect > DiaActual) {
      DiaSiguiente = DiaSelect - DiaActual;
    }

    FechaSiguiente = this.getFechaSiguiente(FechaSiguiente, DiaSiguiente);
    disponibilidad.FECHA = this.datePipe.transform(FechaSiguiente, 'yyyy-MM-dd');
    disponibilidad.HORARIO_ID_HORARIO = this.horarioSelect.ID_HORARIO;
    this.disponibilidades.push(disponibilidad);


    for (let i = 1; i < this.rango; i++) {
      var disponibilidad2: Disponibilidad2 = {
        FECHA: "",
        ID_ESTUDIANTE: 0,
        HORARIO_ID_HORARIO: 1
      };
      FechaSiguiente = this.getFechaSiguiente(FechaSiguiente, 7);
      disponibilidad2.FECHA = this.datePipe.transform(FechaSiguiente, 'yyyy-MM-dd');
      disponibilidad2.HORARIO_ID_HORARIO = this.horarioSelect.ID_HORARIO;
      this.disponibilidades.push(disponibilidad2);
    }

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
  agendarCita(form?) {
    cargando = true;
    let cal = this.calendarComponent.getApi();
    form.value.fecha = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');
    console.log("¿Y esto?", form.value.fecha);
    form.value.horario_id = this.horario_id;
    form.value.estudiante_id = this.estudiante_id;
    this.agendarCitaService.postDisponibilidad(form.value)
      .subscribe(res => {
        console.log(res);
        M.toast({
          html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
              <h4 class="alert-heading">CITA AGENDADA</h4>
              <p>La cita que selecciono se ha agendado satisfactoriamente</p>
              <hr>
          </div>`});
          this.etapa=1;
          this.etapaService.putEtapa(this.estudiante_id, this.etapa)
          .subscribe(res =>{
            console.log(res);
            this.router.navigate(['/pending/dates']);
          });
        cargando = false;
        this.openModal(false);
        this.calendario();
      });
  }
  getValidRol() {
    const token = localStorage.getItem('usuario');
    const tokenPayload = decode(token);
    this.estudiante_id = parseInt(tokenPayload.id_estudiante);

  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
