require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email: "admin@test.com" });

    if (existingUser) {
      console.log("Admin user already exists");
      process.exit();
    }

    await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: "test1234",
    });

    console.log("Admin user created");

    process.exit();
    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();