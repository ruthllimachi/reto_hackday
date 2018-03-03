# reto_hackday
Reto hackday
=============
Creación de horarios

Base de Datos 
=============
La base de datos utilizado es PostgreSQL 
Con cuatro tablas:
- aula
- docente
- materia
- horario
Existe entidad relacion entre docente - materia de 1-n
Exite entidad relacion entre aula - horario de n - 1 y matria - horario de n - 1
Los datos para la base se encuentra en db.js en la carpeta backend en creacion_horarios

BackEnd
=============
Para backend se utlizo NodeJS, ExpressJS y sequelize.
Con control de dependencias npm
Todo en la carpeta backend

FronEnd
=============
Para frontend se utlizo angularJs, bootstrap y sass
Con control de dependencias bower
Todo en la carpeta frontEnd 

Instalación
=============
- Para la instalacion se requiere ejecutar npm install para procesar el package.json que se encuentra en creacion_horarios
y para el frontend se requiere ejecuta bower install  que se encuentra en la carpeta fronend de creacion_horarios




