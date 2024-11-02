const session = require('express-session');
// const fs = require('fs');

// const SECRET_KEY = fs.readFileSync('./certificate.csr');

module.exports = session ({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized:true,
    cookie: { secure: true, maxAge: 18000000, sameSite: None,}
});