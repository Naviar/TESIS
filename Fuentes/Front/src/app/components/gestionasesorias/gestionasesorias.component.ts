import { Component, OnInit } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { GestionService } from '../../services/gestion.service';
import { TipoAsesoria } from '../../models/tipoasesoria';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

declare var M: any;
let cargando = false;

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

  sendNuevaAsesoria(form){
    cargando = true;    
    this.gestionService.postAsesoria(form.value.nombre_asesoria)
    .subscribe(
      (res) => {console.log('respuesta postAsesoria',res);
                if(res['exito'] === false){
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO AGREGANDO LA ASESORIA</h4>
                        <p>Ocurrio un error en la base de datos, no se pudo agregar la nueva asesoria.</p>
                        <hr>
                    </div>`});
                    cargando = false;
                }
                else{
                  M.toast({
                    html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">SE AGREGO LA NUEVA ASESORIA</h4>
                        <p>Nueva asesoria agregada: ${form.value.nombre_asesoria}.</p>
                        <hr>
                    </div>`});
                    cargando = false;
                }
              
              },
      (err) => {console.log('error en post nueva asesoria: ',err);},
      () => {this.getAsesorias();}
    )
  }
  getAsesorias(){
    cargando=true;
    this.gestionService.getAsesorias()
    .subscribe(
      (res)=> {this.Asesorias = res as TipoAsesoria []
                console.log('asesorias',this.Asesorias);
                cargando=false;},
      (err) => {console.log('error trayendo disponibilidades:',err);
                cargando=false;}
      
    )
  }

  changeStatus(ID_TIPO_ASESORIA :number , estado :any){
    cargando = true;
    console.log(`entro a checkstatus con id : ${ID_TIPO_ASESORIA} y estado: ${estado}`);
    this.gestionService.changeStatus(ID_TIPO_ASESORIA,estado)
    .subscribe(
      (res) =>{console.log('respuesta changestatus',res);
                if(res['status']=== false){
                  
                  M.toast({
                    html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">FALLO CAMBIANDO STATUS ASESORIA</h4>
                        <p>${res['mensaje']}</p>
                        <hr>
                    </div>`});
                    cargando = false;
                }
                else if (res['exito'] === true){
                  M.toast({
                    html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">SE CAMBIO EL ESTADO DE LA ASESORIA</h4>
                        <p>${res['mensaje']}</p>
                        <hr>
                    </div>`});
                    cargando = false;
                }
                else if (res['exito']=== false){
                  M.toast({
                    html: `<div class="alert alert-warning" style="position: fixed; top: 100px; right: 50px; z-index: 7000;" role="alert">
                        <h4 class="alert-heading">PROBLEMA AL CAMBIAR EL ESTADO DE LA ASESORIA</h4>
                        <p>${res['mensaje']}</p>
                        <hr>
                    </div>`});
                    cargando = false;

                    this.getAsesorias();
                }
              },
      (err) =>{console.log('error changestatus',err);},
      ()=>{}

    )

  }

  ngOnInit() {
    this.getAsesorias();
  }
  yaCargo() {
    if (cargando == false) {
      return false;
    } else {
      return true;
    }
  }

}
