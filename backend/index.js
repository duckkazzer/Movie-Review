import app from './server.js'
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDao.js"
import dotenv from 'dotenv';
dotenv.config()

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.kypmlt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const port = 8000;

/*
    mongodb
    maxPoolSize - maximum people connected
    wtimeotMS - how long to wait to connect until timeout
    useNewUrlParser - always true
 */
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    //send db connection to reviewDAO function
    await ReviewsDAO.injectDB(client);
    //start server
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    })
})