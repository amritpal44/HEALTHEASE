const express = require("express");
const { createMedicine, getAllMedicine, getMedicineDetail, getVendorMedicines, deleteMedicine } = require("../controllers/medicineControllers");
const { auth, isVendor, isAdmin } = require("../middleware/auth");
const { createCategory } = require("../controllers/categoryController");
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
//                                      Medicine routes
// ********************************************************************************************************

router.post("/createCategory",auth, isAdmin, createCategory);




module.exports = router;
