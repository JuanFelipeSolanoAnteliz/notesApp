const express = require('express');
const { join } = require('path')
const https = require('https');
const fs = require('fs');

const app = express();

const privateKey = fs.readFileSync('./private.key');
const certificate = fs.readFileSync('./certificate.crt');
const userRouter = require('./server/router/usersRouter'); 
const noteRouter = require('./server/router/notesRouter');
const session = require('./server/middleware/sessionConfig');

app.use(express.json());
app.use(session);

app.use('/notes', (req, res, next)=>{
    req.__dirname = __dirname;
    next();
},noteRouter)

app.use('/users', (req, res, next)=>{
    req.__dirname = __dirname;
    next(); 
},userRouter);

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

console.log(new Date())