import { Distribucion } from './../Model/Distribucion';
import { Component, OnInit, Input } from '@angular/core';
import {Parametros} from '../Model/Parametros';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {

  @Input() data: Distribucion;

  constructor() {
   }

  ngOnInit() {}

  saverange() {
    console.log('' + this.data.dist);
  }
}
