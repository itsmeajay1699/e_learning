import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import UploadCourseForm from "./components/UploadCourseForm";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Axios from "@/utils";
import { schema } from "@/types";

const UploadCourses = () => {
  const [image, setImage] = useState<string | null>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const cleanUp = () => {
    URL.revokeObjectURL(image!);
    inputRef.current!.value = "";
    setImage("");
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files![0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    setFile(e.target.files[0]);
  };

  const profileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

      console.log(import.meta.env.VITE_CLOUDINARY_URL);
      console.log(import.meta.env.VITE_CLOUDINARY_PRESET);
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false,
        }
      );

      return response.data.secure_url;
    } catch (err) {
      console.log(err);
    }
  };

  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) {
      toast.error("Please select an image", {
        position: "top-right",
        className: "bg-red-500 text-white p-4 rounded-lg",
        duration: 1000,
      });
      return;
    }
    const url = await profileUpload(file);
    return url;
  };
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      duration: "",
      totalEnrollment: 0,
      totalSession: 1,
      thumbnail: "",
      categoryId: "",
      sessionDetails: [
        {
          sessionNumber: 1,
          title: "",
          description: "",
        },
      ],
      status: "1",
      rating: "",
      thumbnailLink: "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "sessionDetails",
    control,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setLoading(true);

      let url = "";
      if (data.thumbnailLink && !file) {
        url = data.thumbnailLink;
      } else if (!data.thumbnailLink && file) {
        url = await uploadImage();
      } else {
        form.setError("thumbnailLink", {
          message: "Thumbnail link is required",
        });
        return;
      }

      data.thumbnail = url;

      data.totalSession = data.sessionDetails.length;

      const res = await Axios.post("/course/create", data);

      console.log(res.data);

      toast.success("Course uploaded successfully", {
        position: "top-right",
        className: "bg-green-500 text-white p-4 rounded-lg",
        duration: 1000,
      });

      form.reset();

      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(errors);

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-lg shadow-md">
      <h1>Upload Courses</h1>
      <div className="grid space-y-6">
        <UploadCourseForm
          // form={form}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          image={image}
          inputRef={inputRef}
          handleImgChange={handleImgChange}
          cleanUp={cleanUp}
          loading={loading}
          errors={errors}
          fields={fields}
          append={append}
          // setValues={form.setValue}
          remove={remove}
        />
      </div>
    </section>
  );
};

export default UploadCourses;
