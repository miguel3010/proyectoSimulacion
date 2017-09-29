from model.parametros import Parametros
from model.Proceso import Proceso
import datetime
import numpy as np


class Simulador(object):
    params: Parametros

    def simular(self, param: Parametros):
        """Proceso principal de simulación"""
        if param.isValid():
            self.params = param
            res = []
            i = 1
            while i <= param.nCliente:
                a = Proceso(i)
                a.h_arribo = str(datetime.time(1, 2, 3))
                a.h_f_servicio = str(datetime.time(1, 2, 3))
                a.h_servicio = str(datetime.time(1, 2, 3))
                a.l_cola = 0
                a.t_EntreArribo = 43
                a.t_espera_cola = 8
                a.t_servicio = 3
                a.t_servidor_osicio = 8
                res.append(a)
                i = i + 1
            self.generarTiempo_Arribo(res)
            self.generarTiempo_Servicio(res)
            # self.process(res)
            return res
        return None

    def process(self, data):
        pass

    def distAleatoria_Normal(self, desv_est, promedio, cant):
        """Generación de numeros aleatorios con distribución Normal"""
        return np.random.normal(promedio, desv_est, cant)

    def distAleatoria_Uniforme(self, min, max, cant):
        """Generación de numeros aleatorios con distribución Uniforme"""
        return np.random.uniform(min, max, cant)

    def distAleatoria_Poisson(self, promedio, cant):
        """Generación de numeros aleatorios con distribución Poisson"""
        return np.random.poisson(promedio, cant)

    def generarTiempo_Arribo(self, data):
        """Proceso de generación de tiempos entre arribo según la distribución
        especificados en Parametros params"""
        num = []
        dist = self.params.dist_cola
        if dist.dist == 0:
            num = self.distAleatoria_Normal(
                dist.desv_standar, dist.promedio, self.params.nCliente)
        elif dist.dist == 1:
            num = self.distAleatoria_Uniforme(
                dist.min, dist.max, self.params.nCliente)
        elif dist.dist == 2:
            num = self.distAleatoria_Poisson(
                dist.promedio, self.params.nCliente)
        if num is not None and num.size > 0:
            i = 0
            while i < self.params.nCliente:
                data[i].t_EntreArribo = num[i]
                i = i + 1

    def generarTiempo_Servicio(self, data):
        """Proceso de generación de tiempos de servicio según la distribución
         especificados en Parametros params"""
        num = []
        dist = self.params.dist_Server
        if dist.dist == 0:
            num = self.distAleatoria_Normal(
                dist.desv_standar, dist.promedio, self.params.nCliente)
        elif dist.dist == 1:
            num = self.distAleatoria_Uniforme(
                dist.min, dist.max, self.params.nCliente)
        elif dist.dist == 2:
            num = self.distAleatoria_Poisson(
                dist.promedio, self.params.nCliente)
        if num is not None and num.size > 0:
            i = 0
            while i < self.params.nCliente:
                data[i].t_servicio = num[i]
                i = i + 1
