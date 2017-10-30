# Project Title / Título de Proyecto

Proyecto de Simulación de sistemas / Simulation System project

## Getting Started / Empezando 

Simulación de un sistema discreto de 1 - cola - 1 servidor.
Desarrollado en Python para el Backend empleando el Framework Flask, y Angular 4 para el Frontend.

Simulation of a discrete system of 1 - queue - 1 server.
Developed in Python for the Backend using the Flask Framework, and Angular 4 for the Frontend.

## ScreenShots / Capturas
![Image](https://github.com/miguel3010/proyectoSimulacion/blob/master/Screenshot-2017-10-28%20Presentaci%C3%B3n.png)

![Image](https://github.com/miguel3010/proyectoSimulacion/blob/master/Screenshot-2017-10-28%20Simulaci%C3%B3n.png)

![Image](https://github.com/miguel3010/proyectoSimulacion/blob/master/Screenshot-2017-10-28%20Simulaci%C3%B3n2.png)

![Image](https://github.com/miguel3010/proyectoSimulacion/blob/master/Screenshot-2017-10-28%20Estad%C3%ADsticas.png)

### Prerequisites / Prerequisitos

Todo lo que necesitas instalar para la configuración del proyecto.

What things you need to install for the project setup.

-Servidor NodeJS (Angular) / NodeJS Server (Angular):

```
npm install -g @angular/cli
```
- Ng2-chart (libreria de javascript para gráficas) / Ng2-chart (javascript library for charts):
```
npm install ng2-charts --save
```
-Paquetes de python / python packages:

```
pip install numpy
```

```
pip install Flask
```
(Solo para ambiente de desarrollo / only for dev mode)
```
pip install -U flask-cors
```

### Inicio / Run
Abra la terminal en la ruta del repositorio / Open a terminar in the repository url:
-Servidor Python
```
cd backend
python app.py
```

-Servidor NodeJS (Angular) (solo para ambiente de desarrollo / only dev mode)
```
cd frontend 
ng serve –open
``` 
## Angular deploy
```
cd frontend 
ng build --prod
``` 
Copiar el contenido de la carpeta /frontend/dist en /backend/static
Agregar en el index.html a todas las rutas locales static/<prev_url>

Copy the content of /frontend/dist to /backend/static
Add to all local url in index.html the prefix static/<prev_url>

## Software usado / Built With
* [Python](https://www.python.org/) - Backend
* [Flask](http://flask.pocoo.org/) - REST Framework
* [Flask-cors](http://flask-cors.readthedocs.io/en/latest/) - CORS REST Framework
* [Angular](https://angular.io/) - Frontend JS Framework
* [Bootstrap 4](https://v4-alpha.getbootstrap.com/) - CSS Framework
* [ng2-chart](https://github.com/valor-software/ng2-charts) - Charts Library

## Autores / Authors

* **Miguel Ángel Campos** - *Fullstack Developer* - [Twitter](https://twitter.com/Miguel_Angel_30)
* **Luis Yao** - *Fullstack Developer* - [Twitter](https://twitter.com/notLwiz)

## Agradecimientos / Acknowledgments

* PhD Modaldo Tuñón -Professor-
