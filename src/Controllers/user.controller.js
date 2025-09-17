import { fileUploadCloudinary } from "../Utils/cloudnaryFIleUpload.js";
import { User } from "../Models/User.Model.js";
let uploaded = "";
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
      console.log("avatar");
      console.log(avatar);
      uploaded = await fileUploadCloudinary(avatar);
      console.log("uploaded");
      console.log(uploaded);
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

export { registerUser };
