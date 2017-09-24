export class Distribucion {
    dist: number;
    max: number;
    min: number;
    desv_standar: number;
    promedio: number;

    public Distribucion() {
        this.dist = 0;
        this.max = 0;
        this.min = 0;
        this.desv_standar = 0;
        this.promedio = 0;
    }

    public isValid(): boolean {
        if (this.dist > 0
            && this.dist <= 2) {
            return true;
        }
        return false;
    }
}
