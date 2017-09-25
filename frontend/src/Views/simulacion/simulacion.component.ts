import { ApiService } from './../../app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})
export class SimulacionComponent implements OnInit {
  private procesos = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.simular().subscribe(response => {
      this.procesos = response.json();
      console.log(this.procesos);
    }, error => {
      alert('Falló conexion con el servidor');
    });
  }

}
