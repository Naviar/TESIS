import { Component, OnInit } from '@angular/core';
import { SubirarchivosService } from '../../services/subirarchivos.service';

@Component({
  selector: 'app-evaluacion-proyectos',
  templateUrl: './evaluacion-proyectos.component.html',
  styleUrls: ['./evaluacion-proyectos.component.css']
})
export class EvaluacionProyectosComponent implements OnInit {
  
  documentos: string [];
  proyectos : any [] ;
  constructor(private subirArchivosService : SubirarchivosService) { }

  ngOnInit() {
this.getDocumentos();
this.getProyectos();
  }

  getDocumentos(){
    this.subirArchivosService.getDocumentosByEtapa(1)
    .subscribe(

      res =>{
        this.documentos = res as string [];
        console.log(this.documentos);
      }
    )
  }

  getProyectos(){
    this.subirArchivosService.getProyectosByEtapa(1)
    .subscribe(
      res => {
        this.proyectos = res as any [];
        console.log(`proyectos : ${JSON.stringify(this.proyectos)}`);
      }
    )
  }

}
