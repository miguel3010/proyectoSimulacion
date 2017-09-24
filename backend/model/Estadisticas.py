import json
class Estadisticas(object):
    moda = 0
    media = 0
    desv_estandar = 0
    

    def toJSON(self):
        return json.dumps(self, default = lambda o:o.__dict__, 
            sort_keys = True, indent = 4)