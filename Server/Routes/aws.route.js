import express from 'express';
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const s3 =new AWS.S3();
const router=express.Router();

router.post('/signed-url', async (req, res) => {
  try {
    const { fileName, fileType, folderType } = req.body;
    
    // Generate unique key with folder structure
    const key = `${folderType}/${Date.now()}_${fileName.replace(/\s+/g, '_')}`;
    
    // // Validate file type based on folder
    // if (folderType.includes('images') && !fileType.startsWith('image/')) {
    //   return res.status(400).json({ error: 'Invalid file type for images folder' });
    // }
    
    // if (folderType.includes('pdf') && !fileType.includes('pdf')) {
    //   return res.status(400).json({ error: 'Invalid file type for PDF folder' });
    // }

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
});


export default router;
