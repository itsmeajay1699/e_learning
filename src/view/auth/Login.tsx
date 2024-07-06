import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      <main className="main-banner">
        <div className="flex flex-col justify-end md:items-end items-center">
          <div className="p-6 md:p-0 md:relative top-10 right-36 w-full max-w-[450px]">
            <AnimatePresence>
              {showLogin && (
                <motion.div
                  initial={{ x: 100, opacity: 0, scale: 0.3 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  // exit={{
                  //   x: -100,
                  //   opacity: 0,
                  //   scale: 0.3,
                  //   transition: { duration: 0.3 },
                  // }}
                  transition={{ ease: "easeInOut", duration: 1.5 }}
                  className="tab w-full max-w-[450px] m-auto flex flex-col justify-center text-white rounded-3xl p-6"
                >
                  <h1 className="login-head mb-5 font-bold">Login</h1>
                  <p className="text-2xl font-normal">
                    Welcome onboard with us!
                  </p>
                  <div className="mt-10">
                    <LoginForm setShowLogin={setShowLogin} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!showLogin && (
                <motion.div
                  initial={{ x: 100, opacity: 0, scale: 0.3 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  // exit={{
                  //   x: 100,
                  //   opacity: 0,
                  //   scale: 0.3,
                  //   transition: { duration: 0.3 },
                  // }}
                  transition={{ ease: "easeInOut", duration: 1.5 }}
                  className="tab w-full max-w-[450px] m-auto flex flex-col justify-center text-white rounded-3xl p-6"
                >
                  <h1 className="login-head mb-5 font-bold">Register</h1>
                  <p className="text-2xl font-normal">
                    Welcome onboard with us!
                  </p>
                  <div className="mt-10">
                    <RegisterForm
                      isStudent={isStudent}
                      setIsStudent={setIsStudent}
                      setShowLogin={setShowLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Login;
