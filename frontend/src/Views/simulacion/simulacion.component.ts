import { Proceso } from './../../app/Model/Proceso';
import { SimGraficaComponent } from './../../app/sim-grafica/sim-grafica.component';
import { ApiService } from './../../app/api.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css']
})
export class SimulacionComponent implements OnInit {
  procesos: Proceso[];
  enProceso: Proceso[];
  finalizados: Proceso[];
  private subscription: Subscription;
  currentTime: Date;
  public timeStep_miliseconds = 10;
  timer = 'Cargando Datos...';

  @ViewChild('grafica') grafico: SimGraficaComponent;
  constructor(private api: ApiService, private titleService: Title, public datepipe: DatePipe) { }

  ngOnInit() {
    this.currentTime = new Date();
    this.enProceso = [];
    this.finalizados = [];
    this.titleService.setTitle('Simulación');
    this.api.simular().subscribe(response => {
      this.procesos = response.json();
      this.startAnimation();
    }, error => {
      alert('Falló conexion con el servidor');
    });

  }
  startAnimation() {
    const timerInitialTime = new Date(this.procesos[0].h_arribo);
    timerInitialTime.setHours(0); timerInitialTime.setMinutes(0); timerInitialTime.setSeconds(0); timerInitialTime.setMilliseconds(0);
    this.currentTime.setTime(new Date(timerInitialTime).getTime());
    const timer = TimerObservable.create(this.procesos.length - this.enProceso.length - this.finalizados.length, this.timeStep_miliseconds);
    this.subscription = timer.subscribe(t => {
      this.process();
    });
  }

  process() {
    this.currentTime.setTime(this.currentTime.getTime() + 1000);
    const index = this.enProceso.length + this.finalizados.length;
    this.timer = this.datepipe.transform(this.currentTime, 'HH:mm:ss');
    if (new Date(this.procesos[index].h_arribo).getTime() <= this.currentTime.getTime()) {
      this.enProceso.push(this.procesos[index]);
      this.addnewClient();
    }
    if (this.enProceso.length > 0) {
      if (new Date(this.enProceso[0].h_f_servicio).getTime() <= this.currentTime.getTime()) {
        this.finalizados.push(this.procesos[0]);
        this.enProceso.splice(0, 1);
        this.removeClient();
      }
    }
  }

  OnDestroy() {
    this.subscription.unsubscribe();
  }

  addnewClient() {
    this.grafico.push();
  }

  removeClient() {
    this.grafico.pop();
  }

}
