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

### Microservicio de Pacientes

Este microservicio gestiona toda la información relacionada con los pacientes.

- **Crear un Paciente**

  - Método: `POST`
  - URL: `http://localhost:3000/pacientes`
  - Body (JSON):
    ```json
    {
  	"patientId": "12347",
  	"firstName": "John",
  	"lastName": "Doe",
  	"email": "john.doeexample.com",
  	"phone": "1234567890",
  	"address": "123 Main St",
  	"city": "Anytown",
  	"professionalCard": "PRO1234568",
  	"admissionDate": "2022-01-01"
}
    ```

- **Obtener todos los Pacientes**

  - Método: `GET`
  - URL: `http://localhost:3000/pacientes`

- **Actualizar un Paciente**

  - Método: `PUT`
  - URL: `http://localhost:3000/pacientes/{id}`
  - Body (JSON):
    ```json
    {

  	"patientId": "12347",
  	"firstName": "John",
  	"lastName": "Doe",
  	"email": "john.doeexample.com",
  	"phone": "1234567890",
  	"address": "123 Main St",
  	"city": "Anytown",
  	"professionalCard": "PRO1234568",
  	"admissionDate": "2022-01-01"
}
    ```

- **Eliminar un Paciente**

  - Método: `DELETE`
  - URL: `http://localhost:3000/pacientes/{id}`

### Microservicio de Médicos

Este microservicio se encarga de gestionar los médicos.

- **Crear un Médico**

  - Método: `POST`
  - URL: `http://localhost:3000/medicos`
  - Body (JSON):
    ```json
    {
  	"firstName": "John",
  	"lastName": "Doe",
  	"email": "john.doeexample.com",
  	"phone": "1234567890",
  	"address": "123 Main St",
  	"city": "Anytown",
  	"professionalCard": "PRO1234568",
  	"admissionDate": "2022-01-01"
}
    ```

- **Obtener todos los Médicos**

  - Método: `GET`
  - URL: `http://localhost:3000/medicos`

- **Actualizar un Médico**

  - Método: `PUT`
  - URL: `http://localhost:3000/medicos/{id}`
  - Body (JSON):
    ```json
    {
  	"firstName": "John",
  	"lastName": "Doe",
  	"email": "john.doeexample.com",
  	"phone": "1234567890",
  	"address": "123 Main St",
  	"city": "Anytown",
  	"professionalCard": "PRO1234568",
  	"admissionDate": "2022-01-01"
}
    ```

- **Eliminar un Médico**

  - Método: `DELETE`
  - URL: `http://localhost:3000/medicos/{id}`

## Uso de los Microservicios

Este proyecto consta de varios microservicios, cada uno responsable de diferentes aspectos de la aplicación. A continuación, se proporcionan detalles sobre cómo interactuar con cada microservicio utilizando Postman.

### Microservicio de Medicamentos

Este microservicio gestiona todo lo relacionado con los medicamentos.

- **Crear un Medicamento**

  - Método: `POST`
  - URL: `http://localhost:3000/medicamentos`
  - Body (JSON):
    ```json
    {
      "nombre": "Ibuprofeno",
      "descripcion": "Antiinflamatorio no esteroideo",
      "enfermedades": "Dolor, fiebre, inflamación"
    }
    ```

- **Obtener todos los Medicamentos**

  - Método: `GET`
  - URL: `http://localhost:3000/medicamentos`

- **Actualizar un Medicamento**

  - Método: `PUT`
  - URL: `http://localhost:3000/medicamentos/{id}`
  - Body (JSON):
    ```json
    {
      "nombre": "Ibuprofeno Modificado",
      "descripcion": "Antiinflamatorio modificado",
      "enfermedades": "Dolor de cabeza"
    }
    ```

- **Eliminar un Medicamento**

  - Método: `DELETE`
  - URL: `http://localhost:3000/medicamentos/{id}`

### Microservicio de Órdenes Médicas

Este microservicio se encarga de la gestión de las órdenes médicas.

- **Crear una Orden Médica**

  - Método: `POST`
  - URL: `http://localhost:3000/ordenes-medicas`
  - Body (JSON):
    ```json
    {
      "citaMedicaId": 1,
      "descripcion": "Tomar medicamento cada 8 horas",
      "fechaCaducidad": "2024-12-31",
      "especialidad": "General",
      "medicamentoIds": [1, 2]
    }
    ```

- **Obtener todas las Órdenes Médicas**

  - Método: `GET`
  - URL: `http://localhost:3000/ordenes-medicas`

- **Actualizar una Orden Médica**

  - Método: `PUT`
  - URL: `http://localhost:3000/ordenes-medicas/{id}`
  - Body (JSON):
    ```json
    {
      "descripcion": "Cambiar medicamento a cada 12 horas",
      "medicamentoIds": [3]
    }
    ```

- **Eliminar una Orden Médica**

  - Método: `DELETE`
  - URL: `http://localhost:3000/ordenes-medicas/{id}`

...

### Notas Adicionales

- Asegúrate de reemplazar `{id}` en las URLs con el ID real del recurso que deseas actualizar o eliminar.
- Si tu API requiere autenticación, incluye el token de autenticación en el header `Authorization` de tus solicitudes en Postman.
- Adapta los puertos y las rutas según la configuración específica de tu proyecto.