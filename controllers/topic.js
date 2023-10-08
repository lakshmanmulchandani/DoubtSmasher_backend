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

export {createTopic};