import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUser } from "@/types";
import { toast } from "sonner";
import Axios from "@/utils";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters long",
  }),
});

const RegisterForm = ({
  setShowLogin,
  isStudent,
  setIsStudent,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isStudent: boolean;
  setIsStudent: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      profilePic: "",
    },
  });

  const onSubmit = async (data: RegisterUser) => {
    try {
      const { email, password } = data;

      const res = await Axios.post("/auth/register", {
        email,
        password,
        isStudent,
      });

      if (!res) {
        throw new Error("Failed to register");
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));

      // now working right now because of the Navigate component
      // if (res.data.user.role === "1") {
      //   return <Navigate to="/student" />;
      // } else if (res.data.user.role === "2") {
      //   return <Navigate to="/educator" />;
      // }

      toast.success(res.data.message, {
        position: "top-right",
        className: "bg-green-500 text-white p-4 rounded-lg",
        duration: 1000,
      });
      window.location.reload();
    } catch (err) {
      toast.error("Failed to register", {
        position: "top-right",
        className: "bg-red-500 text-white p-4 rounded-lg",
        duration: 1000,
      });
    }
  };

  return (
    <div>
      <div className="pb-8">
        <form
          className="flex flex-col space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          action=""
        >
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="text"
                placeholder="john@gmail.com"
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}

              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                placeholder="********"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
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
                  className={`h-6 w-12 p-[2px] rounded-full bg-gray-200 flex ${
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
                src="/icons/fb.png"
                alt="fb-logo"
              />
              <img
                className="w-8 h-8"
                src="/icons/google.png"
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
