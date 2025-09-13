import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthSuccess from "./SuccessMessage";
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-inter flex items-center justify-center py-10 px-4">
          <div className="relative max-w-md w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 space-y-8 animate-fadeIn border border-gray-200">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-200/40 rounded-full blur-3xl animate-pulse"></div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-md animate-bounce-slow">
                {isLogin ? (
                  <LogIn className="h-10 w-10 text-blue-600" />
                ) : (
                  <UserPlus className="h-10 w-10 text-blue-600" />
                )}
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-2 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
              {isLogin ? "Welcome Back 👋" : "Join Us Today 🎉"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>

            {/* Message */}
            {message && (
              <div
                className={`text-sm p-3 rounded-md animate-fadeIn ${
                  message.type === "error"
                    ? "bg-red-100 text-red-600 border border-red-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!isLogin && (
                  <div className="animate-slideUp">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                <div className="animate-slideUp">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="animate-slideUp">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
                  <div className="animate-slideUp">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 text-base font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                >
                  {loading
                    ? "Processing..."
                    : isLogin
                    ? "Log In"
                    : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
