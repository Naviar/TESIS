import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguimientoService } from '../../services/seguimiento.service';
import { estudiante } from '../../models/estudiante';
import { asesoriaFormato } from '../../models/asesoriaFormato';

let cargando = false;
@Component({
  selector: 'app-verasesoria',
  templateUrl: './verasesoria.component.html',
  styleUrls: ['./verasesoria.component.css']
})
export class VerasesoriaComponent implements OnInit {
  
  ruta:string[];
  asesoria_requerida :string ;

  constructor(private router :Router , public seguimientoService : SeguimientoService) {
    this.ruta = this.router.url.split('/');
    
   }

  ngOnInit() {
    this.getEstudiante(parseInt(this.ruta[3]));
    this.getFormatoAsesoria(parseInt(this.ruta[3]));
    
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
  
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }
}
