# Colmena LAb

## Descripción

Prueba tecnica

## Comenzando con Docker

Para simplificar el proceso de instalación y asegurar un entorno de desarrollo consistente, este proyecto se puede iniciar utilizando Docker.

### Prerrequisitos

- Docker: Asegúrate de tener Docker instalado en tu sistema. Si no lo tienes, puedes descargarlo e instalarlo desde [aquí](https://www.docker.com/get-started).

### Iniciar el Proyecto

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. Construye y ejecuta los contenedores con Docker Compose:

    ```bash
    docker-compose up --build
    ```

    Este comando construirá las imágenes necesarias y ejecutará los contenedores definidos en tu `docker-compose.yml`, incluyendo la aplicación y la base de datos.

3. Una vez que los contenedores estén en ejecución, tu aplicación debería estar accesible en `http://localhost:3000` o en otro puerto especificado en tu archivo `docker-compose.yml`.

## Uso de Postman para probar la API

Para probar la API, puedes importar la colección de Postman proporcionada con este proyecto.

1. Abre Postman y selecciona "Importar".

2. Elige el archivo de la colección Postman (usualmente un archivo `.json`) incluido en este repositorio. Si no se incluye un archivo, puedes crear tus propias solicitudes en Postman basándote en la documentación de la API proporcionada en este README o en otro lugar.

3. Una vez importada, selecciona una solicitud para probar diferentes endpoints de la API. Asegúrate de actualizar los parámetros de la solicitud, como tokens de autenticación o IDs de recursos, según sea necesario.

## Construido con

- [NestJS](https://nestjs.com/) - El framework web usado
- [TypeORM](https://typeorm.io/) - ORM utilizado
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
