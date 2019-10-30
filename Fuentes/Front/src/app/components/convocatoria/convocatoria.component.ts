import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder, Form, NgForm } from '@angular/forms';
import { convocatoria } from '../../models/convocatoria';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import decode from 'jwt-decode';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

let cargando = true;
declare var M: any;
@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {
  actualizando :boolean =false;
  id_convocatoria_update : number;
  titulo_modal :string ;
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
      Name: ['', Validators.compose([Validators.required]) ],
      start_date: ['', Validators.compose([Validators.required]) ],
      ending_date: ['', Validators.compose([Validators.required]) ],
      initial_report_date: ['', Validators.compose([Validators.required]) ],
      final_report_date: ['', Validators.compose([Validators.required]) ]
    });

  }

  openAnnouncement(form  ,id_convocatoria? : number) {

    const announcement : convocatoria = {
      ID_CONVOCATORIA : undefined,
      NOMBRE: form.value.Name,
      FECHA_INICIO: form.value.start_date,
      FECHA_FIN: form.value.ending_date,
      FECHA_INFORME_INICIAL: form.value.initial_report_date,
      FECHA_INFORME_FINAL: form.value.final_report_date,
      ID_USUARIO: this.id_usuario
    }

      if(announcement.FECHA_INICIO > announcement.FECHA_FIN) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
              <p>La fecha de inicio debe ser menor a la fecha de fin de la convocatoria.</p>
              <hr>
          </div>`});
      } else if(announcement.FECHA_INFORME_INICIAL < announcement.FECHA_FIN || announcement.FECHA_INFORME_INICIAL > announcement.FECHA_INFORME_FINAL) {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
              <p>La fecha de informe inicial debe ser menor a la fecha de informe final y mayor a la fecha de fin de convocatoria.</p>
              <hr>
          </div>`});
      } else {

        if(id_convocatoria === undefined){

          cargando = true;
          this.convocatoriaService.openAnnouncement(announcement)
          .subscribe(
            res => {console.log(res);
              M.toast({
                html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                    <h4 class="alert-heading">SE ABRIO LA CONVOCATORIA</h4>
                    <p>${res['message']}</p>
                    <hr>
                </div>`});
                cargando = false;
                this.getAnnouncements();
              },
            err => {console.log('error:',err);
            M.toast({
              html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                  <h4 class="alert-heading">ERROR ABRIENDO CONVOCATORIA</h4>
                  <p>ocurrio un error en el servidor no es posible abrir convocatoria.</p>
                  <hr>
              </div>`});
            cargando =false;
          }
          );
        }
        else if(id_convocatoria !== undefined){
            cargando = true;
            this.convocatoriaService.updateAnnouncement(announcement,this.id_convocatoria_update)
            .subscribe(
              res =>{
                console.log(res);
                M.toast({
                  html: `<div class="alert alert-success" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                      <h4 class="alert-heading">SE ACTUALIZO LA CONVOCATORIA</h4>
                      <p>${res['message']}</p>
                      <hr>
                  </div>`});
                  cargando =false;
                  this.getAnnouncements();
              },

              err =>{
                M.toast({
                  html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
                      <h4 class="alert-heading">ERROR ACTUALIZANDO CONVOCATORIA</h4>
                      <p>ocurrio un error en el servidor no es posible abrir convocatoria.</p>
                      <hr>
                  </div>`});
                  cargando =false;
              }
            )
        }
      }
    
    }

    getIdUser() {
    
      const token = localStorage.getItem('usuario');
      const tokenPayload = decode(token); 
  
      this.id_usuario = tokenPayload.id_usuario;
      console.log('id_usuario:',this.id_usuario);
    }

    getAnnouncements() {
      cargando = true;
      this.convocatoriaService.getAnnouncements()
      .subscribe(
        res => {console.log(`llegaron estas convocatoria ${res}`);
            this.convocatorias = res['convocatoria'] as [];
            console.log(this.convocatorias);
            cargando = false;
      },

      err => {
        M.toast({
          html: `<div class="alert alert-danger" style="position: fixed; top: 100px; right: 50px; z-index: 100;" role="alert">
              <h4 class="alert-heading">ERROR OBTENIENDO CONVOCATORIA</h4>
              <p>ocurrio un error en el servidor no es posible obtener convocatoria.</p>
              <hr>
          </div>`});
          cargando =false;
      }
      )
    }

    modifyAnnouncement(id_convocatoria: number) {
      // tslint:disable-next-line: no-shadowed-variable
      const convocatoria = this.convocatorias.find((convocatoria) => convocatoria['ID_CONVOCATORIA'] === id_convocatoria);

      console.log(`encontro ${JSON.stringify(convocatoria)}`);
      this.announcementForm.get('Name').setValue(convocatoria['NOMBRE_CONVOCATORIA'])
      this.announcementForm.get('start_date').setValue(convocatoria['FECHA_INICIO']);
      this.announcementForm.get('ending_date').setValue(convocatoria['FECHA_FIN']);
      this.announcementForm.get('initial_report_date').setValue(convocatoria['FECHA_INFORME_INICIAL']);
      this.announcementForm.get('final_report_date').setValue(convocatoria['FECHA_INFORME_FINAL']);      
      console.log('valor',this.announcementForm);
      this.id_convocatoria_update = id_convocatoria;
      this.actualizando = true;
      this.titulo_modal = 'Actualizar fechas de convocatoria';
    }

    yaCargo() {
      if (cargando == false) {
        return false;
      } else {
        return true;
      }
    }

  

    

}
