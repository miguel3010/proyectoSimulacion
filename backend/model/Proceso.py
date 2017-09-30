
import datetime
import json


class Proceso(object):
    numeroCliente = -1
    t_EntreArribo = -1  # tiempo entre arribos Minutos
    t_servicio = -1  # tiempo de servicio
    h_arribo = None  # hora de arribo
    h_servicio = None  # hora de inicio de servicio
    h_f_servicio = None  # hora de fin de servicio
    t_espera_cola = -1  # Tiempo de espera en cola
    t_servidor_osicio = -1  # Tiempo de servidor ocioso
    l_cola = -1  # Longitud de cola

    def __init__(self, nCliente: int):
        self.numeroCliente = nCliente

    def toJSON(self):
       return json.dumps(self,  ensure_ascii=False, default=self.json_default).encode('utf-8')

    def json_default(self, value):
        if isinstance(value, datetime.date):
           return value.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return value.__dict__
