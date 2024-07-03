import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <main className="main-banner">
      <div className="flex flex-col justify-end md:items-end items-center">
        <div className="p-6 md:p-0 md:relative top-10 right-36 w-full max-w-[450px]">
          <div className="tab w-full max-w-[450px] m-auto flex flex-col justify-center text-white rounded-3xl p-6">
            <h1 className="login-head mb-5 font-bold">Login</h1>
            <p className="text-2xl font-normal">Welcome onboard with us!</p>
            <div className="mt-10">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
