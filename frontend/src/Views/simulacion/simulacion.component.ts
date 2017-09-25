import { SimGraficaComponent } from './../../app/sim-grafica/sim-grafica.component';
import { ApiService } from './../../app/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})
export class SimulacionComponent implements OnInit {
  private procesos = [];
  private enProceso = [];
  @ViewChild('grafica') grafico: SimGraficaComponent;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.simular().subscribe(response => {
      this.procesos = response.json();
      console.log(this.procesos);
      this.iniciarSimulacion();
    }, error => {
      alert('Falló conexion con el servidor');
    });

  }
  iniciarSimulacion() {
    if (this.procesos.length > 0) {
      for (let index = 0; index < this.procesos.length; index++) {
        this.enProceso.push(this.procesos[index]);
        this.addnewClient();
      }
    }
  }
  addnewClient() {
    this.grafico.push();
  }

  removeClient() {
    this.grafico.pop();
  }

}
