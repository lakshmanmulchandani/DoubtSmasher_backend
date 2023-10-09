import mongoose from 'mongoose';
import Chatroom from '../models/chatroom.js'
import User from '../models/auth.js'
import Message from '../models/message.js';
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
    console.log(userid)
    const data = req.body;
    console.log(data)
    if(!data || !data.chatroomid){
        return res.status(400).json({
            message: "Missing Fields"
        })
    }
    const userexist = await User.findOne({_id:userid},{chatrooms:data.chatroomid})
    if(!userexist) return res.status(400).json({
        message: "chatroom already exists"
    })
    console.log(userexist)
    // try{
        await Chatroom.updateOne({_id:data.chatroomid}, {
            $push: {
                users: userid
            }
        })
        try {
            await User.updateOne(
                { _id: userid },
                {
                    $push: {
                        chatrooms: data.chatroomid
                    }
                }
            );
            console.log('Chatroom added successfully for user');
        } catch (error) {
            console.error('Error adding chatroom for user:', error);
        }
    // }catch(err){
    //     return res.status(500).json({
    //         message:"Something went wrong"
    //     })
    // }

    return res.status(200).json({
        message: "Success"
    })
}

const getRecommendations = async(req,res) =>{
    const userid = req.userId;
    // const userTopics = ['dsa']
    // const topicIds = await Topic.find({ name: { $in: userTopics } }, '_id');
    // console.log(topicIds)
    const chatrooms = await Chatroom.find({ users: { $nin: [userid] } });

    return res.status(200).json({
        message:"success",
        chatrooms:chatrooms
    })

}

// TODO: Exit User


// TODO: Get Chatrooms for user


const getMostRecentMessage = async (chatroomId) => {
    try {
      const mostRecentMessage = await Message.findOne({ chatroom: chatroomId }).sort({ createdAt: -1 })
        console.log(mostRecentMessage)
      return mostRecentMessage;
    } catch (error) {
      console.error('Error finding most recent message:', error);
      throw error;
    }
  };


const getChatrooms = async(req,res) =>{
    const userid = req.userId;
    const user = (await User.findOne({_id:userid}).populate({
        path:"chatrooms",
        populate:[
        {
            path:'users',
            select: ['name','email']
        },
        {
            path:'topics',
            select:'name'
        }
    ]
    }))
    const chatrooms = user? user.chatrooms : [];
    // const formattedchatrooms = [];
    // for( let i=0; i<chatrooms.length; i++){
    //     const chatroom = chatrooms[i];
    //     const lastMessage = await getMostRecentMessage(chatroom._id);
    //     formattedchatrooms.push({...chatroom,lastMessage:lastMessage ? lastMessage.content : ''}); 
    // }
    // console.log(formattedchatrooms)
    return res.status(200).json({
        message: "Success",
        chatrooms:chatrooms
    })
}



export {getChatrooms,createChatRoom,joinChatRoom,getRecommendations};