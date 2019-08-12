import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { SeguimientoService } from 'src/app/services/seguimiento.service';
import { Evaluacion } from 'src/app/models/evaluacion';

let cargando = false;

@Component({
  selector: 'app-verevaluacion',
  templateUrl: './verevaluacion.component.html',
  styleUrls: ['./verevaluacion.component.css']
})
export class VerevaluacionComponent implements OnInit {

  ruta: string[];
  constructor(private router: Router, public seguimientoService: SeguimientoService) {
    this.ruta = this.router.url.split('/');
    this.seguimientoService.selected_evaluacion[0] = {
      EVAL_GENERAL_Q1: "",
      EVAL_GENERAL_Q2: "",
      EVAL_GENERAL_Q3: "",
      EVAL_GENERAL_Q4: "",
      PERS_RESPONSABLE_Q1: "",
      PERS_RESPONSABLE_Q2: "",
      PERS_RESPONSABLE_Q3: "",
      PERS_RESPONSABLE_Q4: "",
      PERS_RESPONSABLE_Q5: "",
      PERS_RESPONSABLE_Q6: "",
      INSTA_EQUIPOS_Q1: "",
      INSTA_EQUIPOS_Q2: "",
      INSTA_EQUIPOS_Q3: "",
      YESNO_Q1: "",
      YESNO_Q2: "",
      YESNO_Q3: "",
      YESNO_Q4: "",
      YESNO_Q5: "",
      OBSERVACIONES: "",
      FECHA: ""
    };
   }

  ngOnInit() {
    this.getEvaluacion();
  }
  getEvaluacion() {
    cargando = true;
    this.seguimientoService.getEvaluacion(parseInt(this.ruta[3]))
      .subscribe(res => {
        this.seguimientoService.selected_evaluacion = res as Evaluacion;           
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
      doc.save('Formato_Evaluacion  .pdf');
    });
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
