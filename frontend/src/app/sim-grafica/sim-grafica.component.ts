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

  ngAfterViewInit() { // wait for the view to init before using the element

    this.context = this.chessCanvas.nativeElement.getContext('2d');
    this.width = this.context.canvas.width;
    this.height = window.screen.height * 0.76;
    this.context.canvas.height = this.height;

    this.cola = 50;
    this.circleRadio = this.height * 0.03;
    this.refpointY = (this.height * 0.10) * 2 - this.circleRadio;
    this.refpointX = this.width / 2;
    this.spacesize = this.circleRadio * 2;
    this.interlineado = this.circleRadio / 2;

    this.horizontalSpaces = (this.width * 0.90) / (this.spacesize + this.interlineado);
    this.verticalSpaces = (this.height - this.refpointY) / (this.spacesize + this.interlineado);
    this.update();
  }
  update() {
    this.clearall();
    this.drawpref();

    for (let index = 1; index <= this.cola; index++) {
      const pos: Point = this.getClientPosition(index);
      this.drawCircle(pos.x, pos.y, this.circleRadio, this.clientColor);
    }
  }
  getClientPosition(i) {
    const p: Point = new Point();
    if (i === 1) {
      p.y = this.refpointY;
      p.x = this.refpointX;
    } else if (i - 1 <= this.horizontalSpaces / 2) {
      i--;
      p.y = this.refpointY + this.spacesize * 2;
      p.x = this.refpointX + ((this.spacesize * (i - 1)) + (this.interlineado * (i - 1)));
    } else {
      i--;
      let e = i + 1 - this.horizontalSpaces / 2;
      e = e / this.horizontalSpaces;

      p.y = (this.refpointY + this.spacesize * 2) + (this.spacesize + this.interlineado * 3) * Math.trunc(e + 1);

      if (Math.trunc(e % 2) === 0) {

        let ex_izq = Math.floor(this.horizontalSpaces / 2);
        let pos_max = this.refpointX + ((this.spacesize * (ex_izq - 1)) + (this.interlineado * (ex_izq - 1)));
        let ii = i - Math.floor(this.horizontalSpaces / 2) - (Math.trunc(e) * this.horizontalSpaces);
        p.x = pos_max - ((this.spacesize * (ii - 1)) + (this.interlineado * (ii - 1)));

      } else {
        let ex_der = Math.floor(this.horizontalSpaces / 2);
        let pos_max = this.refpointX - ((this.spacesize * (ex_der - 1)) + (this.interlineado * (ex_der - 1)));
        let ii = i - Math.floor(this.horizontalSpaces / 2) - (Math.trunc(e) * this.horizontalSpaces);
        p.x = pos_max + ((this.spacesize * (ii)) + (this.interlineado * (ii)));
      }
    }
    return p;
  }

  public pop() {
    if (this.cola > 0) {
      this.cola--; 
      this.update();
    }
  }

  public push() {
    this.cola++;
    this.update();
  }

  drawpref() {
    this.context.beginPath();
    this.context.moveTo((this.width * 0.125), (this.height * 0.10));
    this.context.lineWidth = 5;
    this.context.lineCap = 'square';
    this.context.shadowBlur = 0;
    this.context.lineTo((this.width * (0.75 + 0.125)), (this.height * 0.10));
    this.context.strokeStyle = '#1E88E5';
    this.context.stroke();

    this.drawCircle(this.width / 2, (this.height * 0.10) / 2, this.height * 0.03, this.serverColor);
  }

  drawCircle(x, y, radio, color) {
    this.context.beginPath();
    this.context.arc(x, y, radio, 0, 2 * Math.PI, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.lineWidth = 5;
    this.context.strokeStyle = color;
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
