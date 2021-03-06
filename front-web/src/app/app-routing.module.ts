import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListarLogHistorialComponent} from './Modulos/logHistorial/listar-log-historial/listar-log-historial.component';
import {ListarAreaSensorComponent} from './Modulos/AreaSensor/listar-area-sensor/listar-area-sensor.component';


const routes: Routes = [
  {
    path: 'log',
    component: ListarLogHistorialComponent
  },
  {
    path: 'areaSensor',
    component: ListarAreaSensorComponent
  },
  {
    path: '',
    redirectTo: 'log',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
