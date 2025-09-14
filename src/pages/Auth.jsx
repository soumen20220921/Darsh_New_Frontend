import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSuccess from "./SuccessMessage";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";


const Auth = () => {
  const {url} = useAppContext();
  const url2 = url;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);
     const url = isLogin
        ? `${url2}/api/user/login`
        : `${url2}/api/user/register`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(url, payload);

      setMessage({
        text: data.message,
        type: data.success ? "success" : "error",
      });

      if (isLogin && data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("userId", data.user._id);

        setUserName(data.user.name);
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/account");
          window.location.reload();
        }, 2000);
      } else if (!isLogin && data.success) {
        setTimeout(() => {
          window.scrollTo(0, 0);
          setIsLogin(true);
          setMessage({ text: "Registration successful! Please log in.", type: "success" });
        }, 1000);
      }
    } catch (err) {
      setMessage({ text: "Something went wrong", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loginSuccess ? (
        <AuthSuccess name={userName} />
      ) : (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-300 opacity-30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-pink-300 opacity-30 blur-3xl"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30"
          >
            {/* Toggle Login/Signup */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isLogin
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    !isLogin
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md"
                      : "text-gray-600 hover:text-pink-600"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Animated Switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center shadow-md">
                      {isLogin ? (
                        <LogIn className="h-8 w-8 text-blue-600" />
                      ) : (
                        <UserPlus className="h-8 w-8 text-pink-600" />
                      )}
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-lg text-pink-800">
                    {isLogin ? "Welcome Back 👋" : "Create Your Account 🎉"}
                  </h2>
                  <p className="text-sm text-blue-900 font-semibold mt-1">
                    {isLogin
                      ? "Log in to continue shopping."
                      : "Sign up and join our community."}
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`text-sm p-3 mb-4 rounded-lg border transition-all duration-300 ${
                      message.type === "error"
                        ? "bg-red-100 text-red-600 border-red-200"
                        : "bg-green-100 text-green-700 border-green-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-white placeholder-white/50 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-white placeholder-white/50 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-white placeholder-white/50 transition-all duration-300"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-blue-900 mb-1">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-white placeholder-white/50 transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 relative
              before:absolute before:inset-0 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                  >
                    {loading
                      ? "Processing..."
                      : isLogin
                      ? "Log In"
                      : "Sign Up"}
                  </motion.button>
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Auth;
