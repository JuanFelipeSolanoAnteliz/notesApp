const { ObjectId } = require('mongodb');
const connect = require('../helper/connection');
module.exports = class Notes extends connect{
    notes_instance;
    constructor(){
        super();
    }

    async getAllNotesByUser(id){
        try{
            const connection = await this.getConnect();
            this.notes_instance = connection.data;
            let res = await this.notes_instance.collection('note').aggregate([{$match:{user: new ObjectId(id)}}]).toArray();
            if(!res[0]){
                return{
                    status:404,
                    message:'the are not notes for this user',
                    data:res
                }
            }else{
                return{
                    status:200,
                    message:'notes fetched succsessfully',
                    data:res
                }
            }
        }catch(error){
            return{
                status:500,
                message:'something wnet wrong, server error',
                data:error
            }
        }
    };

    async postNewNote(userId){
        const connection = await this.getConnect();
        this.notes_instance = connection.data;
        let res = await this.notes_instance.collection('note').insertOne({})
    }

}