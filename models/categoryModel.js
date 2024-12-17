const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cars:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cars'
    }
  },
  { timestamps: true } 
);


const Category = mongoose.model('category', categorySchema);

module.exports = Category;
