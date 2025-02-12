import sendmessage from "./groupchatsendmessageschema.js";

async function sendmessages(req,res){
const data=new sendmessage({
message:req.body.message,
groupname:req.body.groupname,
});
const cv=await data.save();
res.send(cv);
}
export default  sendmessages;