import React, { useState } from "react";
import { UserPlus, LogIn } from "lucide-react";
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
  const [authMethod, setAuthMethod] = useState("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      setMessage({ text: "Please enter your name", type: "error" });
      return false;
    }
    
    if (authMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setMessage({ text: "Please enter a valid email address", type: "error" });
        return false;
      }
    }
    
    if (authMethod === "phone") {
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        setMessage({ text: "Please enter a valid phone number", type: "error" });
        return false;
      }
    }
    
    if (!formData.password || formData.password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters", type: "error" });
      return false;
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

     if (!validateForm()) return;

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
        localStorage.setItem("phone", data.user.phone);
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
                <div className="flex space-x-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setAuthMethod("email")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      authMethod === "email"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMethod("phone")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      authMethod === "phone"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Phone
                  </button>
                </div>

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
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-1">
                      {authMethod === "email"
                        ? "Email Address"
                        : "Phone Number"}
                    </label>
                    <input
                      name={authMethod}
                      type={authMethod === "email" ? "email" : "tel"}
                      required
                      value={
                        authMethod === "email" ? formData.email : formData.phone
                      }
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500 transition-all duration-300"
                      placeholder={
                        authMethod === "email"
                          ? "Enter your email"
                          : "Enter your phone number"
                      }
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
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500 transition-all duration-300"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                              clipRule="evenodd"
                            />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
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
                        className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 text-gray-800 placeholder-gray-500 transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex items-start text-xs text-gray-600">
                      <input type="checkbox" required className="mr-2 mt-1" />
                      <span>
                        I agree to the{" "}
                        <a
                          href="/terms-and-conditions"
                          className="text-blue-600 underline"
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/PrivacyPolicy"
                          className="text-blue-600 underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium 
              shadow-md hover:shadow-lg transition-all duration-300 relative
              disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : isLogin ? (
                      "Log In"
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                {/* Additional options */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-blue-900">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage(null);
                      }}
                      className="font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
                    >
                      {isLogin ? "Sign up" : "Log in"}
                    </button>
                  </p>
                </div>

                {/* Success overlay */}
                {loginSuccess && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-green-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Welcome, {userName}!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You have successfully logged in to your account.
                      </p>
                      <button
                        onClick={() => setLoginSuccess(false)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Continue to Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Auth;
