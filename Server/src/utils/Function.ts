import type { SanitizedUploadInput } from "@type";
import AWS from "aws-sdk";

import dotenv from "dotenv";
dotenv.config();

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;

if (!awsAccessKeyId || !awsSecretAccessKey || !awsRegion) {
  throw new Error("Missing required AWS configuration environment variables");
}

AWS.config.update({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
});
const s3 = new AWS.S3();

export const deleteFile = async (fileUrl: string) => {
  if (!fileUrl) {
    console.warn("No file URL provided for deletion");
    return;
  }

  const bucket = process.env.S3_BUCKET_NAME;
  const key = extractKeyFromUrl(fileUrl);

  if (!bucket) {
    console.warn("S3 bucket is not configured, skipping S3 delete.");
    return;
  }

  if (key) {
    const params = {
      Bucket: bucket,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  } else {
    console.warn("Invalid file key extracted, skipping S3 delete.");
  }
};

export const extractKeyFromUrl = (url: string) => {
  if (!url || typeof url !== "string") {
    console.error("Invalid URL passed to extractKeyFromUrl:", url);
    return null;
  }

  // New records store only S3 key; legacy records may store full S3 URL.
  if (!url.includes(".com/")) {
    return url;
  }

  const parts = url.split(".com/");
  return parts.length > 1 ? parts[1] : null;
};

export function sanitizeInput(folderType: string, fileName: string, fileType?: string): SanitizedUploadInput {
    // Normalize folder path
    folderType = folderType.replace(/\\/g, '/').trim();

    // Remove invalid characters from folderType
    folderType = folderType.replace(/[^a-zA-Z0-9/_-]/g, '');

    // Remove invalid characters from fileName
    fileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '').trim();

    // Infer fileType if empty
    if (!fileType && fileName.includes('.')) {
        fileType = fileName.split('.').pop() || '';
    }

    if (!fileType) {
        fileType = 'application/octet-stream';
    }

    return { folderType, fileName, fileType };
}