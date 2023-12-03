const mongoose = require("mongoose");
const config = require("./config/config")
const app = require("./app");
require("dotenv").config();
const logger = require("./config/logger")


let server;
console.log(config.port);
server  = mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log(`Connecting to ${process.env.port_node}`)
    server = app.listen(process.env.port_node,()=>{
        console.log(`Server running on port ${process.env.port_node}`);
    });
    return ;
}).catch((error)=>{
    console.log("error connecting to MongoDB: ", error.message)
});

const exitHandler =()=>{
    if(server){
        server.close(()=>{
            console.log("Server closed");
            process.exit(1);
        });
    }else{
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};
  

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
  
