class Estadisticas {
    estadisticas_t_arribo: EstadisticasDescriptivas;
    estadisticas_t_servicio: EstadisticasDescriptivas;
    histograma_t_arribo: DatoHistograma[];
    histograma_t_servicio: DatoHistograma[];
}

class DatoHistograma {
    dato: number;
    index: number;
    rango: string;
}

class EstadisticasDescriptivas {
    desv_estandar: number;
    media: number;
    mediana: number;
    moda: number;
    varianza: number;
}
