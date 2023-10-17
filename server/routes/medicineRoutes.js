const express = require("express");
const { createMedicine, getAllMedicine, getMedicineDetail, getVendorMedicines, deleteMedicine } = require("../controllers/medicineControllers");
const { auth, isVendor, isAdmin, isPatient } = require("../middleware/auth");
const { createCategory, showAllCategory, categoryPageDetails } = require("../controllers/categoryController");
const { createRating, getAverageRating, showAllRatingReview } = require("../controllers/ratingAndReviewController");
const router = express.Router();


// ********************************************************************************************************
//                                      Medicine routes
// ********************************************************************************************************

router.post("/createMedicine",auth, isVendor, createMedicine);
router.get("/getAllMedicine", getAllMedicine);
router.get("/getMedicineDetail", getMedicineDetail);
router.get("/getVendorMedicines", getVendorMedicines);
router.delete("/deleteMedicine", auth, isVendor, deleteMedicine);



// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************

router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);
router.get("/getCategoryPageDetails", categoryPageDetails);




// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating",auth, isPatient, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", showAllRatingReview);


module.exports = router;
