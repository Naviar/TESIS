import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_ROUTING} from './app.routes';
import { HttpClientModule} from '@angular/common/http';

import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent} from './components/home/home.component';
import { NavBarComponent} from './components/nav-bar/nav-bar.component';
import { DiagnosticoComponent } from './components/diagnostico/diagnostico.component';
import { DefinirhorariosComponent} from './components/definirhorarios/definirhorarios.component';
import { AmazingTimePickerModule} from 'amazing-time-picker';
import { GestionasesoriasComponent } from './components/gestionasesorias/gestionasesorias.component'
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component'
import { FullCalendarModule } from '@fullcalendar/angular';
import { CitadiagnosticoComponent } from './components/citadiagnostico/citadiagnostico.component';
import { AsesoriaComponent } from './components/asesoria/asesoria.component';
import { CitaasesoriaComponent } from './components/citaasesoria/citaasesoria.component';
import { CitaspendientesComponent } from './components/citaspendientes/citaspendientes.component';
import { AutenticarusuariosComponent } from './components/autenticarusuarios/autenticarusuarios.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    GestionasesoriasComponent,   
    DiagnosticoComponent, 
    DefinirhorariosComponent,    
    EvaluacionComponent, 
    AsesoriaComponent,   
    CitadiagnosticoComponent, 
    CitaasesoriaComponent, 
    CitaspendientesComponent, 
    AutenticarusuariosComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    ToastrModule.forRoot(),
    AmazingTimePickerModule,
    FullCalendarModule 

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }