const express = require("express");
const cors = require("cors");

const httpStatus = require("http-status");
const {errorConverter, errorHandler} = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const routers = require("./routes");


const app = express();



app.use(express.json());
app.use(cors());
app.options("*",cors());

app.use(express.urlencoded({extended:true}));

app.use("/v1",routers);

app.use((req,res,next)=>{
    next(new ApiError(httpStatus.NOT_FOUND,'Not found'));
})


app.use(errorConverter);
app.use(errorHandler);

module.exports = app;