import ImageUpload from "../../../components/ImageUpload";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import { z } from "zod";
import { schema } from "@/types";

type CategoryType = {
  _id: string;
  categoryName: string;
  categoryNameLowerCase: string;
};

const UploadCourseForm = ({
  handleSubmit,
  onSubmit,
  image,
  inputRef,
  handleImgChange,
  cleanUp,
  loading,
  errors,
  fields,
  append,
  remove,
  register,
}: {
  handleSubmit: UseFormHandleSubmit<{
    title: string;
    description: string;
    price: string;
    duration: string;
    totalEnrollment: number;
    totalSession: number;
    thumbnail: string;
    categoryId: string;
    sessionDetails: {
      sessionNumber: number;
      title: string;
      description: string;
    }[];
    status: string;
    rating: string;
    thumbnailLink: string;
  }>;
  onSubmit: (data: z.infer<typeof schema>) => Promise<void>;
  register: UseFormRegister<{
    title: string;
    description: string;
    price: string;
    duration: string;
    totalEnrollment: number;
    totalSession: number;
    thumbnail: string;
    categoryId: string;
    sessionDetails: {
      sessionNumber: number;
      title: string;
      description: string;
    }[];
    status: string;
    rating: string;
    thumbnailLink: string;
  }>;
  image: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cleanUp: () => void;
  loading: boolean;
  errors: FieldErrors<{
    title: string;
    description: string;
    price: string;
    duration: string;
    totalEnrollment: number;
    totalSession: number;
    thumbnail: string;
    categoryId: string;
    sessionDetails: {
      sessionNumber: number;
      title: string;
      description: string;
    }[];
    status: string;
    rating: string;
    thumbnailLink: string;
  }>;
  fields: FieldArrayWithId<
    {
      title: string;
      description: string;
      price: string;
      duration: string;
      totalEnrollment: number;
      totalSession: number;
      thumbnail: string;
      categoryId: string;
      sessionDetails: {
        sessionNumber: number;
        title: string;
        description: string;
      }[];
      status: string;
      rating: number;
      thumbnailLink: string;
    },
    "sessionDetails",
    "id"
  >[];
  append: UseFieldArrayAppend<
    {
      title: string;
      description: string;
      price: string;
      duration: string;
      totalEnrollment: number;
      totalSession: number;
      thumbnail: string;
      categoryId: string;
      sessionDetails: {
        sessionNumber: number;
        title: string;
        description: string;
      }[];
      status: string;
      rating: string;
      thumbnailLink: string;
    },
    "sessionDetails"
  >;
  remove: UseFieldArrayRemove;
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:5000/api/category");

      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <form className="grid space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            {...register("title")}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            {...register("description")}
            className="border border-gray-300 rounded-lg p-2"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            {...register("categoryId")}
            className="border border-gray-300 rounded-lg p-2"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className="text-red-500">{errors.categoryId.message}</span>
          )}
        </div>

        <div>
          <Tabs defaultValue="account" className="">
            <TabsList className="mb-4">
              <TabsTrigger value="account">
                Thumbnail Link From Google
              </TabsTrigger>
              <TabsTrigger value="password">Upload Thumbnail</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  id="thumbnailLinkFromGoogle"
                  placeholder="Thumbnail Link From Google"
                  {...register("thumbnailLink")}
                  className="border border-gray-300 rounded-lg p-2"
                />
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div>
                <ImageUpload
                  image={image}
                  inputRef={inputRef}
                  handleImgChange={handleImgChange}
                  cleanUp={cleanUp}
                />
                {/* {errors.image && (
                  <span className="text-red-500">{errors.image.message}</span>
                )} */}
              </div>
            </TabsContent>
          </Tabs>
          {errors.thumbnailLink && (
            <span className="text-red-500">{errors.thumbnailLink.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Price"
            {...register("price")}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}

          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            placeholder="Duration"
            {...register("duration")}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.duration && (
            <span className="text-red-500">{errors.duration.message}</span>
          )}

          <label htmlFor="status">Status</label>
          <select
            id="status"
            {...register("status")}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="1">Active</option>
            <option value="2">InActive</option>
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}

          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            placeholder="Rating"
            {...register("rating")}
            className="border border-gray-300 rounded-lg p-2"
          />
          {errors.rating && (
            <span className="text-red-500">{errors.rating.message}</span>
          )}

          <div>
            <label htmlFor="">Session Details</label>
            <div>
              {fields.map((_, index: number) => {
                return (
                  <div className="mt-2 grid gap-2" key={index}>
                    <input
                      type="number"
                      disabled
                      {...register(
                        `sessionDetails.${index}.sessionNumber` as const
                      )}
                      className="border border-gray-300 rounded-lg p-2 w-fit"
                    />
                    {errors?.sessionDetails && (
                      <span className="text-red-500">
                        {errors?.sessionDetails[index]?.sessionNumber
                          ?.message ?? ""}
                      </span>
                    )}

                    <input
                      type="text"
                      {...register(`sessionDetails.${index}.title`)}
                      placeholder="Title"
                      className="border border-gray-300 rounded-lg p-2"
                    />

                    {errors?.sessionDetails && (
                      <span className="text-red-500">
                        {errors?.sessionDetails[index]?.title?.message ?? ""}
                      </span>
                    )}

                    <textarea
                      {...register(`sessionDetails.${index}.description`)}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                      placeholder="Description"
                      rows={3}
                    />

                    {errors?.sessionDetails && (
                      <span className="text-red-500">
                        {errors?.sessionDetails[index]?.description?.message ??
                          ""}
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-lg mt-2"
                  onClick={() =>
                    append({
                      sessionNumber: fields.length + 1,
                      title: "",
                      description: "",
                    })
                  }
                >
                  Add Session
                </button>

                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-lg mt-2"
                  onClick={() => fields.length > 1 && remove(fields.length - 1)}
                >
                  Remove Session
                </button>
              </div>
            </div>
          </div>
        </div>

        {errors.sessionDetails && (
          <span className="text-red-500">{errors.sessionDetails.message}</span>
        )}

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadCourseForm;

// const schema = z.object({
//   title: z.string().min(5),
//   description: z.string().min(10),
//   price: z.number().positive(),
//   duration: z.number().positive(),
//   totalEnrollment: z.number().positive(),
//   totalSession: z.number().positive(),
//   sessionDetails: z.array(
//     z.object({
//       sessionNumber: z.number().positive(),
//       title: z.string().min(5),
//       description: z.string().min(10),
//     })
//   ),
//   status: z.string(),
//   rating: z.number().positive(),
// });
