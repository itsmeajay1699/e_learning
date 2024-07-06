const LoginForm = ({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
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
