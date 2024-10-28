const History = require('../model/historyModel');
const history = new history();


/**
 * 
 * @method findAllHistory Obtiene historial
 * @description todas las versiones de una nota especifica
 */
exports.getHistory = async(req, res)=>{
    try{
        let result = await history.getAllNotesByUser(req.params.id);
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}

