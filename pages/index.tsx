import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { useDropzone } from "react-dropzone";
export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const onDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log(reader.result);
      };
    }
  }, [image]);
  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : null}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div>
        <input name="name" type="text" />
      </div>
      <div>
        <p>image preview</p>
        <img src={preview as string} alt="" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
