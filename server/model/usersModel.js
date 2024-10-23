const Connect = require("../helper/connection");

module.exports = class User extends Connect {

    user_instance;
    constructor(){
        super();
    }

    async getAllUsers(){
        const connection = await this.getConnect();
         try {
          this.user_instance = connection.data   
          let res = await this.user_instance.collection('user').aggregate([]).toArray();
          console.log(res);
          return res;
        }catch (error) {
          return { error: error, message: `there was a problem at get the users` };
        }
    }
}

