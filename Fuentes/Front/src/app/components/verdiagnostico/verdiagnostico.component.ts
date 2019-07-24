import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Diagnostico } from 'src/app/models/diagnostico';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { etapa } from 'src/app/models/etapa';
import { sector } from 'src/app/models/sector';
import { estudiante } from 'src/app/models/estudiante';
import { asesoria } from 'src/app/models/asesoria';

let cargando = false;

@Component({
  selector: 'app-verdiagnostico',
  templateUrl: './verdiagnostico.component.html',
  styleUrls: ['./verdiagnostico.component.css']
})

export class VerdiagnosticoComponent implements OnInit {

  ruta: string[];
  estudiante: string;
  etapa: string;
  sector: string;
  asesoria: string;

  constructor(private router: Router, public seguimientoService: SeguimientoService, public diagnosticoService: DiagnosticoService) {
    this.ruta = this.router.url.split('/');
    console.log("formatooooo", this.ruta[3]);
    this.seguimientoService.selected_diagnostico[0] = {
      ID_FORMATO_DIAGNOSTICO: "",
      ETAPA_ID_ETAPA: 0,
      SECTOR_ID_SECTOR: 0,
      AMBITO_SOCIAL: "",
      DESCRIPCION_PROYECTO: "",
      SOCIOS_CLAVE: "",
      ACTIVIDADES_CLAVE: "",
      RECURSOS_CLAVE: "",
      PROPUESTA_VALOR: "",
      RELACION_CLIENTES: "",
      CANALES: "",
      SEGMENTOS_CLIENTES: "",
      ESTRUCTURA_COSTOS: "",
      FUENTE_INGRESOS: "",
      TIPO_ASESORIA_ID_TIPO_ASESORIA: 0,
      FORMATO_EVALUACION: 0,
      FECHA: "",
      ESTUDIANTE_ID_ESTUDIANTE: 0
    };
  }

  ngOnInit() {
    this.getEstudiantes();
    this.getEtapas();
    this.getSectores();
    this.getAsesorias();
    this.getDiagnostico();
  }
  getDiagnostico() {
    cargando = true;
    this.seguimientoService.getDiagnostico(parseInt(this.ruta[3]))
      .subscribe(res => {
        this.seguimientoService.selected_diagnostico = res as Diagnostico;
        console.log("Etapas",this.seguimientoService.selected_diagnostico[0]);
        this.estudiante = this.seguimientoService.estudiantes.find(estudiante => estudiante.ID_ESTUDIANTE == this.seguimientoService.selected_diagnostico[0].ESTUDIANTE_ID_ESTUDIANTE).NOMBRE + " " + this.seguimientoService.estudiantes.find(estudiante => estudiante.ID_ESTUDIANTE == this.seguimientoService.selected_diagnostico[0].ESTUDIANTE_ID_ESTUDIANTE).APELLIDO;
        this.etapa = this.diagnosticoService.etapas.find(etapa => etapa.ID_ETAPA == this.seguimientoService.selected_diagnostico[0].ETAPA_ID_ETAPA).NOMBRE_ETAPA;
        this.sector = this.diagnosticoService.sectores.find(sector => sector.ID_SECTOR == this.seguimientoService.selected_diagnostico[0].SECTOR_ID_SECTOR).NOMBRE_SECTOR;
        this.asesoria = this.diagnosticoService.asesorias.find(asesoria => asesoria.ID_TIPO_ASESORIA == this.seguimientoService.selected_diagnostico[0].TIPO_ASESORIA_ID_TIPO_ASESORIA).NOMBRE_TIPO_ASESORIA;
        cargando = false;
      })
  }
  goBack() {
    this.router.navigate(['tracking']);
  }
  generarPDF() {
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 2
    }).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 7, 20, 195, 255);
      doc.save('Formato_Diagnostico.pdf');
    });
  }
  getEstudiantes() {
    cargando = true;
    this.seguimientoService.getEstudiantes()
      .subscribe(res => {
        this.seguimientoService.estudiantes = res as estudiante[];
        cargando = false;
      })
  }
  getEtapas() {
    cargando = true;
    this.diagnosticoService.getEtapas()
      .subscribe(res => {
        this.diagnosticoService.etapas = res as etapa[];
        cargando = false;
      })
  }
  getSectores() {
    cargando = true;
    this.diagnosticoService.getSectores()
      .subscribe(res => {
        this.diagnosticoService.sectores = res as sector[];
        cargando = false;
      })
  }
  getAsesorias() {
    cargando = true;
    this.diagnosticoService.getAsesorias()
      .subscribe(res => {
        this.diagnosticoService.asesorias = res as asesoria[];
        cargando = false;
      })
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
