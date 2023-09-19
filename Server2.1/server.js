const http = require('http');
const url = require('url');

// Función que maneja las solicitudes HTTP
const requestHandler = (request, response) => {
  // Parsea la URL de la solicitud
  const parsedUrl = url.parse(request.url, true);

  // Maneja solicitudes GET
  if (request.method === 'GET') {
    if (parsedUrl.pathname === '/datos') {
      // Manejar la solicitud GET en la ruta /datos
      const queryParams = parsedUrl.query;

      // Crea la respuesta HTML
      const responseBody = `
        <html>
          <head></head>
          <body>
            <h1>Respuesta GET</h1>
            <ul>
              <li>host: ${request.headers.host}</li>
              <li>user-agent: ${request.headers['user-agent']}</li>
              <li>accept: ${request.headers.accept}</li>
              <li>accept-language: ${request.headers['accept-language']}</li>
              <li>accept-encoding: ${request.headers['accept-encoding']}</li>
              <li>dnt: ${request.headers.dnt}</li>
              <li>connection: ${request.headers.connection}</li>
              <li>cookie: ${request.headers.cookie}</li>
              <li>upgrade-insecure-request3: ${request.headers['upgrade-insecure-request3']}</li>
            </ul>
            <h2>Metodo GET</h2>
            <h2>Parametros de la URL:</h2>
            <pre>${JSON.stringify(queryParams, null, 2)}</pre>
            <p>URL: ${request.url}</p>
          </body>
        </html>`;

      // Responde con HTML
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(responseBody);
    } else if (parsedUrl.pathname === '/enviarDatosAlServidor') {
      // Manejar la solicitud GET en la ruta /enviarDatosAlServidor
      const formBody = `
        <html>
          <head></head>
          <body>
            <h1>Enviando Datos Al Servidor HTTP</h1>
            <form method="post" action="/enviarDatosAlServidor">
              <label for="server">Datos:</label>
              <input type="text" id="server" name="server" placeholder="dato1,dato2">
              <button type="submit">Enviar</button>
            </form>
          </body>
        </html>`;

      // Responde con el formulario HTML
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(formBody);
    } else {
      // Respuesta 404 si la ruta no coincide con ninguna
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Página no encontrada\n');
    }
  } else if (request.method === 'POST') {
    let body = '';

    // Maneja los datos recibidos en la solicitud POST
    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      // Parsea la cadena recibida en la solicitud POST
      const postData = body;
      const dataParts = postData.split(',');

      // Crea la respuesta HTML para la solicitud POST
      const responseBody = `
        <html>
          <head></head>
          <body>
            <h1>Respuesta POST</h1>
            <ul>
              <li>host: ${request.headers.host}</li>
              <li>user-agent: ${request.headers['user-agent']}</li>
              <li>accept: ${request.headers.accept}</li>
              <li>accept-language: ${request.headers['accept-language']}</li>
              <li>accept-encoding: ${request.headers['accept-encoding']}</li>
              <li>dnt: ${request.headers.dnt}</li>
              <li>connection: ${request.headers.connection}</li>
              <li>cookie: ${request.headers.cookie}</li>
              <li>upgrade-insecure-request3: ${request.headers['upgrade-insecure-request3']}</li>
            </ul>
            <h2>Metodo POST</h2>
            <h2>Datos recibidos en POST:</h2>
            <p>Datos enviados: ${dataParts[0]}</p>
            <p>URL: ${request.url}</p>
          </body>
        </html>`;

      // Responde con HTML
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(responseBody);
    });
  } else if (request.method === 'PUT') {
    // Maneja solicitudes PUT 
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`Respuesta PUT: ${body}\n`);
    });
  } else {
    // Respuesta 405 para métodos no permitidos
    response.writeHead(405, { 'Content-Type': 'text/plain' });
    response.end('Método no permitido\n');
  }
};

const server = http.createServer(requestHandler);

const port = 3000;

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});
