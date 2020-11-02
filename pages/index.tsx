import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const connectFileInput = (e: React.FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <form>
        <button onClick={connectFileInput} data-testid="button-test">
          Add Image
        </button>
        <input
          // onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.files[0].name)
          }
          data-testid="input-test"
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
        />
      </form>
      <div data-testid="result">{image}</div>
    </div>
  );
}
