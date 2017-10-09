export class Client {
    x: number;
    y: number;
    radio: number;
    color: any;
    context: any;
    newpos: Boolean;
    newX: number;
    newy: number;
    cuart: number;
    dy_x: number;

    constructor(context, color, x, y, radius) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.radio = radius;
        this.context = context;
        this.newpos = false;
        this.Draw();
        this.dy_x = 3;
    }

    private Draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radio, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = this.color;
        this.context.stroke();
    }

    public update() {
       
            if (this.newX > this.x) {
                this.x += this.dy_x;
            }
            if (this.newy > this.y) {
                this.y += this.dy_x;
            }
            if (this.newy < this.y) {
                this.y -= this.dy_x;
            }
            if (this.newX < this.x) {
                this.x -= this.dy_x;
            }

        this.Draw();

    }

    public setNewPos(x, y) {
        if (x !== this.x) {
            this.newX = x;
            this.newpos = true;

        }
        if (y !== this.y) {
            this.newy = y;
            this.newpos = true;
        }
    }


}
