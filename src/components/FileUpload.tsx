"use client";

import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
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

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string;
  onFileChange: (filePath: string) => void;
}

const FileUpload = ({ accept, folder, placeholder, type, variant, value, onFileChange }: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({ filePath: value ?? null });
  const [progress, setProgress] = useState(0);

  const styles = {
    button: variant === "dark" ? "bg-dark-300" : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-500",
  };

  const onError = (error: unknown) => {
    console.log(error);
    toast.error(`${type} uploaded failed`, {
      description: `Your ${type} could not be uploaded. Please try again later.`,
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

      toast(`${type} uploaded successfully`, {
        description: `${res.filePath} uploaded successfully!`,
      });
    } else {
      console.error("onSuccess called with an invalid response", res);
    }
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast.warning("File size to large", {
          description: "Please upload a file that is less than 20MB in size",
        });
        return false;
      }
    } else if ((type = "video")) {
      if (file.size > 50 * 1024 * 1024) {
        toast.warning("File size to large", {
          description: "Please upload a file that is less than 50MB in size",
        });
        return false;
      }
    }
    return true;
  };

  // const onUploadProgress = () => {

  // }

  // const onUploadStart = () => {

  // }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        useUniqueFileName={true}
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        accept={accept}
        folder={folder}
      />
      <button
        className={cn("upload-btn", styles.button)}
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
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {file && <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {file.filePath && type === "image" ? (
        <IKImage alt={file.filePath || ""} path={file.filePath || ""} width={500} height={300} />
      ) : file.filePath && type === "video" ? (
        <IKVideo path={file?.filePath || ""} className="h-96 w-full rounded-xl" controls={true} />
      ) : null}
    </ImageKitProvider>
  );
};

export default FileUpload;
