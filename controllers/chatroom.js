import mongoose from 'mongoose';
import Chatroom from '../models/chatroom'
import User from '../models/auth'

// TODO: create chatroom



const createChatRoom = async(req,res) =>{
    const data = req.body;
    const userid = req.userId;
    if(!data || !data.name || !data.topics){
        return res.status(400).json({
            message: "Missing Fields"
        })
    }

    const chatroom = new Chatroom({
        name:data.name,
        topics:data.topics,
        users:[userid],
    })

    try{
        await chatroom.save();
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong"
        })
    }

    return res.status(200).json({
        message: "Success",
        chatroom
    })
}

// TODO: Join user


const joinChatRoom = async(req,res) =>{
    const userid = req.userId;
    const data = req.body;
    if(!data || !data.chatroomid){
        return res.status(400).json({
            message: "Missing Fields"
        })
    }
    try{
        await Chatroom.updateOne(data.chatroomid, {
            $push: {
                users: userid
            }
        })
        await User.updateOne(userid,{
            $push:{
                chatrooms: chatroomid
            }
        })
    }catch(err){
        return res.status(500).json({
            message:"Something went wrong"
        })
    }

    return res.status(200).json({
        message: "Success"
    })
}

// TODO: Exit User


// TODO: Get Chatrooms for user


const getChatrooms = async(req,res) =>{
    const userid = req.userId;
    const chatrooms = await  User.findOne(userid).chatrooms;

    return res.status(200).json({
        message: "Success",
        chatrooms
    })
}



export {getChatrooms,createChatRoom,joinChatRoom};