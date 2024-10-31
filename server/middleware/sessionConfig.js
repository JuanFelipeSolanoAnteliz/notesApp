const session = require('express-session');
// const fs = require('fs');

// const SECRET_KEY = fs.readFileSync('./certificate.csr');

module.exports = session ({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:true,
    cookie: { secure: false, maxAge: 18000000}
});