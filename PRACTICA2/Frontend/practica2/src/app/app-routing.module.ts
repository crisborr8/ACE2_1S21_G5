import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {GraficaLComponent} from './components/grafica-l/grafica-l.component';

const routes: Routes = [
  {path:'', redirectTo:'Inicio',pathMatch:'full'},
  {path:'Inicio',component:InicioComponent},
  {path:'Grafica',component:GraficaLComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
