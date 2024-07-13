import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Schema, z } from "zod";
import UploadCourseForm from "./components/UploadCourseForm";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  price: z.string().min(1),
  duration: z.string().min(1),
  sessionDetails: z.array(
    z.object({
      sessionNumber: z.number().positive(),
      title: z.string().min(5),
      description: z.string().min(10),
    })
  ),
  status: z.string().min(1),
  totalEnrollment: z.number().optional(),
  totalSession: z.number().positive().optional(),
  rating: z.string().optional(),
  thumbnail: z.string().optional(),
});

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
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET as string
      );

      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL as string,
        formData
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
      sessionDetails: [
        {
          sessionNumber: 1,
          title: "",
          description: "",
        },
      ],
      status: "active",
      rating: 0,
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
      const url = await uploadImage();

      if (!url) {
        return toast.error("Image upload failed", {
          position: "top-right",
          className: "bg-red-500 text-white p-4 rounded-lg",
          duration: 1000,
        });
      }

      data.thumbnail = url;
      data.totalSession = data.sessionDetails.length;
      console.log(data);
      toast.success("Course uploaded successfully", {
        position: "top-right",
        className: "bg-green-500 text-white p-4 rounded-lg",
        duration: 1000,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-lg shadow-md">
      <h1>Upload Courses</h1>
      <div className="grid space-y-6">
        <UploadCourseForm
          form={form}
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
          setValues={form.setValue}
          remove={remove}
        />
      </div>
    </section>
  );
};

export default UploadCourses;
