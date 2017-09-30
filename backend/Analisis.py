from model.Estadisticas import Estadisticas
class Analisis(object):
    def analizar(self,resultados):
        datos_t_arribo = self.pull_t_arribo(resultados)
        datos_t_servicio = self.pull_t_servicio(resultados)
        datos = Estadisticas()
        datos.estadisticas_t_arribo.moda = self.calc_moda(datos_t_arribo)
        datos.estadisticas_t_servicio.moda = self.calc_moda(datos_t_servicio)


    def calc_varianza(self,resultados):
        return 0
    def calc_moda(self,resultados):
        return 0
    def calc_mediana(self,resultados):
        return 0
    def calc_dev_estandar(self,resultados):
        return 0
    def calc_media(self,resultados):
        return 0
    def pull_t_arribo(self,resultados):
        res = []
        i = 0
        while i < resultados.size:
            res.append(resultados[i].t_EntreArribo)
            i = i + 1
        return res
    def pull_t_servicio(self,resultados):
        res = []
        i = 0
        while i < resultados.size:
            res.append(resultados[i].t_servicio)
            i = i + 1
        return res