import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component'

const routes: Routes = [
  {path:'', redirectTo:'Inicio',pathMatch:'full'},
  {path:'Inicio',component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
