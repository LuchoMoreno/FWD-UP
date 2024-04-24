# ![Universidad de palermo](https://www.palermo.edu/images/header/logo.png)


## Instalacion

Primero debemos instalar las dependencias. Por lo que abriremos una terminal y ejecutaremos el siguiente comando:

```
npm install
```

## Ejecucion

Una vez instaladas las dependencias, debemos ejecutar el siguiente comando:

```
node index.js
```

Con esto ya tendremos el proyecto corriendo.


## Consideraciones

Es necesario tener un archivo .env, el cual debe poseer las siguientes constantes:

- **DB_URI** - Direccion a donde apunta la base de datos en mongo.
- **PORT** - Puerto donde se ejecutará el servidor.
- **SECRET** - Palabra secreta para generación de token.
- **Grafana** - Interfaz de visualización de logs
- **Mongo Express** - Interfaz de administración de MongoDB


Este archivo .env fue subido dentro de la entrega principal, en blackboard.