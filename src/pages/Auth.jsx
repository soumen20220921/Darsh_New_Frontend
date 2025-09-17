import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, LogIn, Mail, Lock, User, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSuccess from "./SuccessMessage";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
  const { url } = useAppContext();
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
      const endpoint = isLogin ? `${url}/api/user/login` : `${url}/api/user/register`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const { data } = await axios.post(endpoint, payload);

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
      }

      // 👉 Auto switch to login if registration success
      if (!isLogin && data.success) {
        setFormData((prev) => ({
          ...prev,
          confirmPassword: "", // clear confirm password
        }));
        setTimeout(() => {
          setIsLogin(true);
          setMessage({ text: "Registration successful! Please log in.", type: "success" });
        }, 1500);
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loginSuccess ? (
        <AuthSuccess name={userName} />
      ) : (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12 bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 overflow-hidden">
          {/* Shining animated orbs */}
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-16 left-16 w-40 h-40 rounded-full bg-blue-400 opacity-30 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-24 right-24 w-56 h-56 rounded-full bg-pink-400 opacity-30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-20 right-1/3 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.3)] p-8 border border-white/40 overflow-hidden"
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-40 blur-xl animate-pulse"></div>

            <div className="relative z-10">
              {/* Toggle Login/Signup */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2 bg-gray-100 rounded-full p-1 shadow-inner">
                  <button
                    onClick={() => setIsLogin(true)}
                    type="button"
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
                    type="button"
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

              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header */}
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
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 drop-shadow">
                      {isLogin ? "Welcome Back 👋" : "Create Your Account 🎉"}
                    </h2>
                    <p className="text-sm text-gray-700 font-medium mt-1">
                      {isLogin
                        ? "Log in to continue shopping."
                        : "Sign up and join our community."}
                    </p>
                  </div>

                  {/* Message */}
                  {message && (
          <div
            className={`p-3 mb-5 rounded-xl border flex items-center justify-between animate-slide-in ${
              message.type === "error"
                ? "bg-red-900/30 text-red-200 border-red-700/30"
                : "bg-green-900/30 text-green-200 border-green-700/30"
            }`}
          >
            <div className="flex items-center">
              <div className={`rounded-full p-1 mr-3 ${message.type === "error" ? "bg-red-800/30" : "bg-green-800/30"}`}>
                {message.type === "error" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{message.text}</span>
            </div>
            <button 
              onClick={() => setMessage(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

                  {/* Form */}
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address or Phone No.
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email or Phone No."
                          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl text-white font-medium shadow-lg transition-all bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-2xl disabled:opacity-70"
                    >
                      {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
                    </button>
                  </form>

                  {/* Switch */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-700">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setMessage(null);
                        }}
                        className="font-semibold text-indigo-700 hover:underline"
                      >
                        {isLogin ? "Sign up" : "Log in"}
                      </button>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Auth;
