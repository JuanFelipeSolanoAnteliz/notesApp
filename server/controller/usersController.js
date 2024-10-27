const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../model/usersModel');
const user = new User();

exports.addNewUser = async (req, res)=>{
    try{    
        req.body.password = await bcrypt.hash(req.body.password,10);
        let resultPost = await user.createUser(req.body);
        if(!resultPost.status == 201) return res.status(resultPost.status).json(resultPost);
        delete req.body.password;
        req.body._id = resultPost.data.insertedId;
        const SECRET_KEY = fs.readFileSync('./certificate.csr');
        const token = jwt.sign(req.body, SECRET_KEY.toString('utf8'),{ expiresIn : 18000000});
        req.session.auth = token;
        req.session.save((err) => {
          if (err) {
            console.error('Error al guardar la sesión:', err);
            return res.status(500).json({ message: "Error al guardar la sesión" });
          }
          return res.status(202).json({ message: "User created and logged correctly" });
        });
        // return res.status(202).json({ status: 202, message: "User created  and logged correctly"});
    }catch(error){
        console.log(error);
        return error;
    }
}

exports.login= async(req,res)=>{
    try{
        let result = await user;
        
    }catch(error){

    }
}

exports.findAllUsers = async(req, res)=>{
    try{
        let result = await user.getAllUsers();
        console.log(result)
        return res.json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}