const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
   fname: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      required: "Fname is required"
   },
   lname: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      required: "Lname is required"
   },
   title: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      required: "Title is required",
      enum: ['Mr', "Mrs", "Miss"],
   },

   email: {

      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   password: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      required: "Password is required"
   }

}, { timestamps: true });
module.exports = mongoose.model('Author', authorSchema)