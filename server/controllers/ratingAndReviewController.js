const doctorModel = require("../models/doctorModel");
const ratingandreviewModel = require("../models/ratingandreviewModel");


exports.createRating = async(req, res) => {
    try {
        
        const userId = req.user.id;
        const { rating, review, doctorId } = req.body;

        //check if user exists in doctor schema
        const doctorDetail = await doctorModel.findOne({
            _id: doctorId,
            patient: { $elemMatch: {$eq: userId}}
        })

        if(!doctorDetail){
            return res.status(404).json({
                success: false,
                message: "Patient hasn't took any appointment from doctor"
            })
        }

        //check if that user already made a review
        const alreadyReviewed = await ratingandreviewModel.findOne({
            user: userId,
            doctor: doctorId
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course already reviewed by user",
            })
        }

        //create entry
        const newRating = await ratingandreviewModel.create({
            user: userId,
            rating,
            review,
            doctor: doctorId
        });

        //add this rating to doctor db
        const updatedDoctorDetail = await doctorModel.findByIdAndUpdate(doctorId, {
            $push: {
                ratingAndReview: newRating._id
            }
        }).populate("ratingAndReview")

        return res.status(200).json({
            success: true,
            message: "new rating created succesfully",
            updatedDoctorDetail
        })

    } catch (error) {
        console.log("Error while creating rating: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server",
            error: error.message
        })
    }
}


//get average rating
exports.getAverageRating = async(req, res) => {
    try {
        const doctorId = req.body;
        
        const result = await ratingandreviewModel.aggregate([
            {
                $match: {
                    doctor: doctorId
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating"
                    }
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success: false,
                averageRating: result[0].averageRating
            })
        }

        return res.status(200).json({
            success: true,
            message: "no rating for this id",
            averageRating: 0
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve the rating for doctor",
            error: error.message,
        })
    }
}



//get all rating
exports.showAllRatingReview = async( req, res ) => {

    try {
        const allReview = await ratingandreviewModel.find({})
            .sort({rating: "desc"})
            .populate({ path: "user", select: "firstName lastName email image"})
            .populate({
                path: "doctor",
                select: "user",
                populate:{
                    path: "user",
                    select: "firstName lastName email image"
                }
            })
            .exec()
    
        return res.status(200).json({
            success: true,
            data: allReview
        })
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve the rating and review for the course",
            error: error.message,
        })
    }
}