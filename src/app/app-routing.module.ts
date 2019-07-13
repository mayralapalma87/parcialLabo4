import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { MiPerfilComponent } from './miPerfil/miPerfil.component';
import { MisTurnosComponent } from './misTurnos/misTurnos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NuevoTurnoComponent } from './nuevoTurno/nuevoTurno.component';
import { ErrorComponent } from './error/error.component';
import { MenuRecepcionComponent } from './menuRecepcion/menuRecepcion.component';
import { AgendaEspecialistaComponent } from './agendaEspecialista/agendaEspecialista.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { AuthGuard } from './guards/auth.guard';
import { ListaUsuariosComponent } from './listaUsuarios/listaUsuarios.component';
import { IncripcionesComponent } from './incripciones/incripciones.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'registrarse' , component: RegistrarseComponent},
  {path: 'miPerfil', component: MiPerfilComponent, canActivate: [AuthGuard]},
  {path: 'misTurnos', component: MisTurnosComponent, canActivate: [AuthGuard]},
  {path: 'listaUsuarios', component: ListaUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'navbar' , component: NavbarComponent},
  {path: 'nuevoTurno' , component: NuevoTurnoComponent, canActivate: [AuthGuard]},
  {path: 'inscripciones' , component: IncripcionesComponent, canActivate: [AuthGuard]},
  {path: 'menuRecepcion' , component: MenuRecepcionComponent, canActivate: [AuthGuard]},
  {path: 'encuesta/:id' , component: EncuestaComponent, canActivate: [AuthGuard]},
  {path: 'agenda' , component: AgendaEspecialistaComponent, canActivate: [AuthGuard]},
  {path: 'error' , component: ErrorComponent},
  {path: '**' , component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
