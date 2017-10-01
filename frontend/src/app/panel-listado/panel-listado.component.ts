import { SimGraficaComponent } from './../sim-grafica/sim-grafica.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-listado',
  templateUrl: './panel-listado.component.html',
  styleUrls: ['./panel-listado.component.css']
})
export class PanelListadoComponent implements OnInit {

  @Input() enProceso = []; 
  constructor() { }

  ngOnInit() {
  }
}


class RootObject {
  estadisticas_t_arribo: Estadisticastarribo;
  estadisticas_t_servicio: Estadisticastarribo;
  histograma_t_arribo: Histogramatarribo[];
  histograma_t_servicio: Histogramatarribo[];
}

class Histogramatarribo {
  dato: number;
  index: number;
  rango: string;
}

class Estadisticastarribo {
  desv_estandar: number;
  media: number;
  mediana: number;
  moda: number;
  varianza: number;
}
