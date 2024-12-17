const { validationResult } = require("express-validator");
const responseHandler = require("../utils/helpers/responseHandler");
const { MESSAGES, SORT_ORDER } = require("../utils/constants");
const carModel = require('../models/carModel') 

  const createCar = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return responseHandler(res, 400, {
            success: false,
            errors: errors.array(),
          });
        }

      const { model, color, registration_no, category_id } = req?.body;
  
      const car = await carModel.create({
        model,
        color,
        registration_no,
        category_id,
      });
  
      // Respond with the newly created car added
      return responseHandler(res, 201, car);
    } catch (err) {
      return responseHandler(res, 500, { 
        message: MESSAGES.INTERNAL_SERVER_ERROR, 
        err: err.message
      });
    }
  };

  const getCars = async (req, res) => {
    try {
      const { pageNo = 1, perPage = 10, orderBy, order } = req.query;
      const sort = {};

      if (orderBy && order) {
        sort[orderBy] = order === SORT_ORDER.ASC ? 1 : -1;
      } else {
        sort["updatedAt"] = -1;
      }

      const limit = parseInt(perPage);
      const skip = (parseInt(pageNo) - 1) * limit;
  
      // Retrieve cars with pagination and sorting
      const cars = await carModel.find()
        .populate({
          path: "category_id"
        })
        .sort(sort)
        .skip(skip)
        .limit(limit);
  
      // Get the total count for pagination purposes
      const totalCars = await carModel.countDocuments();
  
      // Prepare response
      const response = {
        cars,
        count: cars.length,
        total: totalCars,
        page: parseInt(pageNo),
        perPage: limit,
      };
  
      return responseHandler(res, 200, response);
    } catch (err) {
      return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  const getCar = async (req, res) => {
    try {
      const { id } = req.params;
      const car = await carModel.findById(id).populate({
        path: "category_id" 
      });
  
      if (!car) {
        return responseHandler(res, 404, { message: "Car not found" });
      }
  
      return responseHandler(res, 200, car);
    } catch (err) {
      return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  const deleteCar = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Attempt to find and delete the car by its ID
      const deletedCar = await carModel.findByIdAndDelete(id);
  
      if (!deletedCar) {
        return responseHandler(res, 404, { message: "Car not found" });
      }
  
      return responseHandler(res, 200, { message: "Car deleted successfully" });
    } catch (err) {
      return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  const totalNumberofCars = async (req, res) => {
    try {
      // Count the total number of cars in the database
      const carCount = await carModel.countDocuments();
    
      return responseHandler(res, 200, `${carCount}`);
    } catch (err) {
      return responseHandler(res, 500, { message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
  
  const updateCar = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return responseHandler(res, 400, {
          success: false,
          errors: errors.array(),
        });
      }
  
      const { id } = req.params;
      const { model, registration_no, color, category_id } = req.body;
  
      // Attempt to find and update the car by its ID
      const updatedCar = await carModel.findByIdAndUpdate(
        id,
        { model, registration_no, color, category_id },
        { new: true, runValidators: true } // `new` ensures the updated car is returned
      );
    
      if (!updatedCar) {
        return responseHandler(res, 404, { message: "Car not found" });
      }
  
      return responseHandler(res, 200, updatedCar);
    } catch (err) {
      return responseHandler(res, 500, { 
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        err: err.message
      });
    }
  };

  const deleteCarOnCategoryDeletion = async (category_id) => {
    try {
      // Attempt to delete all cars with the given category_id
      const deletedCars = await carModel.deleteMany({ category_id });
  
      return deletedCars;
    } catch (err) {
      throw new Error(MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };
  


  


  module.exports = {
    createCar,
    getCars,
    getCar,
    deleteCar,
    totalNumberofCars,
    updateCar,
    deleteCarOnCategoryDeletion
  }
  