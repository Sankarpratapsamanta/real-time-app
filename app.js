require('dotenv').config()
const express=require('express');
const cors = require('cors');
const http=require('http');
const app=express();
const socketIo = require('socket.io');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Travel=require('./models/travel_data');


const serverRoute=require('./router/server');

mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(()=>{
    console.log('Database Connected')
}).catch(err=>{
    console.log('db err',err);
})

app.set('view engine','ejs')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',serverRoute);

const server = http.createServer(app);
const io=socketIo(server);




io.on("connection", socket => {
  console.log(socket.id)
  console.log("New client connected")
  socket.on('initial_data',()=>{
    Travel.find({}).then(data=>{
      // console.log(data)
      io.sockets.emit('get_data',data)
    }).catch(err=>{
      console.log({message:err})
    })
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});




const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Listening on port ${port}`));