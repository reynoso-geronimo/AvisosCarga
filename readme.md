# Sistema de Seguimiento y Generación de Avisos de Carga

Este proyecto es un sistema de seguimiento y generación de avisos de carga diseñado para una empresa de comercio exterior. Permite a los usuarios gestionar despachos aduaneros y generar avisos de carga relacionados con ellos. La aplicación está construida utilizando JavaScript, Node.js, Express, EJS, Sequelize y MySQL.

## Características Principales

- **CRUD de Despachos Aduaneros:** Los usuarios pueden crear, editar y eliminar entradas de despachos aduaneros, así como realizar un seguimiento de su estado.

- **Generación de Avisos de Carga:** La aplicación brinda la informacion para los avisos de carga asociados a los despachos aduaneros, lo que facilita la gestión de la logística.

- **API REST:** La aplicación incluye dos endpoints importantes para la integración con otros sistemas, como Power Automate Desktop:
  - **Endpoint 1:** Proporciona información necesaria para generar el próximo aviso de carga en la cola.
  - **Endpoint 2:** Permite guardar el resultado del aviso de carga, indicando si se generó correctamente o si se produjo un error, además de almacenar información sobre el próximo aviso.

## Tecnologías Utilizadas

- JavaScript
- Node.js
- Express
- EJS (Embedded JavaScript)
- Sequelize (ORM para bases de datos)
- MySQL

## Empezando

### Prerrequisitos

Asegúrate de tener instalados los siguientes componentes en tu entorno de desarrollo:

- Node.js: [Descargar e Instalar Node.js](https://nodejs.org/)
- MySQL: [Descargar e Instalar MySQL](https://www.mysql.com/)

### Configuración de la Base de Datos

Para configurar la base de datos, sigue estos pasos:

. Ejecuta el script SQL `avisos.sql` para crear la base de datos y la tabla necesaria

. Actualiza la configuración de la base de datos en el archivo config/database.js para que coincida con tu entorno.

## Variables de Entorno
Asegúrate de configurar las variables de entorno necesarias para la aplicación. Debes crear un archivo .env en el directorio raíz del proyecto y configurar las siguientes variables:

DB_NAME 
DB_USER 
DB_PASS 
DB_PORT
DB_HOST 
PORT

##

Instalación

. Clona el respositorio

```git clone https://github.com/reynoso-geronimo/AvisosCarga.git```

. Instala las dependencias

```npm install```

. Inicia la aplicación:

```npm start```