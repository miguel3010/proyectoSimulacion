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
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Serie de Servidor' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Serie de Cola' },
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
    //this.lineChartData = this.getarray(this.estadisticas.histograma_t_arribo); //number[]
    //this.lineChartLabels = this.getarrhffk(this.estadisticas.histograma_t_arribo); //string[]

     // grafica 2
//     this.lineChartData = this.getarray(this.estadisticas.histograma_t_arribo); //number[]
  //   this.lineChartLabels = this.getarrhffk(this.estadisticas.histograma_t_arribo); //string[]

    console.log(this.estadisticas);
  } 
  
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

