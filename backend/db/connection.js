const mongoose = require("mongoose");

const connection = async ()=>{
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URI}`);
        if(response){
            console.log("Connected to Database")
        }
        
    } catch (error) {
        console.log(error)
    }
};

connection();