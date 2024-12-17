const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    registration_no: {
      type: String,
      required: true,
      unique: true,
      maxlength: 250,
    },
    model: {
      type: String,
      required: true,
      maxlength: 50, 
    },
    color: {
      type: String,
      required: true,
      maxlength: 50,
    },

    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category' 
      } 

  }

);


const Car = mongoose.model("cars", CarSchema);

module.exports = Car;
