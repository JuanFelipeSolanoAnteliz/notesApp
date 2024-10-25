const Note = require('../model/noteModel')
const note = new Note();

/**
 * 
 * @method findAllNotes Obtiene todas las notes
 * @description Obtiene una lista de todas las notes
 */
exports.findAllNotes = async(req, res)=>{
    try{
        let result = await note.getAllNotesByUser('6718dd9a51d1d0d3a4fa040a');
        return res.status(result.status).json(result);
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
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
        let result = await note.postNewNote(req.body,'6718dd9a51d1d0d3a4fa040a');
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
        // let result = note.getOneNoteById(req.params.id, res.cookies.user);
        let result = await note.getOneNoteById(req.params.id, '6718dd9a51d1d0d3a4fa040a');
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
exports.findNotesMatchingTitleOrDescription = async(req, res)=>{
    try{
        
    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}










/**
 * 
 * @method findNoteChangeHistory Obtiene historial de cambios de una nota
 * @description Obtiene historial de cambios de una nota
 */
exports.findNoteChangeHistory = async(req, res)=>{
    try{

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}

/**
 * 
 * @method updateNoteById Actualizar nota
 * @description Actualiza una nota especificada por su id
 */
exports.updateNoteById = async(req, res)=>{
    try{

    }catch(error){
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

    }catch(error){
        let err = JSON.parse(error.message);
        return res.status(err.status).json(err.message);
    }
}