export interface AwsConfigEnv {
	accessKeyId: string;
	secretAccessKey: string;
	region: string;
	bucket: string;
}

export interface SignUrlRequestBody {
	fileName: string;
	fileType?: string;
	folderType: string;
}

export interface SanitizedUploadInput {
	folderType: string;
	fileName: string;
	fileType: string;
}

export interface SignUrlResponse {
	url: string;
	key: string;
	publicUrl: string;
}
