import { SimGraficaComponent } from './../sim-grafica/sim-grafica.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-listado',
  templateUrl: './panel-listado.component.html',
  styleUrls: ['./panel-listado.component.css']
})
export class PanelListadoComponent implements OnInit {

  @Input() grafico: SimGraficaComponent;

  constructor() { }

  ngOnInit() {
  }

  addnewClient() {
    this.grafico.push();
  }

  removeClient() {
    this.grafico.pop();
  }

}