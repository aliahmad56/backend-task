const { validationResult } = require("express-validator");
const responseHandler = require("../utils/helpers/responseHandler");
const { MESSAGES, SORT_ORDER } = require("../utils/constants");
const categoryModel = require('../models/categoryModel') 
const carModel = require('../models/carModel') 

const createCategory = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseHandler(res, 400, {
          success: false,
          errors: errors.array(),
        });
      }
  
      const { name } = req.body;
  
      // Create the category in MongoDB
      const category = new categoryModel({ name });
      await category.save();
  
      return responseHandler(res, 201, category);
    } catch (err) {
      return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  const getCategories = async (req, res) => {
    try {
      const { pageNo, perPage, orderBy } = req?.query;
      let sort = { updatedAt: -1 }; // Default sort by updatedAt in descending order
  
      // Handling order by name
      if (orderBy) {
        if (orderBy === 'ASC') {
          sort = { name: 1 };  // Ascending order
        } else if (orderBy === 'DESC') {
          sort = { name: -1 }; // Descending order
        }
      }
  
      // Pagination
      const limit = perPage ? parseInt(perPage) : 10;
      const skip = pageNo > 0 && perPage ? (pageNo - 1) * limit : 0;
  
      const categories = await categoryModel.find()
        .skip(skip)
        .limit(limit)
        .sort(sort);
  
      // Return response
      return responseHandler(res, 200, { data: categories });
    } catch (err) {
      responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  
  const getCategory = async (req, res) => {
    try {
      const { id } = req?.params;
  
      // Fetch category by id along with associated cars
      const category = await categoryModel.findById(id).populate('cars');  // Populate 'cars' field
  
      if (!category) {
        return responseHandler(res, 404, { message: 'Category not found' });
      }
  
      return responseHandler(res, 200, category);
    } catch (err) {
      responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const { id } = req?.params;

        // Delete the category
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
  
        if (!deletedCategory) {
        return responseHandler(res, 404, { message: 'Category not found' });
        }

        await carModel.deleteMany({ category_id: id });
  
      return responseHandler(res, 200, { message: 'Category deleted successfully' });
    } catch (err) {
      responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    } 
  };
  
  const updateCategory = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseHandler(res, 400, {
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req?.params;
      const { name } = req?.body;

      const updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );
  
      if (!updatedCategory) {
        return responseHandler(res, 404, { message: 'Category not found' });
      }
  
      return responseHandler(res, 200, updatedCategory);
    } catch (err) {
      responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  
  module.exports = {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory
  }