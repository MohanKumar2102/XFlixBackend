const ApiError = require("../utils/ApiError");

const {Video} = require("../models")


const getAll = async () => {
    const data  = await Video.find({})
    return data
 };
 
 const getFilteredVideos = async (query) => {
    let data;
    if(query.title && !query.sortBy && !query.genres && !query.contentRating){
       data  = await Video.find( { title: { "$regex": query.title, "$options": "i" } } )
 
       return data;
 
    }else if(!query.title && query.sortBy && !query.genres && !query.contentRating){
       if(query.sortBy === "viewCount"){
          let allVideos  = await Video.find({})
          data = allVideos.sort((a,b)=>{
             return parseInt(b.viewCount) - parseInt(a.viewCount)
          })
          return data
 
       }else{
          let allVideos  = await Video.find({})
          data = allVideos.sort((a,b)=>{
             return new Date(b.releaseDate) - new Date(a.releaseDate)
          })
          return data
 
       }
    }else if(!query.title && !query.sortBy && query.genres && !query.contentRating){
       let genres = query.genres.split(",");
       data  = await Video.find( {genre:{$in:genres}})
       return data
 
 
    }else if(!query.title && !query.sortBy && !query.genres && query.contentRating){
       let rating = query.contentRating.split(",");
       data  = await Video.find( {contentRating:{$in:rating}})
       return data
 
 
    }else{
          if(query.sortBy === "viewCount"){
             if(!query.genres){
                let rating = query.contentRating.split(",");
    
             let allVideos  = await Video.find({$and:[
                { title: { "$regex": query.title, "$options": "i" } },
                {contentRating:{$in:rating}}
            ]})
             data = allVideos.sort((a,b)=>{
                return parseInt(b.viewCount) - parseInt(a.viewCount)
             })
             return data
             }
             if(!query.contentRating){
                let genres = query.genres.split(",");
             let allVideos  = await Video.find({$and:[
                { title: { "$regex": query.title, "$options": "i" } },
                {genre:{$in:genres}}
            ]})
             data = allVideos.sort((a,b)=>{
                return parseInt(b.viewCount) - parseInt(a.viewCount)
             })
             return data
             }
             if(!query.title){
                let genres = query.genres.split(",");
             let rating = query.contentRating.split(",");
    
             let allVideos  = await Video.find({$and:[
                {genre:{$in:genres}},
                {contentRating:{$in:rating}}
            ]})
             data = allVideos.sort((a,b)=>{
                return parseInt(b.viewCount) - parseInt(a.viewCount)
             })
             return data
             }
    
             let genres = query.genres.split(",");
             let rating = query.contentRating.split(",");
    
             let allVideos  = await Video.find({$and:[
                { title: { "$regex": query.title, "$options": "i" } },
                {genre:{$in:genres}},
                {contentRating:{$in:rating}}
            ]})
             data = allVideos.sort((a,b)=>{
                return parseInt(b.viewCount) - parseInt(a.viewCount)
             })
             return data
    
          }else{
             if(!query.genres){
                let rating = query.contentRating.split(",");
    
                data  = await Video.find({$and:[
                   { title: { "$regex": query.title, "$options": "i" } },
                   {contentRating:{$in:rating}}
               ]})
                return data
             }
             if(!query.contentRating){
                let genres = query.genres.split(",");
                data  = await Video.find({$and:[
                   { title: { "$regex": query.title, "$options": "i" } },
                   {genre:{$in:genres}}
                ]})
                return data
             }
             if(!query.title){
                let genres = query.genres.split(",");
             let rating = query.contentRating.split(",");
    
             data  = await Video.find({$and:[
                {genre:{$in:genres}},
                {contentRating:{$in:rating}}
            ]})
             return data
             }
             let genres = query.genres.split(",");
             let rating = query.contentRating.split(",");
             data  = await Video.find({$and:[
                { title: { "$regex": query.title, "$options": "i" } },
                {genre:{$in:genres}},
                {contentRating:{$in:rating}}
            ]})
             return data
       }  
    }
 };
 
 const getVideo = async (id) => {
    const data  = await Video.findById(id.videoId);
    return data
 };
  
 const addVideo = async (video) => {
   //  const data  = await Video.create(video);
   const data = new Video(video);
   await data.save();
    return data
 };
 
 const updateViews = async (id) => {
    const video  = await Video.findById(id.videoId);
    if(video === null){
       return null
    }
    let count = video.viewCount+1;
    const data = await Video.findByIdAndUpdate({_id:id.videoId},{$set: { viewCount:count}},{new:true}).then((docs)=>{
       return docs
    })
    return data
 };
 
 const updateVotes = async (req) => {
    const video  = await Video.findById(req.params.videoId);
    if(video === null){
       return null
    }
    if(req.body.vote === "upVote"){
       let count;
       if(req.body.change === "increase"){
          count = video.votes.upVotes+1;
       }else{
          if(video.votes.upVotes !== 0){
             count = video.votes.upVotes-1;
          }else{
             count = 0;
          }
       }
    const data = await Video.findByIdAndUpdate({_id:req.params.videoId},{$set: { "votes.upVotes":count}},{new:true}).then((docs)=>{
       return docs
    })
    return data
    }else{
       let count;
       if(req.body.change === "increase"){
          count = video.votes.downVotes+1;
       }else{
          if(video.votes.downVotes !== "0"){
             count = video.votes.downVotes-1;
          }else{
             count = 0;
          }
       }
    const data = await Video.findByIdAndUpdate({_id:req.params.videoId},{$set: { "votes.downVotes":count}},{new:true}).then((docs)=>{
       return docs
    })
    return data
    }
    
 };
 
 module.exports = {
    getAll,
    getVideo,
    addVideo,
    updateViews,
    updateVotes,
    getFilteredVideos
  };