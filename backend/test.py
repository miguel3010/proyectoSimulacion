from model.Proceso import Proceso
from simulador import Simulador
from model.parametros import Parametros
from model.Estadisticas import Estadisticas, Estadisticas_Descriptiva
from Analisis import Analisis


def test():
    error = []
    # testSimulador(error)
    testAnalisador(error)
    if(len(error) > 0):
        for item in error:
            print(item)
    else:
        print("Todas las pruebas se superaron")


def testResults(res: Proceso, cant):
    if(res is not None and len(res) == cant):
        for item in res:
            if(not(item.h_arribo is not None
                   and item.h_f_servicio is not None
                   and item.h_servicio is not None
                   and item.l_cola >= 0
                   and item.numeroCliente >= 0
                   and item.t_EntreArribo >= 0
                   and item.t_servidor_osicio >= 0
                   and item.t_espera_cola >= 0
                   and item.t_servicio >= 0)):
                return False
        return True
    return False


def testAnalisisEstadistico(result : Estadisticas):
    if(result is not None):
        if(testEstadistica_Descriptiva(result.estadisticas_t_arribo)
           and testEstadistica_Descriptiva(result.estadisticas_t_servicio)):
            return True
    return False


def testEstadistica_Descriptiva(e: Estadisticas_Descriptiva):
    a = ""
    if(e is not None):
        if(not e.desv_estandar > 0):
            a += " Desviacion_STD"
        if(not e.media > 0):
            a += " Media"
        if( not e.mediana > 0):
            a+= " mediana"
        if(not e.moda >= 0):
            a+= " Moda"
        if(not e.varianza > 0):
            a+=" Varianza"
        if(a!=""):
            print(a)
        return True
    return False


def testSimulador(errors):
    sim = Simulador()
    p = Parametros()
    p.nCliente = 1000
    j = 0
    while (j < 3):
        p.um_tiempo = j
        i = 0
        while (i < 100):
            p.dist = 0
            p.desv_standar = i / 100
            p.promedio = i
            resultados = sim.simular(p)
            if(not testResults(resultados, p.nCliente)):
                errors.append("[error]: Distribución Normal con Desv_std = " +
                              str(p.desv_standar) + " y Promedio = " + str(p.promedio))
            i = i + 1
        i = 0
        while (i < 100):
            p.dist = 1
            p.min = i
            p.max = i + 2 * i
            resultados = sim.simular(p)
            if(not testResults(resultados, p.nCliente)):
                errors.append("[error]: Distribución Uniforme con min = " +
                              str(p.min) + " y max = " + str(p.max))
            i = i + 1

        i = 0
        while (i < 100):
            p.dist = 2
            p.promedio = i

            resultados = sim.simular(p)
            if(not testResults(resultados, p.nCliente)):
                errors.append(
                    "[error]: Distribución Pisson con Promedio = " + str(p.promedio))
            i = i + 1
        j = j + 1


def testAnalisador(errors):
    sim = Simulador()
    p = Parametros()
    p.nCliente = 1000
    j = 0
    while (j < 3):
        p.um_tiempo = j
        i = 0
        while (i < 100):
            p.dist = 0
            p.desv_standar = i / 100
            p.promedio = i
            resultados = sim.simular(p)
            est = Analisis().analizar(resultados)
            if(not testAnalisisEstadistico(est)):
                errors.append("[error]: Analisis Estadistico de Distribución Normal con Desv_std = " +
                              str(p.desv_standar) + " y Promedio = " + str(p.promedio))
            i = i + 1
        i = 0
        while (i < 100):
            p.dist = 1
            p.min = i
            p.max = i + 2 * i
            resultados = sim.simular(p)
            est = Analisis().analizar(resultados)
            if(not testAnalisisEstadistico(est)):
                errors.append("[error]: Analisis Estadistico de Distribución Uniforme con min = " +
                              str(p.min) + " y max = " + str(p.max))
            i = i + 1

        i = 0
        while (i < 100):
            p.dist = 2
            p.promedio = i
            resultados = sim.simular(p)
            est = Analisis().analizar(resultados)
            if(not testAnalisisEstadistico(est)):
                errors.append(
                    "[error]: Analisis Estadistico de Distribución Pisson con Promedio = " + str(p.promedio))
            i = i + 1
        j = j + 1


if __name__ == '__main__':
    test()
