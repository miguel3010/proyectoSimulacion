import { Distribucion } from './Distribucion';

export class Parametros {
    dist_Server: Distribucion;
    dist_cola: Distribucion;
    nCliente: number;
    um_tiempo: number;

    public isValid() {
        if (this.dist_cola.isValid()
            && this.dist_Server.isValid()
            && this.nCliente > 10
            && this.um_tiempo >= 0 && this.um_tiempo <= 2) {
            return true;
        }
        return false;
    }
}
