import { useForm } from "react-hook-form";
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
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    try {
      const { email, password } = data;

      const res = await Axios.post("/auth/login", {
        email,
        password,
      });

      if (!res) {
        throw new Error("invalid creadentials");
      }

      localStorage.setItem("user", JSON.stringify(res.data.user));
      // localStorage.setItem("token", res.data.token);

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
    } catch (error) {
      console.log(error);
      toast.error("invalid creadentials", {
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
              className="bg-blue-500 text-white rounded-md p-[0.8rem] w-full"
            >
              Login
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
