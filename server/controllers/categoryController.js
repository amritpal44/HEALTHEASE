const categoryModel = require("../models/categoryModel");


exports.createCategory = async(req, res) => {
    try {
        const { name, description }  = req.body;
    
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All Fields required"
            })
        }
    
        await categoryModel.create({
            name,
            description
        })
    
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        })
        
    } catch (error) {
        console.log("Error while creating category: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}