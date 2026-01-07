import { InternalServerErrorException } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import crypto from "crypto";
import { z } from "zod";

import { CommentsImageSchema } from "../schemas/course-comments-image.schema";

import { cloudinary } from "../../common/providers/cloudinary";

export const uploadCommentImagesToCloudinary = async (
  files: Express.Multer.File[] | undefined,
  userId: string,
) => {
  if (!files || files.length === 0) {
    return [];
  }

  const uploadedImages = await Promise.all(
    files.map(
      (file, index) =>
        new Promise<z.infer<typeof CommentsImageSchema>>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "comments",
              public_id: `comment_${userId}_${crypto.randomUUID()}`,
              resource_type: "image",
              transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
            },
            (error, result: UploadApiResponse | undefined) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                return reject(
                  new InternalServerErrorException(
                    "Failed to upload comment image",
                  ),
                );
              }

              if (!result?.secure_url) {
                return reject(
                  new InternalServerErrorException(
                    "Upload succeeded but no URL was returned",
                  ),
                );
              }

              const image = {
                id: crypto.randomUUID(),
                order: index,
                src: result.secure_url,
              };

              try {
                resolve(CommentsImageSchema.parse(image));
              } catch {
                reject(
                  new InternalServerErrorException(
                    "Invalid image schema after upload",
                  ),
                );
              }
            },
          );

          uploadStream.on("error", (error) => {
            console.error("Upload stream error:", error);
            reject(
              new InternalServerErrorException(
                "Failed to process comment image upload",
              ),
            );
          });

          uploadStream.end(file.buffer);
        }),
    ),
  );

  return uploadedImages;
};
