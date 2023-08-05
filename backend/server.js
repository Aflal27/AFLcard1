const app = require('./app');
const connectDatabase = require('./config/database');


connectDatabase();

const server =  app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('sutting down the server due to unhandle rejection error');
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err.message}`);
    console.log('sutting down the server due to uncaught exception error');
    server.close(()=>{
        process.exit(1)
    })
})
 
 

