const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");
const { carDataValidate } = require("../utils/validations/carValidation");
const { userVerifyToken } = require("../middlewares/authorization")
const { createCar, getCars, getCar, deleteCar, updateCar, totalNumberofCars } =
  carController;
// All the below routes are protected routes
// router.use(userVerifyToken);

router.get("/", getCars);
router.get("/:id", getCar);
router.delete("/:id", deleteCar);
router.post("/", carDataValidate, createCar);
router.get("/total/count", totalNumberofCars);
router.put("/:id", carDataValidate, updateCar);

module.exports = router;
