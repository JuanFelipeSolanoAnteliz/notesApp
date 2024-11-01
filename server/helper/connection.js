const { MongoClient } = require('mongodb');

module.exports= class  Connect{
    constructor(){
        this.url = process.env.MONGO_URI;
        this.dbName= process.env.MONGO_DB;
    }
    async getConnect(){
        try{
            const client = await MongoClient.connect(`mongodb://mongo:jmALqsSRgpmIrYuieEPDAvvCLZySsCSV@junction.proxy.rlwy.net:10635`);
            const db = client.db(this.dbName);
            return {
                status: 200, 
                message: "Connection established",
                data:db
            };
        }catch(error){
            console.log(error)
            throw new Error(JSON.stringify({ status: 500, message: "Connection error", data:error }));
        }
    }
}