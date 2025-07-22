const User = require("../../../model/userModel");
exports.getUsers = async (req, res) => {
  const userId = req.user.id;
  //console.log(req.user)
  const users = await User.find({ _id: { $ne: userId } }).select([
    "+otp",
    "+isOtpVerified",
    "-__v",
  ]);
  if (users.length > 1) {
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } else {
    res.status(404).json({
      message: "User collection is empty",
      data: [],
    });
  }
};

//Delete User Api

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({
      message: "Please provide userid",
    });
  }
  //check that userId exist or not

  const user = await User.findById(userId);
  if (!user) {
    res.status(400).json({
      message: "User not found with that userId",
    });
  } else {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  }
};
