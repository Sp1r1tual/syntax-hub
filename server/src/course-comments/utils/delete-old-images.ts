import { v2 as cloudinary } from "cloudinary";

const isCloudinaryUrl = (url: string): boolean =>
  url.includes("res.cloudinary.com");

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

export const deleteOldCommentImagesIfNeeded = async (
  oldImages: { src: string }[] | undefined,
  newImages?: { src: string }[],
): Promise<void> => {
  if (!oldImages || oldImages.length === 0) return;

  const newSrcSet = new Set(newImages?.map((img) => img.src));

  const imagesToDelete = oldImages.filter((img) => {
    if (!isCloudinaryUrl(img.src)) return false;
    return !newSrcSet.has(img.src);
  });

  if (imagesToDelete.length === 0) return;

  await Promise.all(
    imagesToDelete.map(async (img) => {
      const publicId = extractPublicId(img.src);

      if (!publicId) {
        console.warn("Could not extract public ID from URL:", img.src);
        return;
      }

      try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok" && result.result !== "not found") {
          console.error("Failed to delete comment image:", result);
        }
      } catch (error) {
        console.error("Error deleting comment image from Cloudinary:", error);
      }
    }),
  );
};
