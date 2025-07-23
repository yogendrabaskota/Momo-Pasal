const User = require("./model/userModel");
const bcrypt = require("bcryptjs");

const adminSeeder = async () => {
  // admin seeding

  //check whether the admin exists or not
  const isAdminExists = await User.findOne({
    userEmail: "adminadmin@gmail.com",
  });
  if (!isAdminExists) {
    await User.create({
      userEmail: "adminadmin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userPhoneNumber: "9090",
      userName: "admin",
      role: "admin",
    });
    console.log("Admin seeded successfully");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeder;
