const connect = require('../helper/connection');
const {ObjectId} = require('mongodb') 
module.exports = class History extends connect{
    history_instance;
    constructor(){
        super();
    };
    async getHistoryById(id){
        try{
            const connection = await this.getConnect();
            this.notes_instance = connection.data;
            let res = await this.notes_instance.collection('history').aggregate([{$match:{note: new ObjectId(id)}}]).toArray();
            if(!res[0])return{ status:404, message:'there is no history to this note'};
            return{
                status:200,
                message:'history fetched correctly',
                data: res
            }
        }catch(error){
            console.log(error)
            return{
                status:500,
                message:'something went wrong, there is a server error',
                error:error
            }
        }
        
    }
}