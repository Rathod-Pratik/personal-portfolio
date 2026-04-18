import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const s3 =new AWS.S3();

function sanitizeInput(folderType, fileName, fileType) {
    // Normalize folder path
    folderType = folderType.replace(/\\/g, '/').trim();

    // Remove invalid characters from folderType
    folderType = folderType.replace(/[^a-zA-Z0-9/_-]/g, '');

    // Remove invalid characters from fileName
    fileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '').trim();

    // Infer fileType if empty
    if (!fileType && fileName.includes('.')) {
        fileType = fileName.split('.').pop();
    }

    return { folderType, fileName, fileType };
}
export const Sign_Url = async (req, res) => {
    try {
        let { fileName, fileType, folderType } = req.body;

        // Sanitize inputs
        const sanitized = sanitizeInput(folderType, fileName, fileType);
        folderType = sanitized.folderType;
        fileName = sanitized.fileName;
        fileType = sanitized.fileType;

        // Generate unique key with folder structure
        const key = `${folderType.replace(/\s+/g, '_')}/${Date.now()}_${fileName.replace(/\s+/g, '_')}`;

        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
            Expires: 60 * 5 // 5 minutes
        };

        const url = await s3.getSignedUrlPromise('putObject', params);

        res.json({
            url,
            key,
            publicUrl: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        });
    } catch (error) {
        console.error('Error generating pre-signed URL:', error);
        res.status(500).json({ error: 'Failed to generate upload URL' });
    }
};