import { Estadisticas } from './../../app/Model/Estadisticas';
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
  public lineChartType = 'line';

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
    this.lineChartData = this.getFrecuencyArray(this.estadisticas.histograma_t_arribo); //number[]
    this.lineChartLabels = this.getLabelArray(this.estadisticas.histograma_t_arribo); //string[]

    // grafica 2
    this.lineChartData = this.getFrecuencyArray(this.estadisticas.histograma_t_servicio); //number[]
    this.lineChartLabels = this.getLabelArray(this.estadisticas.histograma_t_servicio); //string[]


    console.log(this.estadisticas);
  }
  
  getFrecuencyArray(arregloFrecuencia){
    let i = 0
    let frecuencia:Array<any> = new Array(this.lineChartData.length);
    while (i < arregloFrecuencia.length){
    frecuencia[i] = {data: (this.estadisticas.histograma_t_arribo[i].dato), label: this.lineChartData[i].label};
      i++
    }
      console.log(frecuencia)
    return frecuencia
  }

  getLabelArray(arregloLabel){
    let i = 0
    let label:Array<string> = new Array(this.lineChartLabels.length)
    while (i < arregloLabel.length){
    label[i] = (this.estadisticas.histograma_t_arribo[i].rango);
      i++
    }
      console.log(label)
    return label
  }
  
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

