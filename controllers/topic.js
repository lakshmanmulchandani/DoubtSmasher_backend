import Topic from "../models/topic.js";


const createTopic = async(req,res) => {
    const data = req.body;
    
    const topic = new Topic({
        name:data.name
    })
    await topic.save();
    console.log(topic);
    return res.status(200).json({
        message:"New topic added"
    })
}

const getTopics = async(req,res) =>{
    const query = req.body.query
    console.log(query)
    const topics = await Topic.find().select(['name']).limit(10);

    return res.status(200).json({
        message:'success',
        topics: topics
    })
}

export {createTopic,getTopics};