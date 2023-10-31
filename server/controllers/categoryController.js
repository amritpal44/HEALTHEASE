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


exports.showAllCategory = async(req, res) => {

    try {
        
        const allCategory = await categoryModel.find().populate('medicines');
        res.status(200).json({
            success: true,
            data: allCategory
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}




exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await categoryModel.findById(categoryId)
        .populate({
          path: "medicines",
          populate: "ratingAndReview",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.medicines.length === 0) {
        console.log("No medicine found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No medicine found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await categoryModel.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await categoryModel.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "medicines",
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await categoryModel.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.medicines)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
  