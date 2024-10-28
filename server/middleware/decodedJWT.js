const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.auth = async(req, res, next)=>{
    try{
        console.log('Token en sesión:', req.session.auth,'---------------');
        const SECRET_KEY =  fs.readFileSync('./certificate.csr');
        var payload = jwt.verify(req.session.auth, SECRET_KEY.toString('utf8'));
        req.data = payload;
        next();
    }catch(error){
        console.log({status: 401, message: 'No token provided', data: error.message})
        res.redirect('/users');
        return
        
    }
}