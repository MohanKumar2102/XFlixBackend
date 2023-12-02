const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
const {videoLink} = require("../validations/custom.validation");
const Values = require("../utils/values");

const contentRatings = Values.contentRatings;

const genres = Values.genres;
// const videoRegExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))

const videoSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    videoLink:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validation(value){
            if(!videoRegExp.match(value)){
                throw new Error("Please add a valid video link.")
            }
        }
    },
    contentRating:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!contentRatings.includes(value)){
                throw new Error("Invalid Content Rating")
            }
        }
    },
    genre:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!genres.includes(value)){
                throw new Error("Invalid genre");
            }
        }
    },
    releaseDate:{
        type:Date,
        default:Date.now(),
        required:true,
        trim:true
    },
    previewImage:{
        type:String,
        trim:true,
        default:"https://i.ibb.co/nbYsmJB/Xflix.jpg"
    },
    viewCount:{
        type:Number,
        default:0
    },
    votes:{
        upVotes:{
            type:Number,
            default:0
        },
        downVotes:{
            type:Number,
            default:0
        }
    }
})


const Video = mongoose.model('Video', videoSchema);

module.exports.Video = Video;