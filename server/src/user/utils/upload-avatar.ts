import { InternalServerErrorException } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";

import { cloudinary } from "../providers/cloudinary";

const uploadAvatarToCloudinary = async (
  fileBuffer: Buffer,
  userId: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "avatars",
        public_id: `avatar_${userId}_${Date.now()}`,
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
          { quality: "auto" },
        ],
        resource_type: "image",
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(
            new InternalServerErrorException(
              "Failed to upload avatar to cloud storage",
            ),
          );
        } else if (!result || !result.secure_url) {
          reject(
            new InternalServerErrorException(
              "Upload succeeded but no URL was returned",
            ),
          );
        } else {
          resolve(result.secure_url);
        }
      },
    );

    uploadStream.on("error", (error) => {
      console.error("Upload stream error:", error);
      reject(
        new InternalServerErrorException("Failed to process avatar upload"),
      );
    });

    uploadStream.end(fileBuffer);
  });
};

export { uploadAvatarToCloudinary };
