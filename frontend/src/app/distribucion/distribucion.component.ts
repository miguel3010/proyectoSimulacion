import { Distribucion } from './../Model/Distribucion';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parametros } from '../Model/Parametros';

@Component({
  selector: 'app-distribucion',
  templateUrl: './distribucion.component.html',
  styleUrls: ['./distribucion.component.css']
})
export class DistribucionComponent implements OnInit {

  @Input() data: Distribucion;
  @Output() modelChange: EventEmitter<Distribucion> = new EventEmitter();
  constructor() {
  }

  onChanges() {
        this.modelChange.emit(this.data);
  }

  ngOnInit() { }

  saverange() {
    console.log('' + this.data.dist);
  }
}
