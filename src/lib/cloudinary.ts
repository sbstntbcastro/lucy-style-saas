// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

/**
 * Initialize Cloudinary from the CLOUDINARY_URL env var.
 * Expected format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
 */
export const initCloudinary = () => {
  if (!process.env.CLOUDINARY_URL) {
    throw new Error("CLOUDINARY_URL is not defined in environment");
  }
  const url = new URL(process.env.CLOUDINARY_URL);
  const cloudName = url.hostname;
  const apiKey = url.username;
  const apiSecret = url.password;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
};

/**
 * Upload a file buffer to Cloudinary under the "lucy" folder.
 * Returns the secure URL of the uploaded image.
 */
export const uploadToCloudinary = async (fileBuffer: Buffer, filename: string): Promise<string> => {
  initCloudinary();
  const result = await cloudinary.uploader.upload_stream({
    folder: "lucy",
    public_id: filename.split(".")[0],
    resource_type: "image",
  }, (error, result) => {
    if (error) throw error;
    return result;
  });

  // Using the Promise API for uploader.upload_stream is a bit tricky; we'll wrap it.
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "lucy", public_id: filename.split(".")[0] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url ?? "");
      }
    );
    stream.end(fileBuffer);
  });
};

export default cloudinary;
