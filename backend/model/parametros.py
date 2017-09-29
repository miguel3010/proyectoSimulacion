import json

class Parametros(object):
    dist_cola = None
    dist_Server = None
    um_tiempo = -1 # 0 Horas 1 Minutos 2 Segundos
    nCliente = -1 

    

    def __init__(self):
        self.dist_cola = Distribucion()
        self.dist_cola.dist = 1
        self.dist_cola.min = 0
        self.dist_cola.max = 5
        self.dist_Server = Distribucion()
        self.dist_Server.dist = 1
        self.dist_Server.min = 2
        self.dist_Server.max = 10

        self.um_tiempo = 1
        self.nCliente = 100

    def toJSON(self):
        return json.dumps(self, default = lambda o:o.__dict__, 
            sort_keys = True, indent = 4)

    def fromJSON(self, json_content):
        data = json.loads(json_content)
        for key, value in data.items():
            self.__dict__[key] = value

    def isValid(self):
        if (self.dist_cola != None 
            and self.dist_Server != None
            and self.dist_Server.isValid()
            and self.dist_cola.isValid() 
            and self.nCliente > 0 
            and self.um_tiempo >= 0 
            and self.um_tiempo <= 2 ):
            return True     
        return False

class Distribucion(object):
    dist = 0 # 0 Normal, 1 Uniforme, 2Poisson
    desv_standar = -1.0
    promedio = -1.0
    min = -1.0
    max = -1.0

    def __init__(self):
        self.dist = 0 # 0 Normal, 1 Uniforme, 2Poisson
        self.desv_standar = 0
        self.promedio = 0
        self.min = 0
        self.max = 0

    def isValid(self):
        if (self.dist == 0):
            if( self.desv_standar > 0 
            and self.desv_standar <= 1
            and self.promedio > 0):
                return True    

        if(self.dist == 1):
            if(self.min < self.max):
                return True

        if(self.dist == 2):
            if(self.promedio > 0):
                return True
        return False
