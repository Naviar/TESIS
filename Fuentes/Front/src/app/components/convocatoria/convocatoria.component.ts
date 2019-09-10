import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form, NgForm } from '@angular/forms';
import { convocatoria } from '../../models/convocatoria';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import decode from 'jwt-decode';

declare var M: any;
@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  // formulario abrir convocatoria
  announcementForm: FormGroup;
  id_usuario: number ;
  convocatorias : object [] = [];
  constructor(private fb: FormBuilder , public convocatoriaService: ConvocatoriaService) { }

  ngOnInit() {
    this.buildForm();
    this.getIdUser();
    this.getAnnouncements();
  }

  // construir el formulario de convocatoria
  buildForm() {

    this.announcementForm = this.fb.group({
      start_date: ['', Validators.compose([Validators.required]) ],
      ending_date: ['', Validators.compose([Validators.required]) ],
      initial_report_date: ['', Validators.compose([Validators.required]) ],
      final_report_date: ['', Validators.compose([Validators.required]) ]
    });

  }

  openAnnouncement(form : NgForm){

  
    
      var announcement : convocatoria = {
        FECHA_INICIO: form.value.start_date,
        FECHA_FIN: form.value.ending_date,
        FECHA_INFORME_INICIAL: form.value.initial_report_date,
        FECHA_INFORME_FINAL: form.value.final_report_date,
        ID_USUARIO: this.id_usuario
      }

      console.log(announcement);
        
      if(announcement.FECHA_INICIO > announcement.FECHA_FIN)
      {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
              <p>La fecha de inicio debe ser menor a la fecha de fin de la convocatoria.</p>
              <hr>
          </div>`});
      }
      else if(announcement.FECHA_INFORME_INICIAL < announcement.FECHA_FIN || announcement.FECHA_INFORME_INICIAL > announcement.FECHA_INFORME_FINAL)
      {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
              <p>La fecha de informe inicial debe ser menor a la fecha de informe final y mayor a la fecha de fin de convocatoria.</p>
              <hr>
          </div>`});
      }
      else

      {
        this.convocatoriaService.openAnnouncement(announcement)
        .subscribe(
          res => {console.log(res);
            M.toast({
              html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                  <h4 class="alert-heading">SE ABRIO LA CONVOCATORIA</h4>
                  <p>${res['mensaje']}</p>
                  <hr>
              </div>`});
            },
          err => {console.log('error:',err);
          M.toast({
            html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
                <p>ocurrio un error en el servidor no es posible abrir convocatoria.</p>
                <hr>
            </div>`});}
        );
      }
    
    }

    getIdUser(){
    
      const token = localStorage.getItem('usuario');
      const tokenPayload = decode(token); 
  
      this.id_usuario = tokenPayload.id_usuario;
      console.log('id_usuario:',this.id_usuario);
    }

    getAnnouncements(){
      this.convocatoriaService.getAnnouncements()
      .subscribe(
        res => {console.log(`llegaron estas convocatorias ${res}`);
            this.convocatorias = res['convocatorias'] as [];
            console.log(this.convocatorias);
      },

      err => {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR OBTENIENDO CONVOCATORIAS</h4>
              <p>ocurrio un error en el servidor no es posible obtener convocatorias.</p>
              <hr>
          </div>`});
      }
      )
    }

}
