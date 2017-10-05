from model.parametros import Parametros
from model.Proceso import Proceso
import datetime
import numpy as np
import math


class Simulador(object):
    params: Parametros
    index: int

    def simular(self, param: Parametros):
        """Proceso principal de simulación"""
        if param.isValid():
            self.params = param
            res = []
            i = 1
            self.index = 0
            while i <= param.nCliente:
                a = Proceso(i)
                a.l_cola = 0
                res.append(a)
                i = i + 1
            self.generarTiempo_Arribo(res)
            self.generarTiempo_Servicio(res)
            self.process(res)
            return res
        return None

    def process(self, data):
        i = 0
        data[i].h_arribo = datetime.datetime(2000, 1, 1, 0, 00)
        self.calc_hora_arribo(None, data[i])
        self.calc_hora_inicio_servicio(None, data[i])
        self.calc_hora_fin_Servicio(data[i])
        self.calc_tiempo_cola(data[i])
        self.calc_tiempo_servidor_osioso(None, data[i])
        i = i + 1
        while i < self.params.nCliente:
            a = data[i]
            b = data[i - 1]

            self.calc_hora_arribo(b,a)
            self.calc_hora_inicio_servicio(b,a)
            self.calc_hora_fin_Servicio(a)
            self.calc_tiempo_cola(a)
            self.calc_tiempo_servidor_osioso(b,a) 
            i = i + 1
        i=0
        while i < self.params.nCliente:
            self.calc_longitud_cola(a, data, i - 1)
            i = i + 1 

    def calc_tiempo_servidor_osioso(self, data_1: Proceso, data: Proceso):
        if(data_1 == None):
            if (self.params.um_tiempo == 0):
                data.t_servidor_osicio = data.h_servicio.hour
            elif (self.params.um_tiempo == 1):
                data.t_servidor_osicio = data.h_servicio.minute
            elif (self.params.um_tiempo == 2):
                data.t_servidor_osicio = data.h_servicio.second
        else:
            if (self.params.um_tiempo == 0):
                diff = data.h_servicio - data_1.h_f_servicio
                data.t_servidor_osicio = diff.seconds / 3600
            elif (self.params.um_tiempo == 1):
                diff = data.h_servicio - data_1.h_f_servicio
                data.t_servidor_osicio = diff.seconds / 60
            elif (self.params.um_tiempo == 2):
                diff = data.h_servicio - data_1.h_f_servicio
                data.t_servidor_osicio = diff.seconds

    def calc_tiempo_cola(self, data):
        if (self.params.um_tiempo == 0):
            data.t_espera_cola = abs(
                (data.h_arribo - data.h_servicio).total_seconds() / 3600)
        elif (self.params.um_tiempo == 1):
            data.t_espera_cola = abs(
                (data.h_arribo - data.h_servicio).total_seconds() / 60)
        elif (self.params.um_tiempo == 2):
            data.t_espera_cola = abs(
                (data.h_arribo - data.h_servicio).total_seconds())

    def calc_hora_arribo(self, data_1: Proceso, data: Proceso):
        if(data_1 == None):
            if (self.params.um_tiempo == 0):
                data.h_arribo = data.h_arribo + \
                    datetime.timedelta(seconds=data.t_EntreArribo)
            elif (self.params.um_tiempo == 1):
                data.h_arribo = data.h_arribo + \
                    datetime.timedelta(minutes=data.t_EntreArribo)
            elif (self.params.um_tiempo == 2):
                data.h_arribo = data.h_arribo + \
                    datetime.timedelta(hours=data.t_EntreArribo)
        else:
            if (self.params.um_tiempo == 0):
                data.h_arribo = data_1.h_arribo + \
                    datetime.timedelta(seconds=data.t_EntreArribo)
            elif (self.params.um_tiempo == 1):
                data.h_arribo = data_1.h_arribo + \
                    datetime.timedelta(minutes=data.t_EntreArribo)
            elif (self.params.um_tiempo == 2):
                data.h_arribo = data_1.h_arribo + \
                    datetime.timedelta(hours=data.t_EntreArribo)

    def calc_hora_inicio_servicio(self, data_1: Proceso, data: Proceso):
        if(data_1 == None):
            data.h_servicio = data.h_arribo
        else:
            if(data.h_arribo > data_1.h_f_servicio):
                data.h_servicio = data.h_arribo
            else:
                data.h_servicio = data_1.h_f_servicio

    def calc_hora_fin_Servicio(self, data: Proceso):
        if (self.params.um_tiempo == 0):
            data.h_f_servicio = data.h_servicio + \
                datetime.timedelta(seconds=data.t_servicio)
        elif (self.params.um_tiempo == 1):
            data.h_f_servicio = data.h_servicio + \
                datetime.timedelta(minutes=data.t_servicio)
        elif (self.params.um_tiempo == 2):
            data.h_f_servicio = data.h_servicio + \
                datetime.timedelta(hours=data.t_servicio)

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
                dist.min, dist.max + 1, self.params.nCliente)
        elif dist.dist == 2:
            num = self.distAleatoria_Poisson(
                dist.promedio, self.params.nCliente)
        if num is not None and num.size > 0:
            i = 0
            while i < self.params.nCliente:
                data[i].t_EntreArribo = math.floor(num[i])
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
                dist.min, dist.max + 1, self.params.nCliente)
        elif dist.dist == 2:
            num = self.distAleatoria_Poisson(
                dist.promedio, self.params.nCliente)
        if num is not None and num.size > 0:
            i = 0
            while i < self.params.nCliente:
                data[i].t_servicio = math.floor(num[i])
                i = i + 1

    def calc_longitud_cola(self,  current: Proceso, data, position: int):
        if(data[self.index].h_f_servicio > current.h_arribo):
            current.l_cola = data[position].l_cola + 1
        if(data[self.index].h_f_servicio <= current.h_arribo):
            acumulador = 0
            while(data[self.index].h_f_servicio <= current.h_arribo):
                self.index = self.index + 1
                acumulador = acumulador + 1
            current.l_cola = data[position].l_cola + 1 - acumulador
