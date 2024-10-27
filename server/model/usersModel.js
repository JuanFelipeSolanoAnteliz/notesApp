const Connect = require("../helper/connection");
module.exports = class User extends Connect {

    user_instance;
    constructor(){
        super();
    }
    async createUser(data){
      try{
        const connection = await this.getConnect();
        this.user_instance = connection.data;
        let newUser = {
          nickname:data.nickname,
          name:data.name,
          email:data.email,
          password:data.password
        }
        let res = await this.user_instance.collection('user').insertOne(newUser);
        return {
          status:201,
          message:'user created succsessfully',
          data:res
        };
      }catch(error){
        return { status:500, error: error, message: `there was a problem at create this user` };
        
      }
    }
    async getUserBynickname(nickname){
      try{
        const connection = await this.getConnect();
        this.user_instance = connection.data;
        const res = await this.user_instance.collection('user').aggregate([{$match:{nickname:nickname}}]).toArray()
        if(!res[0]){
          return{
            status:404,
            message:'user not found'
          }
        }else{
          return {
            status:200,
            message:'user fetched succsessfuly',
            data:res[0]
          }
        }
      }catch(error){
        return {
          status:500,
          message:'there is an server error',
          data:error
        }
      }
    }
    async getAllUsers(){
      try {
          const connection = await this.getConnect();
          this.user_instance = connection.data;   
          let res = await this.user_instance.collection('user').aggregate([]).toArray();
          console.log(res);
          return {
            status:200,
            message:'user created succsessfully',
            data:res
          };
        }catch (error) {
          return { status:500, error: error, message: `there was a problem at get the users` };
        }
    }
    async findExistUser(data){
     try{

     }catch(error){

     } 
    }

    async findExistEmail(data){
      try{
 
      }catch(error){
 
      } 
     }
}

