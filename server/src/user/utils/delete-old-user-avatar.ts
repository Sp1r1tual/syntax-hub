import { v2 as cloudinary } from "cloudinary";

const deleteOldAvatarIfNeeded = async (
  oldAvatar: string,
  newAvatar: string,
): Promise<void> => {
  if (!oldAvatar || oldAvatar === newAvatar) return;
  if (!oldAvatar.includes("res.cloudinary.com")) return;

  const publicId = extractPublicId(oldAvatar);

  if (!publicId) {
    console.warn("Could not extract public ID from URL:", oldAvatar);
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      console.error("Failed to delete old avatar:", result);
    }
  } catch (error) {
    console.error("Error deleting old avatar from Cloudinary:", error);
  }
};

const extractPublicId = (url: string): string | null => {
  try {
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/upload/");

    if (parts.length < 2) return null;

    let pathAfterUpload = parts[1];

    pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");

    const lastDotIndex = pathAfterUpload.lastIndexOf(".");
    if (lastDotIndex === -1) return null;

    const publicId = pathAfterUpload.substring(0, lastDotIndex);

    return publicId || null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export { deleteOldAvatarIfNeeded };
