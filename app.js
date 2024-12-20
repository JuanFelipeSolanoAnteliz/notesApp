const express = require('express');
const { join } = require('path')
// const https = require('https');
// const fs = require('fs');
const session = require('./server/middleware/sessionConfig');
const { auth } = require('./server/middleware/decodedJWT');
const cors = require('cors');
const app = express();


const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};


app.use(cors(corsOptions));
app.use(session);
app.use(express.json());


// const privateKey = process.env.SECRET_KEY; 
// const certificate = fs.readFileSync('./certificate.crt');
const userRouter = require('./server/router/usersRouter'); 
const noteRouter = require('./server/router/notesRouter');


// app.use('/css', express.static(join(__dirname, 'src/css')))
// app.use('/js', express.static(join(__dirname, 'src/js')))
// app.use('/storage', express.static(join(__dirname, 'src/storage')))

app.use('/notes', (req, res, next)=>{
    req.__dirname = __dirname;
    next();
},noteRouter)

app.use('/users', (req, res, next)=>{
    req.__dirname = __dirname;
    next(); 
},userRouter);

app.use('/', (req, res, next)=>{
    req.__dirname = __dirname;
    next(); 
},noteRouter);

// const httpsServer = https.createServer({
//     key: privateKey,
//     cert: certificate
// },app);

const config = {
    port:process.env.EXPRESS_PORT,
    host:process.env.EXPRESS_HOST_NAME
}

app.listen(config,()=>{
    console.log(`server running at http://${config.host}:${config.port}`);
})

// const port = 5000; 
// httpsServer.listen(port, () => {
//     console.log(`Servidor HTTPS escuchando en el puerto https://localhost:${port}/users`);
// });

setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(`Uso de Memoria - Heap: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`);
}, 60000);  // Cada minuto
