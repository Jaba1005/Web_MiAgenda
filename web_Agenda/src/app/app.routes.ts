import { Routes } from '@angular/router';
import { AgendaComponent } from './components/agenda-component/agenda-component';
import { UsuariosComponente } from './components/usuarios-componente/usuarios-componente';

export const routes: Routes = [
  { path: 'eventos', component: AgendaComponent },
  { path: 'usuarios', component: UsuariosComponente }
];
