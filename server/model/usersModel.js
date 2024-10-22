const Connect = require("../helper/connection");

module.exports = class User extends Connect {

    user_instance;
    constructor(){
        super();
    }

    async getAllUsers(){
        await this.getConnect();
         try {
      let res = await this.cliente_instance.aggregate([{}]);
      console.log(res);
      return res;
    } catch (error) {
      return { error: error, message: `there was a problem at get the users` };
    }
    }
}

