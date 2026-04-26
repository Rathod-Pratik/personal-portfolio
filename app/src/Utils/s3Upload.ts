import apiClient from "@apiClient";
import { useEffect, useState } from "react";

export type SignedPostUploadResponse = {
  url: string;
  fields: Record<string, string>;
  key: string;
};

export type SignedGetUrlResponse = {
  url: string;
};

type SignedGetUrlRequest = {
  key: string;
};

const sanitizeFileName = (fileName: string): string =>
  fileName
    .replace(/\s+/g, "_")
    .replace(/\+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");

export const uploadToPrivateS3 = async (
  file: File,
  folderType: string,
): Promise<string> => {
  const signedPost = await apiClient.post<SignedPostUploadResponse>(
    "/s3/signed-url",
    {
      fileName: sanitizeFileName(file.name),
      fileType: file.type,
      folderType,
    },
    {
      withCredentials: true,
    },
  );

  const formData = new FormData();
  Object.entries(signedPost.data.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append("file", file);

  const uploadResponse = await fetch(signedPost.data.url, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 upload failed with status ${uploadResponse.status}`);
  }

  return signedPost.data.key;
};

export const getSignedObjectUrl = async (key: string): Promise<string> => {
  const response = await apiClient.post<SignedGetUrlResponse, { data: SignedGetUrlResponse }, SignedGetUrlRequest>(
    "/s3/signed-get-url",
    { key },
  );

  return response.data.url;
};

export const isHttpUrl = (value: string): boolean => value.startsWith("http://") || value.startsWith("https://");

const extractS3Key = (value: string): string | null => {
  if (!value) {
    return null;
  }

  if (!value.includes("amazonaws.com/")) {
    return value;
  }

  const [, keyPart = ""] = value.split("amazonaws.com/");
  return keyPart.split("?")[0] || null;
};

export const resolvePrivateObjectUrl = async (value: string): Promise<string> => {
  if (!value) {
    return "";
  }

  const key = extractS3Key(value);
  if (!key) {
    return "";
  }

  if (isHttpUrl(value) && !value.includes("amazonaws.com/")) {
    return value;
  }

  return getSignedObjectUrl(key);
};

export const usePrivateObjectUrl = (value?: string | null) => {
  const [resolvedUrl, setResolvedUrl] = useState("");

  useEffect(() => {
    let active = true;

    const loadUrl = async () => {
      if (!value) {
        if (active) {
          setResolvedUrl("");
        }
        return;
      }

      try {
        const nextUrl = await resolvePrivateObjectUrl(value);
        if (active) {
          setResolvedUrl(nextUrl);
        }
      } catch (error) {
        console.error("Failed to resolve private object URL", error);
        if (active) {
          setResolvedUrl("");
        }
      }
    };

    loadUrl();

    return () => {
      active = false;
    };
  }, [value]);

  return resolvedUrl;
};
