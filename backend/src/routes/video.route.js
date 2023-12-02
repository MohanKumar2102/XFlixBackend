const express = require("express");

const validate = require("../middlewares/validate");
const videoValidate = require("../validations/video.validation");
const {videoController} = require("../controllers");

const route = express.Router();

route.get("/",videoController.getVideos);

route.get("/:videoId",validate(videoValidate.getVideos),videoController.getVideo);

route.post("/",validate(videoValidate.addVideo),videoController.addVideo);

route.patch("/:videoId/views",validate(videoValidate.updateViews),videoController.changeViews);

route.patch("/:videoId/votes",validate(videoValidate.updateVotes),videoController.changeVotes);

module.exports = route;