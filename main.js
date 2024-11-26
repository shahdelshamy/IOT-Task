// import to  express library
const express = require("express") ;

// create an instance of express
const instance = express() ;

const port=9090;

instance.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

 //get(route, params)
instance.get("/",(request,response)=>{
    response.send("Server responsed!")
})  