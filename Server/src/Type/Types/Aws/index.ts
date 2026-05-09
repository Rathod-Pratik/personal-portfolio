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
	fields: Record<string, string>;
	key: string;
}

export interface GetSignedUrlRequestBody {
	key: string;
}

export interface GetSignedUrlResponse {
	url: string;
}

export interface UploadFileRequestBody {
	buffer: Buffer;
	fileName: string;
	fileType: string;
	folderType: string;
}

export interface UploadFileResponse {
	url: string;
	key: string;
	fileName: string;
	fileType: string;
}

export interface DeleteImageRequestBody {
	fileUrl?: string;
	key?: string;
}

export interface UpdateImageRequestBody {
	folderType: string;
	oldFileUrl?: string;
	oldKey?: string;
}
