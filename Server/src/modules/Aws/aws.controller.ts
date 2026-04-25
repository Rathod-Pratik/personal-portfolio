import AWS from 'aws-sdk'
import type { Request, Response } from 'express';
import type {
    AwsConfigEnv,
    SanitizedUploadInput,
    SignUrlRequestBody,
    SignUrlResponse,
} from '@type';

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
})
const s3 =new AWS.S3();

function sanitizeInput(folderType: string, fileName: string, fileType?: string): SanitizedUploadInput {
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
export const Sign_Url = async (
    req: Request<Record<string, never>, SignUrlResponse | { error: string }, SignUrlRequestBody>,
    res: Response<SignUrlResponse | { error: string }>,
) => {
    try {
        let { fileName, fileType, folderType } = req.body;

        if (!fileName || !folderType) {
            return res.status(400).json({ error: 'fileName and folderType are required' });
        }

        // Sanitize inputs
        const sanitized = sanitizeInput(folderType, fileName, fileType);
        folderType = sanitized.folderType;
        fileName = sanitized.fileName;
        fileType = sanitized.fileType;

        // Generate unique key with folder structure
        const key = `${folderType.replace(/\s+/g, '_')}/${Date.now()}_${fileName.replace(/\s+/g, '_')}`;

        const params = {
            Bucket: awsConfig.bucket,
            Key: key,
            ContentType: fileType,
            Expires: 60 * 5 // 5 minutes
        };

        const url = await s3.getSignedUrlPromise('putObject', params);

        res.json({
            url,
            key,
            publicUrl: `https://${awsConfig.bucket}.s3.${awsConfig.region}.amazonaws.com/${key}`
        });
    } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        return res.status(500).json({ error: 'Failed to generate upload URL' });
    }
};