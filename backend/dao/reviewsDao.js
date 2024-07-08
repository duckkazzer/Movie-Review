import mongodb from "mongodb"
//specific data type for working with database
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDao{
    static async injectDB(connect){
        //check if already connected
        if(reviews){
            return
        }
        //else
        try{
            reviews = await connect.db('reviews').collection("reviews")
        } catch(e){
            console.error(`Unable to establish collection dandles to userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review){
        try{
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review
            }
            //insertOne mongodb command for insert
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error: e};
        }
    }

    static async getReview(reviewId){
        try{
            //search by id(convert in ObjectId type)
            return await reviews.findOne({ _id: new ObjectId(reviewId)});
        }catch(e){
            console.error(`Unable to get review: ${e}`);
            return{error: e};
        }
    }

    static async updateReview(reviewId, user,review){
        console.log("revid: ", reviewId);
        try{
            const updateResponse = await reviews.updateOne( {_id: new ObjectId(reviewId)}, {$set: {user: user, review: review}})

            return updateResponse
        }catch(e){
            console.error(`Unable to update reviews: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({_id: new ObjectId(reviewId)})
            return deleteResponse
        }catch(e){
            console.error(`Unable to delete review: ${e}`)
            return{error: e}
        }
    }

    static async getReviewsByMovieId(movieId){
        try{
            //multiple items
            //parseInt convert to int
            //toArray convert to array
            const cursor = await reviews.find({movieId: parseInt(movieId)});
            return cursor.toArray();
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return{error: e}
        }
    }
}