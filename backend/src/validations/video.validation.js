const Joi = require("joi");
const {objectId} = require("./custom.validation");
const Values = require("../utils/values.js")

const updateVotes={
    params:Joi.object().keys({
        videoId:Joi.required().custom(objectId),
    }),
    body:Joi.object().keys({
        vote:Joi.string().required().valid(...Values.updateVoteTypes),
        change:Joi.string().required().valid(...Values.changeVoteTypes)
    })
}


const updateViews = {
    params:Joi.object().keys({
        videoId:Joi.required().custom(objectId),
    })
}

const getVideos = {
    params:Joi.object().keys({
        videoId:Joi.required().custom(objectId),
    })
}

// const searchVideos = {
//     query:{
//         title: Joi.string().optional(),
//         contentRating: Joi.string().optional().valid(...Values.contentRatings),
//         genres:Joi.string().optional().valid(...Values.genres),
//         sortBy:Joi.string().optional().valid(...Values.sortBy)

//     }
// }

const addVideo = {
    body:Joi.object().keys({
        videoLink: Joi.string().required(),
        title: Joi.string().required(),
        genre:Joi.string().required().valid(...Values.genres),
        contentRating: Joi.required().optional().valid(...Values.contentRatings),
        releaseDate: Joi.string().required(),
        previewImage: Joi.string().required()
    }),
}

module.exports ={
    addVideo, getVideos, updateViews, updateVotes
}