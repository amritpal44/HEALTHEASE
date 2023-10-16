const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
                required: true
            }
        ],
        price: {
            type: Number,
            required: true
        },
        vendor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vendor",
                required: true
            }
        ],
        stock: {
            type: Number,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        ratingAndReview: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview",
            }
        ]
    }
)

module.exports = mongoose.model("Medicine", medicineSchema);