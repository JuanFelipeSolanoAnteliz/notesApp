const jwt = require('jsonwebtoken');
// const fs = require('fs');

exports.auth = async(req, res, next)=>{
    try{

        console.log('Token en sesión:', req.session.auth,'---------------');
        // const SECRET_KEY =  fs.readFileSync('./certificate.csr');
        var payload = jwt.verify(req.session.auth, process.env.SECRET_KEY);
        req.data = payload;
        console.log(payload,'este es el payload')
        next(); 
    }catch(error){
        console.log({status: 401, message: 'No token provided', data: error.message})
        res.redirect('/users');
        return
        
    }
}