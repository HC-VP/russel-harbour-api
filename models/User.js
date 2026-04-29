const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Import bcrypt to Hash passwords
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'le nom est requis'],
      trim: true
    },    
    email: {
      type: String,
      required: [true, 'un email est requis'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true      
    }
  },
  {
    timestamps: true
  }
);

//Hash password when modified
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);    
});

// Check if password ok
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);