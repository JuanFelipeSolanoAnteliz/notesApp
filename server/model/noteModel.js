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

    async postNewNote(data,userId){
        try{
            console.log(data)
            console.log(userId)
            const connection = await this.getConnect();
            // console.log(connection.data.collection('note'))
            let newNote = {
                title:data.title,
                content:data.body,
                date:new Date(),
                history:[],
                user:new ObjectId(userId)
            }
            this.notes_instance = connection.data;
            let res = await this.notes_instance.collection('note').insertOne(newNote);
            return{
                    status:201,
                    message:'note saved succsessfully',
                    data:res
                };
            
        }catch(error){
            return {
                status:500,
                message:'something went wrong, check the note you want to insert',
            };
        }
    }

    async getOneNoteById(idNote, idUser){
        try{ 
            const connection = await this.getConnect();
            this.notes_instance = connection.data;
            let res = await this.notes_instance.collection('note').aggregate([{$match:{_id:new ObjectId(idNote), user: new ObjectId(idUser)}}]).toArray()
            if(!res[0]){
                return{
                    status:404,
                    message:'this note does not exist',
                    data:res
                }
            }else{
                return{
                    status:200,
                    message:'note fetched succsessfully',
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
    }

    async updateNote(noteId,idUser,data){
        try{
          const connection = await this.getConnect();
          this.notes_instance = connection.data;
          console.log(noteId,'-------------',idUser,'-----------------------')
          let findNote = await this.notes_instance.collection('note').aggregate([{$match:{_id:new ObjectId(noteId),user:new ObjectId(idUser)}}]).toArray()
          if(findNote[0]){
            let save = findNote[0];
            console.log(save)
            let backupHistory={
                    user: new ObjectId(idUser),
                    title: data.title || save.title,
                    body:  data.body || save.body,
                    date: new Date(),
                    note: new ObjectId(noteId)
                  
            }
            if(!data)return{ status:400, message:'bad request, you have to enter a body in the query'};
            let history = await this.notes_instance.collection('history').insertOne(backupHistory);
            let addHistory = await this.notes_instance.collection('note').updateOne(
                {_id: new ObjectId(noteId)}, {$push: {history: new ObjectId(history.isertedId)}}
            );
            let res = await this.notes_instance.collection('note').updateOne({_id: new ObjectId(noteId)},{$set:data});
            
            return {
                status:214,
                message:'note updated successfully',
                data:res
            }
          }else{
            return{
                status: 404,
                message:'note not found'
            }
          }

        }catch(error){
            console.log(error);
            return {
                status:500,
                message:'something went wrong, there is a server error',
                data:error
            }
        }  
      };

      async deleteNote(noteId, userId){
        try{
            const connection = await this.getConnect();
            this.notes_instance = connection.data;
            let res = await this.notes_instance.collection('note').deleteOne({_id: new ObjectId(noteId), user: new ObjectId(userId)});
            return {
                status: 200,
                message:'note deleted succsessfully',
                data: res
            };

        }catch(error){
            return {
                status:500,
                message:'server error',
                error: error
            };
        };
      }
}