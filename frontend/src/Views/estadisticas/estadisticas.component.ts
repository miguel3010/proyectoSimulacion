import { Estadisticas, DatoHistograma } from './../../app/Model/Estadisticas';
import { ApiService } from './../../app/api.service';
import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  private estadisticas: Estadisticas;
  ready = false;

  public lineChartLegend = true;
  public lineChartType = 'bar';

  public lineChartData: Array<any> = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Serie de Cola' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(24,127,230,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(230,24,24,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];

  constructor(private titleService: Title, private api: ApiService) { }



  ngOnInit() {
    this.titleService.setTitle('Estadísticas');
    this.api.getEstadisticas().subscribe(response => {
      this.estadisticas = response.json();
      this.showData();
    }, error => {
      alert('Falló conexion con el servidor');
    });
  }

  showData() {
    this.ready = true;
    // grafica 1
    this.lineChartData = this.getFrecuencyArray(this.estadisticas.histograma_t_arribo);
    this.lineChartLabels = this.getLabelArray(this.estadisticas.histograma_t_arribo);

    // grafica 2
    this.lineChartData = [
      { data: this.getFrecuencyArray(this.estadisticas.histograma_t_servicio) , label: 'frecuencias' }
    ];
    this.lineChartLabels = this.getLabelArray(this.estadisticas.histograma_t_servicio);


    console.log(this.estadisticas);
  }

  getFrecuencyArray(arregloFrecuencia: DatoHistograma[]) {
    let i = 0;
    let frec = [];
    while (i < arregloFrecuencia.length) {
      frec.push(arregloFrecuencia[i].dato);
      i++;
    }
    console.log(frec);
    return frec;
  }

  getLabelArray(arregloLabel: DatoHistograma[]) {
    let i = 0;
    let frec = [];
    while (i < arregloLabel.length) {
      frec.push(arregloLabel[i].rango);
      i++;
    }
    console.log(frec);
    return frec;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

