const User = require('../model/usersModel');
const user = new User();

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