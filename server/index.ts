  
import express from 'express';
const next = require('next');
const { getItems, getItem, getDescription } = require('./controllers/itemsController') 

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express()

  // Obtengo los productos 
  server.get("/api/items", getItems);
  // obtengo el detalle del producto
  server.get("/api/items/:id", getItem);
  // obtengo la descripcion del producto
  server.get("/api/items/:id/description", getDescription);

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})