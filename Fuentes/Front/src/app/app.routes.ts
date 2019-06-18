import { Routes, RouterModule, CanActivate } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent} from './components/home/home.component';
import {GuardService} from './services/guard.service'; 
import {DiagnosticoComponent} from './components/diagnostico/diagnostico.component';
import { DefinirhorariosComponent} from './components/definirhorarios/definirhorarios.component';
import { CitadiagnosticoComponent } from './components/citadiagnostico/citadiagnostico.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component'
import { GestionasesoriasComponent } from './components/gestionasesorias/gestionasesorias.component';
import { AsesoriaComponent } from './components/asesoria/asesoria.component';
import { CitaasesoriaComponent } from './components/citaasesoria/citaasesoria.component';
import { CitaspendientesComponent } from './components/citaspendientes/citaspendientes.component';
import { AutenticarusuariosComponent } from './components/autenticarusuarios/autenticarusuarios.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate:[GuardService] },
    { path: 'diagnostic', component: DiagnosticoComponent, canActivate:[GuardService] },
    { path: 'evaluation', component: EvaluacionComponent, canActivate:[GuardService] },
    { path: 'schedules', component: DefinirhorariosComponent, canActivate:[GuardService] },
    { path: 'manage/advice' , component:GestionasesoriasComponent, canActivate:[GuardService]},
    { path: 'schedule/diagnostic', component: CitadiagnosticoComponent, canActivate:[GuardService] },
    { path: 'advisory', component: AsesoriaComponent, canActivate:[GuardService] },
    { path: 'schedule/advice', component: CitaasesoriaComponent, canActivate:[GuardService] },
    { path: 'pending/dates', component: CitaspendientesComponent, canActivate:[GuardService] },
    { path: 'authenticate/users', component: AutenticarusuariosComponent, canActivate:[GuardService] },


    { path: '**', pathMatch: 'full', redirectTo: 'login'}

]


export const APP_ROUTING = RouterModule.forRoot(routes);