import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private titleService: Title) { }



  ngOnInit() {
    this.titleService.setTitle('Estadísticas');

  }

}
