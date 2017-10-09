import { element } from 'protractor';
import { Client } from './client';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sim-grafica',
  templateUrl: './sim-grafica.component.html',
  styleUrls: ['./sim-grafica.component.css']
})
export class SimGraficaComponent implements AfterViewInit {
  @ViewChild('myCanvas') chessCanvas: ElementRef;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;

  cola: number;
  refpointX: number;
  refpointY: number;
  circleRadio: number;
  clientColor = '#388E3C';
  serverColor = '#FF6F00';
  spacesize: number;
  interlineado: number;
  verticalSpaces: number;
  horizontalSpaces: number;
  serverSize: number;
  clients: Client[];
  lClients: Client[];

  ngAfterViewInit() { // wait for the view to init before using the element
    this.clients = [];
    this.lClients = [];
    this.context = this.chessCanvas.nativeElement.getContext('2d');
    this.context.translate(0.5, 0.5);

    this.width = this.context.canvas.width;
    this.height = window.screen.height * 0.76;
    this.context.canvas.height = this.height;

    this.context.scale(1, 1);
    this.cola = 50;
    this.circleRadio = this.height * 0.03;
    this.refpointX = this.width / 2;
    this.spacesize = this.circleRadio * 2;
    this.refpointY = (this.height * 0.10) * 2 - this.circleRadio + this.spacesize * 2;
    this.interlineado = this.circleRadio / 2;

    this.horizontalSpaces = Math.floor((this.refpointX - this.width * 0.1) / (this.spacesize));
    this.verticalSpaces = Math.floor((this.height - this.refpointY) / (this.circleRadio + this.spacesize));
    this.serverSize = 6 * this.circleRadio;


    this.animate();
  }
  getColor() {
    return 'rgb(0,0,' + Math.floor(Math.random() * 255) + ')';
  }

  public animate() {
    requestAnimationFrame(() => { this.animate(); });
    this.clearall();
    this.drawpref();
    if (this.clients.length > 0) {
      for (let index = 0; index < this.clients.length; index++) {
        const pos: Point = this.getClientPosition(index + 1);
        const aux = this.clients[index];
        aux.setNewPos(pos.x, pos.y);
        aux.update();
      }
      for (let index = 0; index < this.lClients.length; index++) {
        const aux = this.lClients[index];
        aux.update();
      }
    }
  }
  getClientPosition(i) {
    const p: Point = new Point();
    if (i === 1) {
      p.y = this.refpointY;
      p.x = this.width * 0.75;
    } else {
      i--;
      let e = i - 1;
      e = Math.floor(e / this.horizontalSpaces);

      p.y = (this.refpointY) + (this.spacesize + this.interlineado * 4) * Math.trunc(e);
      if (Math.trunc(e % 2) === 0) {
        const ex_izq = this.horizontalSpaces;
        const pos_max = this.refpointX;
        const ii = i - (Math.floor(e) * this.horizontalSpaces);
        p.x = pos_max - ((this.spacesize * (ii)) + (this.interlineado * (ii - 1)));

      } else {
        const ex_izq = this.horizontalSpaces;
        const pos_max = this.refpointX - ((this.spacesize * (this.horizontalSpaces)) +
          (this.interlineado * (this.horizontalSpaces - 1)));
        const ii = i - (Math.floor(e) * this.horizontalSpaces);
        p.x = pos_max + ((this.spacesize * (ii - 1)) + (this.interlineado * (ii - 1)));

      }
    }
    return p;
  }

  public pop() {
    if (this.clients.length > 0) {
      const aux = this.clients[0];
      aux.setNewPos(this.width + 2 * this.circleRadio, this.refpointY);
      this.lClients.push(aux);
      this.clients.splice(0, 1);
    }
  }
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public push() {
    const pos: Point = this.getClientPosition(this.clients.length);
    const client = new Client(this.context, this.getColor(), this.randomIntFromInterval(this.width * 0.1, pos.x),
      this.height + 2 * this.circleRadio, this.circleRadio);
    client.setNewPos(pos.x, pos.y);
    this.clients.push(client);

  }

  drawpref() {
    this.context.beginPath();
    this.context.moveTo(0, (this.height * 0.10));
    this.context.lineWidth = 3;
    this.context.lineCap = 'square';
    this.context.shadowBlur = 0;
    this.context.lineTo(this.width, (this.height * 0.10));
    this.context.strokeStyle = '#1E88E5';
    this.context.stroke();
    this.context.shadowBlur = 0;
    this.context.font = '25px Comic Sans MS';
    this.context.fillStyle = '#2196F3';
    this.context.textAlign = 'center';
    this.context.fillText('Cola', this.width * 0.25, (this.height * 0.10) - 12);
    this.context.fillText('Servidor', this.width * 0.75, (this.height * 0.10) - 12);
    this.context.font = '12px Comic Sans MS';
    this.context.fillStyle = '#2E7D32';
    this.context.textAlign = 'center';
    this.context.fillText('Dist. Poisson', this.width * 0.25, (this.height * 0.15) - 6);
    this.context.fillText('Dist. Normal', this.width * 0.75, (this.height * 0.15) - 6);

    this.context.font = '15px Comic Sans MS';
    this.context.fillStyle = '#2E7D32';
    this.context.textAlign = 'center';
    this.context.fillText('Clientes Procesados', this.width * 0.75, (this.height * 0.5));
    this.context.fillText(this.lClients.length.toString(), this.width * 0.75, (this.height * 0.5) + 20);

    this.context.beginPath();
    this.context.rect(this.width * 0.75 - this.serverSize / 2, (this.height * 0.20), this.serverSize, this.serverSize);
    this.context.fillStyle = this.serverColor;
    this.context.fill();
    this.context.lineWidth = 7;
    this.context.strokeStyle = this.serverColor;
    this.context.stroke();

  }


  clearall() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

}

class Point {
  public x: number;
  public y: number;
}
