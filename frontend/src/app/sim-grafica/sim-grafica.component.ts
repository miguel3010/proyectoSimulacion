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

  ngAfterViewInit() { // wait for the view to init before using the element

    this.context = this.chessCanvas.nativeElement.getContext('2d');
    this.width = this.context.canvas.width;
    this.height = window.screen.height * 0.76;
    this.context.canvas.height = this.height;

    this.cola = 0;
    console.log('height ' + this.height + ' width ' + this.width);

    this.drawpref();

  }
  update() {
    
  }

  animPOP() {
    
  }

  public pop() {
    this.cola++;
    this.animPOP();
  }

  public push() {
    this.cola--;
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

    this.drawCircle(this.width / 2, (this.height * 0.10) / 2, this.height * 0.03, '#FF6F00');

    this.drawCircle(65, 100, this.height * 0.03, '#388E3C');

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
