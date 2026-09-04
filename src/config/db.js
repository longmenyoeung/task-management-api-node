import mongoose from "mongoose"
//uri
const uri = process.env.MONGODB_ATLAS;

const connnectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log(`Mongoose with to mongodb.`);
        });
        mongoose.connection.on("error", (error) => {
            console.log(`Mongoose connection error :${error}`);
        });
        mongoose.connection.on("disconnected", () => {
            console.log(`Mongoose disconnected.`)
        });
        //connect to db 
        await mongoose.connect(uri, {dbName:'task-mgt-api-node'});
        
    } catch (error) {
        console.log(`connnection failed:${error}`);
        process.exit(1);
    }
}

export default connnectDb