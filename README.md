# Web app de productos utilizando la API de 
# Mercado Libre 🙌

[MeLi API](https://api.mercadolibre.com/sites/MLA)

Esta aplicacion consta de tres componentes principales: la caja de busqueda, la visualizacion de resultados y la descripcion del del detalle del producto.


## Correr la aplicacion en local 🐱‍💻

Ejecuta npm install para instalar las dependencias

```bash

npm install

```
y luego 

```bash

npm run dev

```

# Descripcion de lo realizado ✌

## Problema

Para el desafio se solicito realizar los tres componentes mencionados anteriormente en donde se podria ingresar un producto a buscar, al enviar el formulario deberia navegar a los resultados de la busqueda, visualizando solo 4 productos. Luego al hacer click sobre uno de ellos deberia navegar a la vista del detalle, ademas si se ingresa dado un id de producto, deberia poder ingresar directamente a la vista de su detalle.

## Solucion 

Para el *cliente* de la aplicacion se utilizo React junto con Nextjs el cual cubre bastante bien el uso de SSR y manejo de rutas dinamicas, se hizo uso de API Context como estado global, TypeScript para validar y controlar errores dentro de los componentes de la aplicacion, para el SEO se utilizo React Helmet y por ultimo para los estilos SASS y mosule.css, de esta manera la aplicacion solo renderiza los estilos necesarios y solo los que se estan presentando en el momento.

* Cliente
  * React 💕
  * Typesctipt 🌹
  * SASS ✨
  * Context API
  * React Helmet (SEO) 😉

Para el *servidor* se utilizo API Routes que brinda una solucion elegante para la construccion de APIs, este nos permite manejar los distintos endpoints solicitados dentro de la aplicacion, ademas se utilizo *graphql* para la manipulacion de la API sirviendo de puente desde MeLi hasta nuestro servidor y por ultimo se hizo uso de SSR para cargar el contenido del sitio desde el servidor, este a su vez gracias a NextJs cuenta con un listener en cada request.

* Servidor
  * API Routes (NextJs)  🤞
  * Node 🤷‍♂️
  * Graphql + Apollo 🐱‍🚀
  * SSR 🚅
  
* Testing
  * Jest 👍
  * Enzyme 👌
  * Cypress (e2e) 👏🏼

Para el testing se utilizo Jest con Enzyme para las pruebas unitarias y Cypress para las pruebas End to End, que ademas son completamente automatizadas, para correrlas utiliza:

```bash

npm run cypress:open

```
y para las pruebas unitarias:

```bash

npm run test

```

## Deploy 😎 🚀

Puedes ver la aplicacion funcionando en produccion mediante este link: [MeliApp](https://meli-challenge.vercel.app/) .
Puedes ver ejemplo de los endpints solicitados aqui:
 * [Detalle de un producto](https://meli-challenge.vercel.app/api/items/MLA775860909)
 * [Busqueda de producto](https://meli-challenge.vercel.app/api/items?q=iphone)
 
 * Puedes incluso buscar una categoria, porque porque no? [Alguna categoria](https://meli-challenge.vercel.app/api/categories/MLA109042)
 
 
Gracias por haber llegado hasta aca 🙏🏼 Happy Coding, Happy Life!

A Great character once said:
> It's not who you are underneath, but what you do that defines you
