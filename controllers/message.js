import Message from "../models/message.js";
import User from "../models/auth.js";
import ChatRoom from "../models/chatroom.js";


// TODO: send message

const sendMessage = async (req,res) =>{
    const data = req.body;
    const userid = req.userId;

    if(!data || !data.chatroomid || !data.content) return res.status(400).json({
        message:"Incomplete fields"
    })

    const message = new Message({
        content: data.content,
        sender: userid,
        chatroomid: data.chatroomid
    })
    
    try{
        await message.save();
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong"
        })
    }

    return res.status(200).json({
        message: "Success",
        message
    })

}

// TODO: get previous messages for chatroom 

const getPreviousMessages = async (req,res) =>{
    const chatroomid = req.params.chatroomid

    if(!chatroomid) {
        return res.status(400).json({
            message:"Bad Request"
        })
    }

    const messages = await Message.find({
        chatroom:chatroomid
    }).populate(['sender'])

    return res.status(200).json({
        message:"success",
        messages: messages
    })
}



// TODO: unsend a message



export {sendMessage,getPreviousMessages};