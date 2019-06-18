import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { GestionService } from '../../services/gestion.service';
import { TipoAsesoria } from '../../models/tipoasesoria';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

declare var M: any;
@Component({
  selector: 'app-gestionasesorias',
  templateUrl: './gestionasesorias.component.html',
  styleUrls: ['./gestionasesorias.component.css']
})
export class GestionasesoriasComponent implements OnInit {

  Asesorias : TipoAsesoria [] = [];
  asesoriaForm :FormGroup;

  constructor(private gestionService :GestionService , private fb : FormBuilder) {
    this.buildform();
   }

  buildform(){
  this.asesoriaForm = this.fb.group({
    nombre_asesoria:['',Validators.compose([Validators.required])]
  })
  }

  sendNuevaAsesoria(form: NgForm){
    console.log('se va a enviar el siguiente nombre',form.value.nombre_asesoria);
    this.gestionService.postAsesoria(form.value.nombre_asesoria)
    .subscribe(
      (res) => {console.log('respuesta postAsesoria',res);
                if(res['exito'] === false){
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO AGREGANDO LA ASESORIA</h4>
                        <p>Ocurrio un error en la base de datos , no se pudo agregar la nueva asesoria.</p>
                        <hr>
                    </div>`});
                }
                else{
                  M.toast({
                    html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">SE AREGO LA NUEVA ASESORIA</h4>
                        <p>Nueva asesoria agregada : ${form.value.nombre_asesoria}.</p>
                        <hr>
                    </div>`});
                }
              
              },
      (err) => {console.log('error en post nueva asesoria: ',err);},
      () => {this.getAsesorias();}
    )
  }
  getAsesorias(){
    this.gestionService.getAsesorias()
    .subscribe(
      (res)=> {this.Asesorias = res as TipoAsesoria []
                console.log('asesorias',this.Asesorias);},
      (err) => {console.log('error trayendo disponibilidades:',err);}
    )
  }

  changeStatus(ID_TIPO_ASESORIA :number , estado :any){
    console.log(`entro a checkstatus con id : ${ID_TIPO_ASESORIA} y estado: ${estado}`);
    this.gestionService.changeStatus(ID_TIPO_ASESORIA,estado)
    .subscribe(
      (res) =>{console.log('respuesta changestatus',res);
                if(res['status']=== false){
                  
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO CAMBIANDO STATUS ASESORIA</h4>
                        <p>Ocurrio un error en la base de datos , no se pudo actualizar el estado de la asesoria.</p>
                        <hr>
                    </div>`});
                }
                else{
                  M.toast({
                    html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">SE CAMBIO EL ESTADO DE LA ASESORIA</h4>
                        <p>La asesoria ha cambiado su estado.</p>
                        <hr>
                    </div>`});
                }
              },
      (err) =>{console.log('error changestatus',err);},
      ()=>{}

    )

  }

  ngOnInit() {
    this.getAsesorias();
  }

}
