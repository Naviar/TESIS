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
import { GuardDiagnostic } from './services/guard.diagnostic';  
import { GuardEvaluation } from './services/guard.evaluation';
import { GuardSchedules } from './services/guard.schedules';
import { GuardManageAdvice } from './services/guard.manage.advice';
import { GuardScheduleDiagnostic } from './services/guard.schedule.diagnostic';
import { GuardAdvisory } from './services/guard.advisory';
import { GuardScheduleAdvice } from './services/guard.schedule.advice';
import { GuardAuthenticateUsers } from './services/guard.authenticate.users';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate:[GuardService] },
    { path: 'diagnostic', component: DiagnosticoComponent, canActivate:[GuardDiagnostic] }, 
    { path: 'evaluation', component: EvaluacionComponent, canActivate:[GuardEvaluation] },
    { path: 'schedules', component: DefinirhorariosComponent, canActivate:[GuardSchedules] },
    { path: 'manage/advice' , component:GestionasesoriasComponent, canActivate:[GuardManageAdvice]},
    { path: 'schedule/diagnostic', component: CitadiagnosticoComponent, canActivate:[GuardScheduleDiagnostic] },
    { path: 'advisory', component: AsesoriaComponent, canActivate:[GuardAdvisory] },
    { path: 'schedule/advice', component: CitaasesoriaComponent, canActivate:[GuardScheduleAdvice] },
    { path: 'pending/dates', component: CitaspendientesComponent, canActivate:[GuardService] },
    { path: 'authenticate/users', component: AutenticarusuariosComponent, canActivate:[GuardAuthenticateUsers] },
 

    { path: '**', pathMatch: 'full', redirectTo: 'login'}

]


export const APP_ROUTING = RouterModule.forRoot(routes);