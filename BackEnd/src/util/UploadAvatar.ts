import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary.config({
//   cloud_name: "rohitbmalviya",
//   api_key: "544591477783738",
//   api_secret: "4fRNzugxiBHU0eAmPfV-WfALf4I",
// });

if (
  process.env.CLOUDINARYNAME &&
  process.env.CLOUDINARYAPIKEY &&
  process.env.CLOUDINARYSECRETKEY
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARYNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYSECRETKEY,
  });
} else {
  console.error("Cloudinary configuration values are missing.");
}

const uploadFile = async (localFilePath: string) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error: any) {
    fs.unlinkSync(localFilePath);
    localFilePath;
    return null;
  }
};

export default uploadFile;
