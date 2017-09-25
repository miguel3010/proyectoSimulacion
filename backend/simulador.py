from model.parametros import Parametros
from model.Proceso import Proceso
import datetime

class Simulador(object):

    def simular(self, param: Parametros):
        res = []
        a = Proceso(1) 
        a.h_arribo = str(datetime.time(1, 2, 3))
        a.h_f_servicio = str(datetime.time(1, 2, 3))
        a.h_servicio = str(datetime.time(1, 2, 3))
        a.l_cola = 0
        a.t_EntreArribo = 43
        a.t_espera_cola = 8
        a.t_servicio = 3
        a.t_servidor_osicio = 8
        res.append(a)
        return res