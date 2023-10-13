const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { 
        type: String 
    },
	medicines: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Medicine",
		}
	]
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);