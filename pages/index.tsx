import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const connectFileInput = (e: React.FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    } else {
    }
  }, [image]);
  return (
    <div className={styles.container}>
      <form>
        {preview ? (
          <img
            src={preview}
            style={{ objectFit: "cover" }}
            onClick={connectFileInput}
          />
        ) : (
          <button onClick={connectFileInput} data-testid="button-test">
            Add Image
          </button>
        )}

        <input
          data-testid="input-test"
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          ref={fileInputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files![0];
            if (file && file.type.substr(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      </form>
    </div>
  );
}
