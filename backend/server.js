import express from "express"
import cors from "cors"
import reviews from './api/reviews.route.js'

const app = express();

app.use(cors())
//use json file in get/put... request
app.use(express.json());

//use route reviews created on this url
//base url
app.use('/api/v1/reviews', reviews);
//error if going on not created url
app.use('*',(req,res)=> 
    res.status(404).json({error:'not found'}))

//export file to use in another file
export default app