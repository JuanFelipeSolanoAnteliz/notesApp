const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const privateKey = fs.readFileSync('./private.key');
const certificate = fs.readFileSync('./certificate.crt');

const httpsServer = https.createServer({
    key: privateKey,
    cert: certificate
},app);

app.get('/', (req, res)=>{
    res.send('funciono pai')
})

const port = 5000; 
httpsServer.listen(port, () => {
    console.log(`Servidor HTTPS escuchando en el puerto https://localhost:${port}`);
});