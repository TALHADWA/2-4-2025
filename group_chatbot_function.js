import dac from "./group_chatbot_schema.js";
import xs from "./goupchatsendmessage/groupchatsendmessageschema.js";

const dataa=async function fcv(req,res){
    const data=await xs.find({groupname:req.body.groupname});
const dx=new dac({
    groupname:req.body.groupname,
    groupmembers:req.body.groupmembers,
    chats:data
});
const bn=await dx.save();
res.send(bn);
}
export default dataa;