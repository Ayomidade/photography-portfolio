import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { config } from "dotenv";

// ─── Cloudinary configuration ───────────────────────────────────────────────

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Cloudinary storage configs ──────────────────────────────────────────────

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: async(req, file) => ({
    folder: "anthony-monday-photos",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  })
});

// export const uploadImage = multer({
//   storage: imageStorage,
//   fileFilter: imageFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
// });

export const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }
  },
});

export const deleteImage = async (publicId) => {
  
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    if(result.result === "ok"&& result.result!=="not found"){
      console.log(`Deleted image with public ID: ${publicId}`, result);
    }
    // await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    console.log(`Deleted image with public ID: ${publicId}`);
  } catch (error) {
    console.error(`Error deleting image with public ID ${publicId}:`, error.message);
  }
}

export { cloudinary };
