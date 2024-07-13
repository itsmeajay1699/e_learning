import ImageUpload from "../../../components/ImageUpload";

const UploadCourseForm = ({
  form,
  register,
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
  setValues,
  remove,
}: {
  form: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  image: any;
  inputRef: any;
  handleImgChange: any;
  cleanUp: any;
  loading: boolean;
  errors: any;
  fields: any;
  append: any;
  setValues: any;
  remove: any;
}) => {
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

        <div>
          <ImageUpload
            image={image}
            inputRef={inputRef}
            handleImgChange={handleImgChange}
            cleanUp={cleanUp}
          />
        </div>
        {errors.image && (
          <span className="text-red-500">{errors.image.message}</span>
        )}

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
            <option value="active">Active</option>
            <option value="inactive">InActive</option>
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
              {fields.map((field: any, index: number) => {
                return (
                  <div className="mt-2 grid gap-2" key={field.id}>
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
                        {errors.sessionDetails[0].sessionNumber?.message ?? ""}
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
                        {errors.sessionDetails[0].title?.message ?? ""}
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
                        {errors.sessionDetails[0].description?.message ?? ""}
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
