import { Estadisticas, DatoHistograma, EstadisticasDescriptivas } from './../../app/Model/Estadisticas';
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

  public descriptivaChart_arribo: Array<any>;
  public descriptivaChart_servicio: Array<any>;
  public descriptivaChart_label: Array<any> = ['Desviación Estándar', 'Media', 'Mediana', 'Moda', 'Varianza'];

  //gráfica 1
  public lineChartLegend = true;
  public lineChartType = 'bar';

  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // blue
      backgroundColor: 'rgba(24,127,230,1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //gráfica 2
  public barChartLegend = true;
  public barChartType = 'bar';

  public barChartData: Array<any>;
  public barChartLabels: Array<any>;
  public barChartOptions: any = {
    responsive: true
  };
  public barChartColors: Array<any> = [
    { // red
      backgroundColor: 'rgb(255,152,1)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
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
    this.lineChartData = [
      { data: this.getFrecuencyArray(this.estadisticas.histograma_t_arribo), label: 'Frecuencias de Tiempo de Arribo' }
    ];
    this.lineChartLabels = this.getLabelArray(this.estadisticas.histograma_t_arribo);

    // grafica 2
    this.barChartData = [
      { data: this.getFrecuencyArray(this.estadisticas.histograma_t_servicio), label: 'Frecuencias de Servicio' }
    ];
    this.barChartLabels = this.getLabelArray(this.estadisticas.histograma_t_servicio);

    // estadistica descriptiva 
    this.descriptivaChart_arribo = [
      { data: this.getEstadisticaDescriptiva(this.estadisticas.estadisticas_t_arribo) }
    ];
    this.descriptivaChart_servicio = [
      { data: this.getEstadisticaDescriptiva(this.estadisticas.estadisticas_t_servicio) }
    ];

    console.log(this.estadisticas);
  }

  getEstadisticaDescriptiva(arregloDescripcion: EstadisticasDescriptivas) {
    let res = [];
    res[0] = arregloDescripcion.desv_estandar;
    res[1] = arregloDescripcion.media;
    res[2] = arregloDescripcion.mediana;
    res[3] = arregloDescripcion.moda;
    res[4] = arregloDescripcion.varianza;
    console.log(res);
    return res;
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

