import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { AutoresComponent } from './autores/autores.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { HomeViewComponent } from '../Views/home-view/home-view.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SimulacionComponent } from '../Views/simulacion/simulacion.component';
import { EstadisticasComponent } from '../Views/estadisticas/estadisticas.component';
import { RouterModule, Routes } from '@angular/router';
import { DistribucionComponent } from './distribucion/distribucion.component';
import {HttpModule} from '@angular/http';
import { SimGraficaComponent } from './sim-grafica/sim-grafica.component'; 
import { PanelListadoComponent } from './panel-listado/panel-listado.component';

const appRoutes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'simulacion',      component: SimulacionComponent },
  { path: 'estadisticas',      component: EstadisticasComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    SimulacionComponent,
    EstadisticasComponent,
    PresentacionComponent,
    ParametrosComponent,
    AutoresComponent,
    DistribucionComponent,
    SimGraficaComponent,
    PanelListadoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    ApiService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
