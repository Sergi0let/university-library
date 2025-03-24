"use client";

import config from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, token, expire } = data;

    return { signature, token, expire };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    } else {
      throw new Error(`Authentication request failed: ${String(error)}`);
    }
  }
};

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: unknown) => {
    console.log(error);
    toast.error("Image uploaded failed", {
      description: `Your image could not be uploaded. Please try again later.`,
    });
  };

  // type guard
  const isSuccessResponse = (res: unknown): res is { filePath: string } => {
    return (
      res !== null &&
      typeof res === "object" &&
      "filePath" in res &&
      typeof (res as { filePath: string }).filePath === "string"
    );
  };

  const onSuccess = (res: unknown) => {
    if (isSuccessResponse(res)) {
      setFile(res);
      onFileChange(res.filePath);

      toast("Image uploaded successfully", {
        description: `${res.filePath} uploaded successfully!`,
      });
    } else {
      console.error("onSuccess called with an invalid response", res);
    }
  };

  // const onUploadProgress = () => {

  // }

  // const onUploadStart = () => {

  // }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        // onUploadProgress={onUploadProgress}
        // onUploadStart={onUploadStart}
        fileName="test-upload.png"
      />
      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            ikUploadRef.current?.click();
          } else {
            console.error("ikUploadRef is not assigned to an element yet");
          }
        }}
      >
        <Image src="/icons/upload.svg" alt="Upload" className="object-contain" width={20} height={20} />
        <p className="text-light-100 text-base">Upload a File</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && <IKImage alt={file.filePath} path={file.filePath} width={500} height={300} />}
    </ImageKitProvider>
  );
};

export default ImageUpload;
