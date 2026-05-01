import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

// Upload single file
export const uploadImageToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "anthony-monday-photos",
        resource_type: "image",
        public_id: `${Date.now()}-${filename.split(".")[0]}`,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Upload multiple files
export const uploadMultipleImages = async (files) => {
  const uploads = files.map((file) =>
    uploadImageToCloudinary(file.buffer, file.originalname)
  );

  return Promise.all(uploads);
};

// Delete image
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log(`Deleted image: ${publicId}`);
    } else if (result.result === "not found") {
      console.warn(`Image not found: ${publicId}`);
    }

    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    throw error;
  }
};