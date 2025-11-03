import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "@/types";
import { toast } from "sonner";
import Axios from "@/utils";

const Schema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password should be at least 6 characters long",
  }),
});

const LoginForm = ({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "edu@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    const { email, password } = data;
    setLoading(true);
    try {
      const res = await Axios.post("/auth/login", {
        email,
        password,
      });

      if (!res) {
        throw new Error("invalid creadentials");
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message, {
        position: "top-right",
        className: "bg-green-500 text-white p-4 rounded-lg",
        duration: 1000,
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("invalid creadentials", {
        position: "top-right",
        className: "bg-red-500 text-white p-4 rounded-lg",
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="pb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
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
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                placeholder="********"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white rounded-md p-[0.8rem] w-full disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
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
            <p className="text-center text-sm text-gray-500 mt-3">
              Student demo credentials: <span className="font-medium">stu@gmail.com</span> / <span className="font-medium">12345678</span>
            </p>
            <p className="text-center mt-5">
              Don't have an account?{" "}
              <span
                onClick={() => setShowLogin(false)}
                className="text-blue-500 cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
