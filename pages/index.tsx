import { useEffect, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { type } from "os";
export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    getValues,
    watch,
  } = useForm();
  const onDrop = useCallback((acceptedFiles) => {
    setValue("image", acceptedFiles[0], {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  useEffect(() => {
    register("image");
  }, [register]);

  const watchImage = watch("image");
  useEffect(() => {
    console.log(watchImage);
    if (watchImage !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(watchImage);
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log(reader.result);
      };
    }
  }, [watchImage]);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${
            isDragActive ? styles.active : null
          }`}
        >
          <input name="image" {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div>
          <input
            name="name"
            type="text"
            ref={register}
            // onChange={(e) => setValue("name", e.currentTarget.value)}
          />
        </div>
        <div>
          <p>image preview</p>
          <img src={preview as string} alt="" style={{ objectFit: "cover" }} />
        </div>
        <button>제출</button>
      </form>
    </div>
  );
}
