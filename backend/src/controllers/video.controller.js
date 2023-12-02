
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError")
const {videoService} = require("../services");

const catchAsync = require("../utils/catchAsync")






const getVideos = catchAsync(async (req, res) => {
    let data;
    if(Object.keys(req.query).length >0){
      data = await videoService.getFilteredVideos(req.query)
    }else{
      data = await videoService.getAll()
    }
    if (data === null) {
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
    }
      res.status(httpStatus.OK).send({
        "videos": data
      });
  });
  
  const getVideo = catchAsync(async (req,res) => {
    const data = await videoService.getVideo(req.params);
    if (data === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }
    res.status(httpStatus.OK).send(data);
  });
  
  const addVideo = catchAsync(async (req,res) => {
    const video = req.body;
    const data = await videoService.addVideo(video);
    if (data === null) {
      throw new ApiError(httpStatus[500], "Internal Server Error");
    }
    res.status(httpStatus.CREATED).send(data);
  });
  
  const changeViews = catchAsync(async (req,res) => {
    const data = await videoService.updateViews(req.params);
    if (data === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }
    res.status(httpStatus.NO_CONTENT).send();
  });
  
  const changeVotes = catchAsync(async (req,res) => {
    const data = await videoService.updateVotes(req);
    if (data === null) {
      throw new ApiError(httpStatus.NOT_FOUND, "Video not found");
    }
    res.status(httpStatus.NO_CONTENT).send();
  });
  
  
  module.exports = {
    getVideos,
    getVideo,
    addVideo,
    changeViews,
    changeVotes
  };