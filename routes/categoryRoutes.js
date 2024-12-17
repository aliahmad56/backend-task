const express = require('express');
const router = express.Router();
const { userVerifyToken } = require("../middlewares/authorization")
const {
    categoryDataValidate,
  } = require("../utils/validations/categoryValidation");
  const categoryController = require("../controllers/categoryController");
  const {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory,
  } = categoryController;

// All the below routes are protected routes
// router.use(userVerifyToken)  

router.get("/", getCategories);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.post("/", categoryDataValidate, createCategory);
router.put("/:id", categoryDataValidate, updateCategory);

module.exports = router;