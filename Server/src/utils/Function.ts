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

const extractKeyFromUrl = (url: string) => {
  if (!url || typeof url !== "string") {
    console.error("Invalid URL passed to extractKeyFromUrl:", url);
    return null;
  }

  const parts = url.split(".com/");
  return parts.length > 1 ? parts[1] : null;
};