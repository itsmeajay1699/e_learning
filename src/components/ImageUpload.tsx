import { useState, useRef } from "react";
import axios from "axios";

const ImageUpload = ({
  image,
  inputRef,
  handleImgChange,
  cleanUp,
}: {
  image: any;
  inputRef: any;
  handleImgChange: any;
  cleanUp: any;
}) => {
  return (
    <div>
      <h1>Image upload</h1>

      {image && (
        <div className="flex">
          <div className="relative w-1/4 min-w-[300px]">
            <img className="w-full my-4" src={image} alt="preview" />
            <button
              className="bg-red-500 text-white p-2 rounded-full absolute top-5 right-2"
              onClick={cleanUp}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div
        className={`${
          image ? "hidden" : "block"
        } border border-gray-300 rounded-lg p-4 flex justify-center items-center mt-6`}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleImgChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
