const Note = require('../model/noteModel');
const note = new Note();
const User = require('../model/usersModel');
const user = new User();
const History = require('../model/historyModel');
const history = new History();

/**
 * 
 * @method findAllHistory Obtiene historial
 * @description todas las versiones de una nota especifica
 */
exports.getHistory = async(req, res)=>{
    try{
        let result = await history.getHistoryById(req.params.id);
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}

/**
 * 
 * @method findAllNotes Obtiene todas las notes
 * @description Obtiene una lista de todas las notes
 */
exports.findAllNotes = async(req, res)=>{
    try{
        // console.log('------data id---------',req.data._id,'-------data id--------');
        if (!req.data || !req.data._id) {
            return res.status(401).json({ error: 'There is no JWT. Something is wrong in the middleware' });
        }       
        let result = await note.getAllNotesByUser(req.data._id);
        if (!result) {
            return res.status(404).json({ message: 'No notes found' });
        }
        return res.status(result.status).json(result);
    }catch(error){
        // let err = JSON.parse(error.message);
        return res.send({
            message:'something is wrong with the server (allNotes controller)',
            error:error
        });
    }
}

/**
 * 
 * @method save Crear Note
 * @description Crea una nueva nota
 */
exports.save = async(req, res)=>{
    try{
        // let result = note.postNewNote(req.body, req.cokiees.id);
        let result = await note.postNewNote(req.body,req.data._id);
        
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return {
            status:res.status(err.status),
            error:err
        };
    }
}


/**
 * 
 * @method findNoteById Obtiene una note por su id
 * @description Obtiene un objeto con informacion de una nota por su id
 */
exports.findNoteById = async(req, res)=>{
    try{
        // let result = note.getOneNoteById(req.params.id, res.cookies.user)
        console.log(req.data)
        let result = await note.getOneNoteById(req.params.id, req.data._id);
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}


/**
 * 
 * @method findNotesMatchingTitleOrDescription Obtiene una note por su titulo o descripcion
 * @description Obtiene un array con todas las notes que coinciden con la busqueda del titulo o descripcion
 */
exports.searchMatch = async(req, res)=>{
    console.log('search controler')
    if (!req.query.searchTerm) {
        return res.status(400).json({ message: 'Please provide a searchTerm query parameter.' });
    }
    try{
        let result = await note.getNoteBySearch(req.query.searchTerm);
        console.log(result)
        return res.json(result);
    }catch(error){
        return {status:500, message:'server error', errror:error }
    }
}

exports.updateNote= async (req, res)=>{
    try{
        const result = await note.updateNote(req.params.id, req.data._id, req.body);
        return res.status(result.status).json(result);

    }catch(error){
        console.log(error);
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}


/**
 * 
 * @method deleteNoteById Eliminar nota
 * @description Eliminar una nota especificada por su id
 */
exports.deleteNoteById = async(req, res)=>{
    try{
        let search = await note.getOneNoteById(req.params.id, req.data._id);
        if(search.status === 404)return 'can not delete this note, it was not found';
        let result = await note.deleteNote(req.params.id, req.data._id);
        console.log(result)
        return res.status(200).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}