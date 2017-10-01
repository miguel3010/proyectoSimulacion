from model.Estadisticas import Estadisticas, Data_Histograma
import numpy as np
from statistics import mode


class Analisis(object):
    def analizar(self, resultados):
        datos_t_arribo = self.pull_t_arribo(resultados)
        datos_t_servicio = self.pull_t_servicio(resultados)
        datos = Estadisticas()

        # Analisis de tiempo de Arribo
        datos.estadisticas_t_arribo.moda = self.calc_moda(datos_t_arribo)
        datos.estadisticas_t_arribo.desv_estandar = self.calc_dev_estandar(
            datos_t_arribo)
        datos.estadisticas_t_arribo.media = self.calc_media(datos_t_arribo)
        datos.estadisticas_t_arribo.mediana = self.calc_mediana(datos_t_arribo)
        datos.estadisticas_t_arribo.varianza = self.calc_varianza(
            datos_t_arribo)

        # Analisis de tiempo de Servicio
        datos.estadisticas_t_servicio.moda = self.calc_moda(datos_t_servicio)
        datos.estadisticas_t_servicio.desv_estandar = self.calc_dev_estandar(
            datos_t_servicio)
        datos.estadisticas_t_servicio.media = self.calc_media(datos_t_servicio)
        datos.estadisticas_t_servicio.mediana = self.calc_mediana(
            datos_t_servicio)
        datos.estadisticas_t_servicio.varianza = self.calc_varianza(
            datos_t_servicio)

        datos.histograma_t_arribo = self.calc_histograma(datos_t_arribo)
        datos.histograma_t_servicio = self.calc_histograma(datos_t_servicio)

        return datos

    def calc_histograma(self, datos):
        res = []
        data, clases = np.histogram(datos, bins=10)
        i = 0

        while i < len(clases) - 1:
            h = Data_Histograma()
            h.index = i
            h.rango = "[" + format(clases[i], '.2f') + \
                ", " + format(clases[i + 1], '.2f') + "]"
            h.dato = int(data[i])
            res.append(h)
            i = i + 1
        return res

    def calc_varianza(self, resultados):
        return np.var(resultados, dtype=np.float64)

    def calc_moda(self, resultados):
        return mode(resultados)

    def calc_mediana(self, resultados):
        return np.median(resultados)

    def calc_dev_estandar(self, resultados):
        return np.std(resultados, dtype=np.float64)

    def calc_media(self, resultados):
        return np.mean(resultados, dtype=np.float64)

    def pull_t_arribo(self, resultados):
        res = []
        i = 0
        while i < len(resultados):
            res.append(resultados[i].t_EntreArribo)
            i = i + 1
        return res

    def pull_t_servicio(self, resultados):
        res = []
        i = 0
        while i < len(resultados):
            res.append(resultados[i].t_servicio)
            i = i + 1
        return res
