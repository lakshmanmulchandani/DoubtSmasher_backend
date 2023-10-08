import mongoose from 'mongoose';
import Chatroom from '../models/chatroom.js'
import User from '../models/auth.js'
import Topic from '../models/topic.js';

// TODO: create chatroom



const createChatRoom = async(req,res) =>{
    const data = req.body;
    const userid = req.userId;
    console.log(data, userid)
    if(!data || !data.name || !data.topics){
        return res.status(400).json({
            message: "Missing Fields"
        })
    }
    const topicIds = []
    // checking if topics exist
    for(let i = 0 ; i < data.topics.length; i++){
        const topic = data.topics[i]
        const existingTopic = await Topic.findOne({name:topic})
        if(!existingTopic){
            console.log('creating new topic',topic)
            const newtopic = new Topic({name:topic});
            await newtopic.save();
            topicIds.push(newtopic.id);
            console.log("done")
        }
        else{
            console.log("old topic",topic)
            topicIds.push(existingTopic.id);
        }
    }

    console.log(topicIds)

    const chatroom = new Chatroom({
        name:data.name,
        topics:topicIds,
        users:[userid],
        owner:userid
    })

    // try{
        await chatroom.save();
        console.log("chatroom saved")
        console.log(chatroom) 
        
        await User.updateOne({_id:userid},{
            $push:{
                chatrooms: chatroom._id
            }
        })
    // }catch(err){
    //     return res.status(500).json({
    //         message:"Something went wrong"
    //     })
    // }

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
    const chatrooms = (await User.findOne(userid).populate('chatrooms')).chatrooms;

    return res.status(200).json({
        message: "Success",
        chatrooms:chatrooms
    })
}



export {getChatrooms,createChatRoom,joinChatRoom};