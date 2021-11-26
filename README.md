# Muncher Test

_Muncher API - Backend application_

## Comenzando 🚀

_En este proyecto tenemos una aplicacion Node, que despliega una API REST, con arquitectura serverless y acceso a una base de datos no relacional, todo esto nos garaniza escalabilidad, performance y demas atributos de calidad de software (dependiendo el caso)._


### Pre-requisitos 📋

- _Se debe crear un archivo .env en la raiz del proyecto, con la variable de entorno para la dase de datos MongoDB_

	```
	DATABASE_URL = "mongodb+srv://muncher:muncher@cluster0.tlsmp.mongodb.net/MuncherDB?retryWrites=true&w=majority"
	```
- _Se debe poblar la base de datos con el script de instalacion (**bash start.sh**) descito mas abajo en **Instalación** o con el comando para ejecutar el seed:_ 
	```
	yarn db:seed
	```
	_Para esto, la DB debe estar completamente vacia, debido a que hay unos datos de prueba que tienen IDs unicos que no pueden sobreescribirse, (la base de datos de prueba que deje en la conexión, se encuentra previamente vacia para su uso)_


### Instalación 🔧

_Para la instalacion y ejecucion del proyecto localmente se tiene un script *start.sh* que tiene los comandos necesarios para realizar esta accion_

_Se ejecuta de la siguiente manera_

```
bash start.sh
```

_si se desea hacer una instalaccion y ejecucion paso a paso, se deben realizar los siguientes comandos_

```
yarn (Instalación de paquetes)
```
```
yarn schema:generate (Generación del esquema inicial para Prisma)
```
```
yarn db:seed (Poblamiento de la base de datos con datos de prueba)
```
```
yarn start (Ejecucion de la aplicación)
```
## Para probar la apliación 🧪

_En la herramienta **Postman**, se debe importar la colección que se encuentra en este repositotorio en el archivo **Muncher Test.postman_collection.json**, se importa de la siguiente manera_

```
https://kb.datamotion.com/?ht_kb=postman-instructions-for-exporting-and-importing
```

_Luego de esto, en la colección encontrara los ejemplos de los endpoints descritos en la seccion **Endpoints** de mas abajo_
## Estructura y buenas practicas 📖

Teniendo en cuenta el principio de responsabilidad unica y los demas principios de SOLID se queria crear una aplicación con código limpio y flexible ante los cambios, que sea reutilizable y mantenible, y sobre todo escalable para lo cual se usaron diferentes practicas para lograr este objetivo:

- Error Handling
- Scafolding MCS (Model-Service-Controller)
- Documentacion con estandar OpenAPI
- Modelos a partir de JSON Schema para validaciones y tipado de datos
- Path Aliases para mantenibilidad (Ej: @controllers/..) 

	#### - Manejo de errores ⚙️

	_Se utilizo un middleware que atrapa los errores arrojados en los handlers y les da un manejo personalizado a partir de un Custom Error Type que se encuentra en:_  **src/utils/errors.ts**


### Testing🔩

_Aun que me hubiera gustado realizar pruebas e2e con frameworks de automation como [Cypress](https://www.cypress.io/) o [TestCafe](https://testcafe.io/), realice unas pruebas de integracion y end to end en Postman que tambien pueden ser ejecutadas con [Newman](https://www.npmjs.com/package/newman) para manejo programatico y por CLI de estas._

## Construido con 🛠️

_Estas fueron las herramientas usadas para este proyecto_

* [Serverless](https://www.serverless.com/) - Framewor usado para crear aplicaciones distribuidas en AWS Lambda descentralizada de un servidor
* [serverless-ofline](https://www.npmjs.com/package/serverless-offline) - Plugin de serverless para ejecucion y simulacion de AWS Lambda y API Gateway en entornos locales
* [Prisma](https://www.prisma.io/) - ORM (Object Resource Manager) para typescript y conexion con MongoDB
* [serverless-openapi-documentation](https://www.serverless.com/plugins/serverless-openapi-documentation) - Plugin para generar documentación de OpenAPI 3.0.0 a partir de archivos de configuración serverless
* [Middy](https://github.com/middyjs/middy) - Libreria para manejo de Middlewares para NodeJS
* [Typescript](https://www.typescriptlang.org/) - Lenguaje fuertemente tipado

_Agradecimiento especial para ESLint (Airbnb) y Prettier_


## Endpoints 🛠️

_Estos son los endpoints a los que se puede acceder_


- Creacion de Usuarios
	```
	POST /dev/users
	```
- Creación de ordenes
	```
	POST /dev/orders
	```
- Descontar o hacer efectiva una orden
	```
	PUT /dev/wallet/charge_order
	```
- Recargar dinero en el disponible de un usuario
	```
	PUT /dev/wallet/recharge
	```
- Transferir dinero de un usuario a otro
	```
	POST /dev/wallet/transfer-money
	```


### Qué me hubiera gustado hacer? ⌨️

_Debido al tiempo, hay cosas que aún se pueden agregar a esta prueba, y que en primer acercamiento se me ocurren ideas como lo son:_

- **Unit tests con Jest** , dado que las pruebas unitarias son fundamentales para asegurar la calidad del desarrollo de software e incluso se debe pensar en estrategias como TDD dependiendo del caso, y se deben implementar con prioridad _(Debido al tiempo para la prueba se omiten)_
- Seguridad con bearer tokens o **oauth2**, y manejados a partir de un Middleware
- Config files encriptados con **bcrypt**
- Usar **date-fns** para manejo de fechas
- Dependiendo de la necesidad, desacomplar los modelos a travez del patron **Pub-Sub**
- Mejor implementación de las transacciones ( tal vez con inyección de dependencias)
- Manejo de auditorias con movimientos y logs
- Muchas mas...

	


## Autor ✒️

* **Javier Vasquez** - *Autor de la prueba* 



---
⌨️ con ❤️ por Javier Vasquez 😊