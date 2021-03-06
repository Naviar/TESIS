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
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { VerdiagnosticoComponent } from './components/verdiagnostico/verdiagnostico.component';
import { VerasesoriaComponent } from './components/verasesoria/verasesoria.component';
import { VerevaluacionComponent } from './components/verevaluacion/verevaluacion.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { SubirarchivosComponent } from './components/subirarchivos/subirarchivos.component';
import { GestionarchivosComponent } from './components/gestionarchivos/gestionarchivos.component';
import { CrearproyectoComponent } from './components/crearproyecto/crearproyecto.component';
import { ConvocatoriaComponent } from './components/convocatoria/convocatoria.component';
import { BuscarproyectoComponent } from './components/buscarproyecto/buscarproyecto.component';
import {EvaluacionProyectosComponent} from './components/evaluacion-proyectos/evaluacion-proyectos.component';
import { GuardCreateProject } from './services/guard.create.project';
import { GuardAnnouncement } from './services/guard.announcement';
import { GuardUploadFiles } from './services/guard.upload.files';
import { GuardManageFiles } from './services/guard.manage.files';
import { GuardFindFiles } from './services/guard.find.files';
import { GuardEvaluationProjects } from './services/guard.evaluation.projects';
import { GuardSee } from './services/guard.see';

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
    { path: 'tracking', component: SeguimientoComponent, canActivate:[GuardSchedules] },
    { path: 'see/diagnostic/:id', component: VerdiagnosticoComponent, canActivate:[GuardSee] },
    { path: 'see/advisory/:id', component: VerasesoriaComponent, canActivate:[GuardSee] },
    { path: 'see/evaluation/:id', component: VerevaluacionComponent, canActivate:[GuardDiagnostic] },
    { path: 'report', component: ReporteComponent, canActivate:[GuardAuthenticateUsers] },

    { path: 'upload/files', component: SubirarchivosComponent, canActivate:[GuardUploadFiles] },
    { path: 'manage/files', component: GestionarchivosComponent, canActivate:[GuardManageFiles] },
    { path: 'create/project', component: CrearproyectoComponent, canActivate:[GuardCreateProject] },
    { path: 'announcement', component: ConvocatoriaComponent, canActivate:[GuardAnnouncement] }, 
    { path: 'find/files', component: BuscarproyectoComponent, canActivate:[GuardFindFiles] },
    { path: 'evaluation/projects', component: EvaluacionProyectosComponent, canActivate:[GuardEvaluationProjects] },

    { path: '**', pathMatch: 'full', redirectTo: 'login'}

]


export const APP_ROUTING = RouterModule.forRoot(routes);