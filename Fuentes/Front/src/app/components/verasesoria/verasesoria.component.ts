import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguimientoService } from '../../services/seguimiento.service';
import { estudiante } from '../../models/estudiante';
import { asesoriaFormato } from '../../models/asesoriaFormato';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

let cargando = false;
@Component({
  selector: 'app-verasesoria',
  templateUrl: './verasesoria.component.html',
  styleUrls: ['./verasesoria.component.css']
})
export class VerasesoriaComponent implements OnInit {
  
  ruta:string[];
  asesoria_requerida :string ;
  asesoria_actual :string;
  compromisos = [];
  constructor(private router :Router , public seguimientoService : SeguimientoService) {
    this.ruta = this.router.url.split('/');
    
   }

  ngOnInit() {
    this.getEstudiante(parseInt(this.ruta[3]));
    this.getFormatoAsesoria(parseInt(this.ruta[3]));
    this.getCompromisosAsesoria(parseInt(this.ruta[3]));
  }

  getCompromisosAsesoria(id_asesoria : number){
    this.seguimientoService.getCompromisosAsesoria(id_asesoria)
    .subscribe(res =>{
        console.log('respuesta compromios',res);
        this.compromisos = res as [];
    });
  }

  getEstudiante(id_asesoria : number){
    cargando = true;
    this.seguimientoService.getEstudianteAsesoria(id_asesoria)
      .subscribe(res => {
        console.log(res);
        this.seguimientoService.estudianteAsesoria = res[0] as estudiante;
        
        cargando = false;
      })
  }

  getFormatoAsesoria(id_asesoria : number){

    cargando = true;
    this.seguimientoService.getAsesoria(id_asesoria)
    .subscribe(res =>{
      console.log(res);
      this.seguimientoService.selected_asesoria = res[0] as asesoriaFormato;
      this.getNameAsesoria(this.seguimientoService.selected_asesoria.TIPO_ASESORIA_ID_TIPO_ASESORIA);
      this.getNameAsesoriaActual(this.seguimientoService.selected_asesoria.TIPO_ASESORIA_ACTUAL);
      cargando = false;
    })
  }

  getNameAsesoria(id_asesoria : number){
    cargando = true;
    this.seguimientoService.getNameAsesoria(id_asesoria)
    .subscribe(res => {
      console.log(res);
      this.asesoria_requerida = (res[0].NOMBRE_TIPO_ASESORIA != '') ? res[0].NOMBRE_TIPO_ASESORIA : "no requirio otra asesoria";
      cargando = false;
    })
  }
  getNameAsesoriaActual(id_asesoria : number){
        this.seguimientoService.getNameAsesoria(id_asesoria)
        .subscribe(
          res=>{
            this.asesoria_actual = res[0].NOMBRE_TIPO_ASESORIA;
          }
        )
  }
  
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

  goBack() {
    this.router.navigate(['tracking']);
  }

  generarPDF() {
    cargando = true;
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 2
    }).then(function (canvas) {
      cargando = false;
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 7, 20, 195, 255);
      doc.save(`Formato_asesoria.pdf`);
    });
  }
}
