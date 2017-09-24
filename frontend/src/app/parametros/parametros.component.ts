import { Response } from '@angular/http';
import { Parametros } from './../Model/Parametros';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  private params: Parametros;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get_Parameters().subscribe(response => {
      this.params = response.json();
      console.log(this.params);
    }, error => {
      alert('error no params.');
    });
  }
  saverange(r) {
    console.log('sef' + this.params.dist_cola.desv_standar);
  }

  onSelect() {
    console.log(this.params.um_tiempo);
  }

  actualizarParametros() {
    if (this.params != null) {
      this.api.post_Parameters(this.params).subscribe(Response => {
        alert('Parametros actualizado');
      }, error => {
        alert('[Error]: los parametros están corruptos...');
      });
    }
  }
}
