import React from "react";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const RegisterForm = ({
  setShowLogin,
  isStudent,
  setIsStudent,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isStudent: boolean;
  setIsStudent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <div className="pb-8">
        <form action="">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="john@gmail.com" />

              <label htmlFor="password">Password</label>
              <input placeholder="********" type="password" />
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setIsStudent(true)}
                  className={`cursor-pointer ${
                    isStudent ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  Student
                </span>
                <div
                  onClick={() => setIsStudent(!isStudent)}
                  className={`h-6 w-12 p-[2px] rounded-md bg-gray-200 flex ${
                    isStudent ? "justify-start" : "justify-end"
                  }`}
                >
                  <motion.div
                    className={`h-5 w-5 rounded-full bg-blue-500`}
                    layout
                    transition={spring}
                  ></motion.div>
                </div>
                <span
                  onClick={() => setIsStudent(false)}
                  className={`cursor-pointer ${
                    !isStudent ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  Educator
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-[0.8rem] w-full"
            >
              Register
            </button>
          </div>
          <div>
            <div className="flex justify-center items-center gap-5 mt-5">
              <img
                className="w-8 h-8"
                src="../public/icons/fb.png"
                alt="fb-logo"
              />
              <img
                className="w-8 h-8"
                src="../public/icons/google.png"
                alt="fb-logo"
              />
            </div>
            <p className="text-center mt-5">
              Already have an account?{" "}
              <span
                onClick={() => setShowLogin(true)}
                className="text-blue-500 cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
