import AWS from 'aws-sdk';
import crypto from 'crypto';
import type { Request, Response } from 'express';
import type {
    AwsConfigEnv,
    GetSignedUrlRequestBody,
    GetSignedUrlResponse,
    SignUrlRequestBody,
    SignUrlResponse,
} from '@type';
import { sanitizeInput } from '@utils';

const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf"
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // ✅ 50MB

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const bucket = process.env.S3_BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !region || !bucket) {
    throw new Error('Missing required AWS environment variables');
}

const awsConfig: AwsConfigEnv = {
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
};

AWS.config.update({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region
});

const s3 = new AWS.S3();

const isSafeS3Key = (key: string): boolean => {
    // Prevent path traversal and reject empty/invalid keys.
    return Boolean(key) && !key.includes('..') && !key.startsWith('/') && !key.startsWith('\\');
};

export const Sign_Url = async (
    req: Request<Record<string, never>, SignUrlResponse | { error: string }, SignUrlRequestBody>,
    res: Response<SignUrlResponse | { error: string }>
) => {
    try {
        let { fileName, fileType, folderType } = req.body;

        if (!fileName || !folderType || !fileType) {
            return res.status(400).json({ error: 'fileName, fileType and folderType are required' });
        }

        // ✅ Validate file type
        if (!allowedTypes.includes(fileType)) {
            return res.status(400).json({ error: "Invalid file type" });
        }

        // ✅ Sanitize inputs
        const sanitized = sanitizeInput(folderType, fileName, fileType);
        folderType = sanitized.folderType;
        fileName = sanitized.fileName;
        fileType = sanitized.fileType;

        // ✅ Generate safe unique filename
        const ext = fileName.split('.').pop();
        const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

        const key = `${folderType.replace(/\s+/g, '_')}/${safeName}`;

        // ✅ Create Pre-Signed POST (supports file size limit)
        const presignedPost = s3.createPresignedPost({
            Bucket: awsConfig.bucket,
            Fields: {
                key: key,
                "Content-Type": fileType,
                acl: "private"
            },
            Conditions: [
                ["content-length-range", 0, MAX_FILE_SIZE], // ✅ 50MB limit
                ["starts-with", "$Content-Type", fileType.split('/')[0]] // extra safety
            ],
            Expires: 60 // 1 minute
        });

        return res.json({
            url: presignedPost.url,
            fields: presignedPost.fields,
            key: key
        });

    } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        return res.status(500).json({ error: 'Failed to generate upload URL' });
    }
};

export const Get_Signed_Url = async (
    req: Request<Record<string, never>, GetSignedUrlResponse | { error: string }, GetSignedUrlRequestBody>,
    res: Response<GetSignedUrlResponse | { error: string }>
) => {
    try {
        const { key } = req.body;

        if (!key) {
            return res.status(400).json({ error: 'key is required' });
        }

        if (!isSafeS3Key(key)) {
            return res.status(400).json({ error: 'Invalid key format' });
        }

        const signedUrl = s3.getSignedUrl('getObject', {
            Bucket: awsConfig.bucket,
            Key: key,
            Expires: 60,
        });

        return res.json({ url: signedUrl });
    } catch (error) {
        console.error('Error generating signed GET URL:', error);
        return res.status(500).json({ error: 'Failed to generate access URL' });
    }
};