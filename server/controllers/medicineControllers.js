const userModel = require("../models/userModel");
const categoryModel = require("../models/categoryModel");
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary");
const medicineModel = require("../models/medicineModel");
const vendorModel = require("../models/vendorModel");



exports.createMedicine = async(req, res) => {

    try {        
        const userId = req.user.id;

        const {name, description, category, price, stock} = req.body;
        //const vendor =userId;

        const images = req.files.medicineImage

        if(!name ||  !description || !category || !price || !stock || !images){
            return res.status(400).json({
                success: false,
                message: "All Fields not entered in createMedicine"
            })
        }

        const vendorDetail = await vendorModel.findOne({ user: userId});

        if(!vendorDetail){
            return res.status(404).json({
                success: false,
                message: "Vender not found with given id"
            })
        }

        //to do the following operation a category controller is first needed to be made as we need to store a category in db
        const categoryDetail = await categoryModel.findById(category);
        if (!categoryDetail) {
            return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
            })
        }

        //upload image to cloudinary
        const imageUploadDetail = await uploadImageToCloudinary(
            images,
            "HealthEase/Medicine_Images"
        )

        const newMedicine = await medicineModel.create({
            name,
            description,
            category: [category],
            price,
            stock,
            images: [imageUploadDetail.secure_url],
            vendor: [vendorDetail._id]
        })

        //add this new medicine to vendor's db
        const updatedVendorDetail = await vendorModel.findOneAndUpdate(
            { user: userId },
            {
                $push: { medicines: newMedicine._id }
            },
            { new: true }
        )

        //add this medicine to category db
        const updatedCategoryDetail = await categoryModel.findByIdAndUpdate(
            { _id: category},
            {
                $push: { medicines: newMedicine._id }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: newMedicine,
            message: "new Medicine created successfully"
        })

    } catch (error) {
        console.log("Some issue in creating new medicine: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to create medicine",
            error: error.message
        })
    }
}



//get all medicine
exports.getAllMedicine = async(req, res) => {

    try {        
        const allMedicine = await medicineModel.find(
            {}, 
            {
                name: true,
                description: true,
                category: true,
                price: true,
                stock: true,
                vendor: true,
                images: true,
                //ratingAndReview: true
            }
        )
        .populate("category")
        .populate({
            path: "vendor",
            populate: {
                path: "user",
                select: "-password"
            }
        })
        .exec()
        //.populate("RatingAndReview")
    
    
        return res.status(200).json({
            success: true,
            data: allMedicine
        })

    } catch (error) {
        console.log("Error while retriving all medicine detail: ", error);
        return res.status(404).json({
            success: false,
            message: "Cant fetch medicine data",
            error: error.message
        })
    }
}



//get a medicine detail
exports.getMedicineDetail = async(req, res) => {

    try {
        const { medicineId }= req.body;

        const medicineDetail = await medicineModel.findById(
            {
                _id: medicineId
            },
            {
                name: true,
                description: true,
                category: true,
                price: true,
                stock: true,
                vendor: true,
                images: true
            }
        )
        .populate("category")
        .populate("vendor")
        //.populate("RatingAndReview")
        .exec()
    
    
        return res.status(200).json({
            success: true,
            data: medicineDetail
        })

    } catch (error) {
        console.log("Error while getting medicine detail: ", error);
        return res.status(404).json({
            success: false,
            message: "Cant fetch medicine data",
            error: error.message
        })
    }
}



//get all medicine a vendor sell
exports.getVendorMedicines = async(req, res) => {
    try {
        
        const {vendorId} = req.body;

        const medicines = await medicineModel.find({vendor: vendorId}).populate("category").exec();

        return res.status(200).json({
            success: true,
            data: medicines
        })

    } catch (error) {
        console.error("error in getVendorMedicines", error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve vendor medicines",
            error: error.message,
        })
    }
}



//delete medicine
exports.deleteMedicine = async(req, res) => {

    try {

        const userId = req.user.id;
        const {medicineId} = req.body;

        const vendorDetail = await vendorModel.findOne({user: userId});
        const vendorId = vendorDetail._id;

        const medicine = await medicineModel.findById(medicineId);
        if(!medicine){
            return res.status(404).json({ message: "Course not found" })
        }
        
        //removing this medicine from category db
        const medicineCategory = medicine.category[0];

        //for(const category in medicineCategorys){
            await categoryModel.findByIdAndUpdate(medicineCategory, {
                $pull: { medicines: medicineId }
            })

            //PENDING
            //cheking if there is any medicine left in that category
            //if not then i will remove the category
        


        //i will not be removing medicine form prescription schema


        //deleteing that medicine from vendor db
        await vendorModel.findByIdAndUpdate(vendorId, {
            $pull:{
                medicines: medicineId
            }
        });


        //delete the medicine
        await medicineModel.findByIdAndDelete(medicineId);

        return res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
        })
        
    } catch (error) {
        console.error("Error while deleting medicine: ", error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting medicine",
            error: error.message,
        })
    }    
}