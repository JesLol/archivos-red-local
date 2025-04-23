const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

let clipboard = ''; // portapapeles simple

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    if (url === '/') {
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log(`Cliente conectado desde ${clientIp}`);
        // Página principal
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (url === '/upload' && method === 'POST') {
        // Guardar archivo
        console.log("Alguien esta subiendo un archivo")
        const boundary = req.headers['content-type'].split('boundary=')[1];
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const matches = body.match(/filename="(.+)"/);
            if (!matches) return res.end('No file');
            const filename = matches[1];
            const fileStart = body.indexOf('\r\n\r\n') + 4;
            const fileContent = body.slice(fileStart, -(`--${boundary}--\r\n`.length));
            fs.writeFileSync(path.join('uploads', filename), fileContent, 'binary');
            res.writeHead(200);
            res.end('<html><head><script>window.location.href="/"</script></head></html>');
            console.log(`Archivo ${filename} subido`);
        });
        
    } else if (url.startsWith('/download')) {
        const filename = decodeURIComponent(url.split('?f=')[1]);
        const filePath = path.join('uploads', filename);
        console.log(`Alguien esta descargando el archivo ${filename}`);
        if (fs.existsSync(filePath)) {
            res.writeHead(200, {
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Type': 'application/octet-stream'
            });
            fs.createReadStream(filePath).pipe(res);
            console.log(`Archivo ${filename} descargado`);
        } else {
            res.writeHead(404);
            res.end('Archivo no encontrado');
            console.error(`Error al descargar el archivo ${filename}`);
        }
        
    } else if (url === '/files') {
        const directoryPath = 'uploads';
        let files = fs.readdirSync(directoryPath);
        files = files.map(filename => {
            const filePath = path.join(directoryPath, filename);
            const stats = fs.statSync(filePath);
            return {
                name: filename,
                created: stats.birthtime
            };
        });
        // Ordenar por fecha de creacion descendente
        files.sort((a, b) => b.created - a.created);
        
        const sortedFileNames = files.map(file => file.name);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(sortedFileNames));
        
    } else if (url === '/clipboard' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(clipboard);
        
    } else if (url === '/clipboard' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            clipboard = parse(body).text || '';
            res.writeHead(200);
            res.end('Texto guardado');
        });
        
    } else {
        res.writeHead(404);
        res.end('No encontrado');
    }
});

// Asegura carpeta 'uploads'
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

server.listen(80, () => { //Cambiar el 80 por 3000 (o algun otro puerto) en caso de que el puerto 80 este ocupado
    console.log('Servidor activo en http://localhost:80');
});