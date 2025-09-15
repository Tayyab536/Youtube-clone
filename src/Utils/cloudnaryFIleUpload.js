import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fileUploadCloudinary = async (filePath) => {
  try {
    if (!filePath) return;
    const optimizeUrl = cloudinary.url(filePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded");

    return optimizeUrl;
  } catch (error) {
    fs.unlinkSync(filePath);
    return null;
  }
};
export { fileUploadCloudinary };
