import mongoo from  "mongoose";
const modell= new mongoo.Schema({
   message:{
    type:String,
    
   },

   groupname:{
    type:String
   },
   

});
const cv=mongoo.model("sendgroupchats", modell);
export default  cv;