
# Documentacion del proyecto 

Este es un proyecto front-end y back-end que sirve para compartir el portapapeles y archivos entre cualquier dispositivo con navegador de una manera sencilla sin necesidad de tener internet (Siempre y cuando esten en la misma red). Este pequeño y rapido proyecto surgio de la necesidad de compartir texto y archivos de una manera rapida y agil ya que en ese momento no contaba con internet disponible.
PD: Sin acentos porque tengo teclado en ingles xd

## **Nota importante de seguridad**

El proyecto no cuenta con autenticaciones o estandares de seguridad avanzados debido a su naturaleza, por lo que no es recomendable usarlo en internet, ya que cualquiera podria acceder a tus archivos. 😄

## Instalacion de dependencias

No se necesita de instalar ninguna dependencia, ya que como dije antes, no contaba con internet cuando hice el proyecto por lo que todo el codigo es Node, Html y JS puro

## Lanzar servidor

Para lanzar el servidor puedes hacer el comando

```bash
npm run index
```

Tambien lo puedes lanzar con

```bash
node index.js
```

## Requisitos

   -[Node.js](https://nodejs.org/es/download) Instalado.
   -Los dispositivos deben estar conectados a la misma red (con o sin internet).

## Caracteristicas

- **Subida de archivos** mediante un formulario cons html y js, subiendose al servidor.
- **Descarga de archivos** almacenados en la carpeta uploads alojada en el servidor.
- **Lista de archivos** ordenada del mas reciente al mas antiguo (ordenado desde el backend).
- **Portapapeles compartido** al cual pueden acceder todos los dispositivos de la red local.
- **Interfaz web** sencilla pero funcional y compatible con todos los dispositivos.
- **Logs de acciones** relevantes en consola (subidas, descargas e IPs de los dispositivos conectados).

## Instalacion y uso

1. Clona el repositorio

```bash
   git clone https://github.com/jeslol/archivos-red-local.git
   cd archivos-red-local
```

2. **Inicia el servidor**

```bash
   npm run index
```

3. **Abre el navegador y accede a la ip del host**
   Ejemplo

```bash
   http://192.168.1.65
```

   Si no sabes cual es tu ip puedes los siguientes comandos

   - Para windows

      ```bash
         ipconfig
      ```
   - Para linux
      ```bash
         ip a
      ```
   - Para macOS
      ```bash
         ifconfig
      ```



## Autor y Licencia

Este proyecto fue hecho por Jesus Cuapio Mendoza
[https://cuapiom.com](https://cuapiom.com)

Licencia MIT