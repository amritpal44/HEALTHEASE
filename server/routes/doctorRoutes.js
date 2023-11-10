const express = require("express");
const { getDoctorDetail, getAllDoctorDetail } = require("../controllers/doctorController");
const router = express.Router();


router.post("/getDoctorDetail", getDoctorDetail);
router.get("/getAllDoctorDetail", getAllDoctorDetail);

module.exports = router;