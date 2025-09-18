import { fileUploadCloudinary } from "../Utils/cloudnaryFIleUpload.js";
import { User } from "../Models/User.Model.js";
let uploaded = "";

const genrateAccessTokenAndRefereshToken = async (userId) => {
  try {
    const alreadyUser = await User.findById(userId);
    const accessToken = alreadyUser.genrateAccessToken();
    const refreshToken = alreadyUser.genrateRefreshToken();
    await alreadyUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const registerUser = async (req, res) => {
  try {
    const { userName, lastName, email, password } = req.body;
    if (!userName) {
      res.status(500).json({ message: "user Name is Required!" });
      return;
    }
    if (!email) {
      res.status(500).json({ message: "email is Required!" });
      return;
    }
    if (!password) {
      res.status(500).json({ message: "password is Required!" });
      return;
    }
    const avatar = req.files?.avatar[0].path;
    if (avatar) {
      uploaded = await fileUploadCloudinary(avatar);
    }

    const alreadyUser = await User.findOne({
      $or: [{ firstName: userName }, { email }],
    });
    if (alreadyUser) {
      res.status(500).json({ message: "You are already a user !" });
      return;
    }

    const newUser = await User.create({
      firstName: userName,
      lastName,
      email,
      password,
      avatar: uploaded.secure_url || null,
    });

    res.status(201).json({
      message: "User registered successfully",
      userName,
      email,
      password,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  // req body sa data len ha
  //data check krna ha k ha k ni
  //user check krna ha
  /// password check
  //access token or refreshtoken genrate token genrate krna ha
  //cookies ma  store krna ha

  const { email, userName, password } = req.body;
  if (!(email || userName)) {
    res.status(500).json({ message: "user Name or email is Required!" });
    return;
  }

  const user = User.findOne({ $or: [{ email }, { userName }] });
  if (!user) {
    res.status(500).json({ message: "user is not exist" });
    return;
  }
  const passwordCheck = await user.commparePassword(password);
  if (!passwordCheck) {
    res.status(500).json({ message: "password is not correct" });
    return;
  }

  const { accessToken, refreshToken } = genrateAccessTokenAndRefereshToken(
    user._id
  );

  const loggedInUser = User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: ture,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "user is logged in " });
};

export { registerUser, loginUser };
