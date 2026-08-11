import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Mail,
  Lock,
  User,
  X,
  Sparkles,
  ShieldCheck,
  Crown,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
    const logoSrc = "/IMG/Logo.jpg";



  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  /* ============================================================
     SWITCH LOGIN / SIGNUP
  ============================================================ */

  const switchMode = (loginMode) => {

    setIsLogin(loginMode);
    setMessage(null);
    setShowPassword(false);

  };


  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = async (e) => {

    e.preventDefault();
    setMessage(null);

    /* Password validation */

    if (
      !isLogin &&
      formData.password !== formData.confirmPassword
    ) {

      setMessage({
        text: "Passwords do not match",
        type: "error",
      });

      return;
    }


    /* Password length */

    if (formData.password.length < 6) {

      setMessage({
        text: "Password must contain at least 6 characters",
        type: "error",
      });

      return;
    }


    try {

      setLoading(true);

      const endpoint = isLogin
        ? `${url}/api/user/login`
        : `${url}/api/user/register`;


      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };


      const { data } = await axios.post(
        endpoint,
        payload
      );


      setMessage({
        text: data.message,
        type: data.success
          ? "success"
          : "error",
      });


      /* ========================================================
         LOGIN SUCCESS
      ======================================================== */

      if (isLogin && data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "name",
          data.user.name
        );

        localStorage.setItem(
          "email",
          data.user.email
        );

        localStorage.setItem(
          "userId",
          data.user._id
        );


        setUserName(data.user.name);
        setLoginSuccess(true);


        setTimeout(() => {

          navigate("/account");
          window.location.reload();

        }, 2000);

      }


      /* ========================================================
         REGISTER SUCCESS
      ======================================================== */

      if (!isLogin && data.success) {

        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));


        setTimeout(() => {

          setIsLogin(true);

          setMessage({
            text:
              "Registration successful! Please log in.",
            type: "success",
          });

        }, 1500);

      }

    } catch (err) {

      setMessage({
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });

    } finally {

      setLoading(false);

    }

  };


  /* ============================================================
     SUCCESS SCREEN
  ============================================================ */

  if (loginSuccess) {

    return <AuthSuccess name={userName} />;

  }


  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#fffdf8]
        px-4
        py-8
        sm:px-6
        sm:py-12
      "
    >

      {/* ========================================================
          BACKGROUND DECORATION
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Maroon glow */}

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-20
            top-10
            h-72
            w-72
            rounded-full
            bg-[#741522]/10
            blur-3xl
          "
        />


        {/* Gold glow */}

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-20
            bottom-10
            h-80
            w-80
            rounded-full
            bg-[#d4ad54]/15
            blur-3xl
          "
        />


        {/* Center glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-96
            w-96
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#741522]/10
            blur-3xl
          "
        />


        {/* Decorative circles */}

        <div
          className="
            absolute
            left-[8%]
            top-[20%]
            h-3
            w-3
            rounded-full
            bg-[#d4ad54]
            opacity-50
          "
        />

        <div
          className="
            absolute
            right-[12%]
            top-[30%]
            h-2
            w-2
            rounded-full
            bg-[#741522]
            opacity-40
          "
        />

        <div
          className="
            absolute
            bottom-[20%]
            left-[15%]
            h-2
            w-2
            rounded-full
            bg-[#d4ad54]
            opacity-50
          "
        />

      </div>


      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-4rem)]
          max-w-6xl
          items-center
          justify-center
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="
            grid
            w-full
            overflow-hidden
            rounded-[2rem]
            border
            border-[#d4ad54]/25
            bg-white/90
            shadow-[0_25px_80px_rgba(74,24,21,0.15)]
            backdrop-blur-xl
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >

          {/* ====================================================
              LEFT BRAND PANEL
          ==================================================== */}

          <div
            className="
              relative
              hidden
              overflow-hidden
              bg-gradient-to-br
              from-[#741522]
              via-[#861d29]
              to-[#5f111b]
              p-10
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >

            {/* Decorative glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-72
                w-72
                rounded-full
                bg-[#e7c875]/10
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-20
                -left-20
                h-64
                w-64
                rounded-full
                bg-black/10
                blur-3xl
              "
            />


            {/* Brand */}

            <div className="relative z-10">

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Crown
                  className="
                    h-4
                    w-4
                    text-[#f5d98a]
                  "
                />

                <span
                  className="
                    font-serif
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.35em]
                    text-[#f5d98a]
                  "
                >
                  Darsh
                </span>

              </div>


              <div
                className="
                  mt-10
                  h-px
                  w-20
                  bg-[#d4ad54]
                "
              />

              <h1
                className="
                  mt-7
                  font-serif
                  text-4xl
                  font-bold
                  leading-tight
                  text-white
                  xl:text-5xl
                "
              >
                Tradition
                <br />
                <span
                  className="
                    text-[#f5d98a]
                  "
                >
                  Woven
                </span>
                <br />
                With Love.
              </h1>


              <p
                className="
                  mt-6
                  max-w-sm
                  text-sm
                  leading-7
                  text-white/65
                "
              >
                Discover handpicked sarees,
                timeless craftsmanship and
                beautiful Indian traditions
                with Darsh.
              </p>

            </div>


            {/* Fashion illustration */}

            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-center
                py-8
              "
            >

              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  h-36
                  w-36
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d4ad54]/40
                  bg-white/5
                  shadow-2xl
                  backdrop-blur
                "
              >

                {/* Circle Logo */}

                <Link
                  to="/"
                  onClick={() => {
                    // setMobileMenu(false);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    group
                    flex
                    items-center
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      h-[61px]
                      w-[61px]
                      items-center
                      justify-center
                      rounded-full
                    "
                  >
                    {/* Outer */}

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#C9A24A]
                        bg-[#FFFDF8]
                        shadow-[0_6px_20px_rgba(116,21,34,0.12)]
                      "
                    />

                    {/* Inner */}

                    <div
                      className="
                        absolute
                        inset-[5px]
                        rounded-full
                        border
                        border-[#C9A24A]/40
                      "
                    />

                    {/* Logo */}

                    <img
                      src={logoSrc}
                      alt="Darsh"
                      className="
                        relative
                        z-10
                        h-[76%]
                        w-[76%]
                        rounded-full
                        object-contain
                        p-1
                        mix-blend-multiply
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                    {/* Sparkle */}

                    <Sparkles
                      size={11}
                      strokeWidth={1.5}
                      className="
                        absolute
                        -right-1
                        -top-1
                        z-20
                        text-[#C9A24A]
                      "
                    />
                  </div>

                  
                </Link>

              </motion.div>

            </div>


            {/* Bottom */}

            <div className="relative z-10">

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                "
              >

                <ShieldCheck
                  className="
                    h-5
                    w-5
                    flex-shrink-0
                    text-[#f5d98a]
                  "
                />

                <div>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    Secure Shopping
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-white/50
                    "
                  >
                    Your account information
                    stays protected.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ====================================================
              RIGHT AUTH PANEL
          ==================================================== */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              bg-[#fffdf8]
              px-5
              py-8
              sm:px-10
              sm:py-12
              lg:px-12
            "
          >

            <div
              className="
                w-full
                max-w-md
              "
            >

              {/* Mobile Brand */}

              <div
                className="
                  mb-7
                  flex
                  items-center
                  justify-center
                  gap-2
                  lg:hidden
                "
              >

                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    text-[#b88732]
                  "
                />

                <span
                  className="
                    font-serif
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-[#741522]
                  "
                >
                  Darsh
                </span>

                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    text-[#b88732]
                  "
                />

              </div>


              {/* =================================================
                  LOGIN / SIGNUP TOGGLE
              ================================================== */}

              <div
                className="
                  mx-auto
                  mb-8
                  flex
                  max-w-xs
                  rounded-full
                  border
                  border-[#d4ad54]/20
                  bg-[#faf3e5]
                  p-1
                "
              >

                <button
                  type="button"
                  onClick={() => switchMode(true)}
                  className={`
                    relative
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-300
                    ${
                      isLogin
                        ? "bg-[#741522] text-white shadow-md"
                        : "text-[#806c63] hover:text-[#741522]"
                    }
                  `}
                >

                  <LogIn className="h-4 w-4" />

                  Log In

                </button>


                <button
                  type="button"
                  onClick={() => switchMode(false)}
                  className={`
                    relative
                    flex
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-300
                    ${
                      !isLogin
                        ? "bg-[#741522] text-white shadow-md"
                        : "text-[#806c63] hover:text-[#741522]"
                    }
                  `}
                >

                  <UserPlus className="h-4 w-4" />

                  Sign Up

                </button>

              </div>


              {/* =================================================
                  FORM ANIMATION
              ================================================== */}

              <AnimatePresence mode="wait">

                <motion.div
                  key={
                    isLogin
                      ? "login"
                      : "signup"
                  }
                  initial={{
                    opacity: 0,
                    x: isLogin
                      ? -25
                      : 25,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: isLogin
                      ? 25
                      : -25,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >


                  {/* =================================================
                      HEADER
                  ================================================== */}

                  <div className="mb-7 text-center">

                    <motion.div
                      initial={{
                        scale: 0.8,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                      }}
                      className="
                        mx-auto
                        mb-4
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#d4ad54]/25
                        bg-[#f3e8d2]
                        text-[#741522]
                        shadow-sm
                      "
                    >

                      {isLogin ? (
                        <LogIn className="h-7 w-7" />
                      ) : (
                        <UserPlus className="h-7 w-7" />
                      )}

                    </motion.div>


                    <h2
                      className="
                        font-serif
                        text-2xl
                        font-bold
                        text-[#4a1815]
                        sm:text-3xl
                      "
                    >
                      {isLogin
                        ? "Welcome Back"
                        : "Create Your Account"}
                    </h2>


                    <div
                      className="
                        mx-auto
                        mt-3
                        h-0.5
                        w-12
                        rounded-full
                        bg-gradient-to-r
                        from-[#741522]
                        to-[#d4ad54]
                      "
                    />


                    <p
                      className="
                        mt-3
                        text-xs
                        leading-5
                        text-[#806c63]
                      "
                    >
                      {isLogin
                        ? "Sign in to continue your Darsh journey."
                        : "Join Darsh and discover timeless collections."}
                    </p>

                  </div>


                  {/* =================================================
                      MESSAGE
                  ================================================== */}

                  <AnimatePresence>

                    {message && (

                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: -8,
                        }}
                        className={`
                          mb-5
                          flex
                          items-center
                          justify-between
                          gap-3
                          overflow-hidden
                          rounded-xl
                          border
                          p-3
                          ${
                            message.type ===
                            "error"
                              ? "border-red-200 bg-red-50 text-red-700"
                              : "border-green-200 bg-green-50 text-green-700"
                          }
                        `}
                      >

                        <div className="flex min-w-0 items-center gap-2">

                          {message.type ===
                          "error" ? (
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                          )}

                          <span className="text-xs font-medium">
                            {message.text}
                          </span>

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            setMessage(null)
                          }
                          className="
                            flex-shrink-0
                            text-current
                            opacity-60
                            transition
                            hover:opacity-100
                          "
                        >
                          <X className="h-4 w-4" />
                        </button>

                      </motion.div>

                    )}

                  </AnimatePresence>


                  {/* =================================================
                      FORM
                  ================================================== */}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >

                    {/* Name */}

                    {!isLogin && (

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-xs
                            font-bold
                            text-[#4a1815]
                          "
                        >
                          Full Name
                        </label>

                        <div className="group relative">

                          <User
                            className="
                              absolute
                              left-3.5
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              text-[#a99082]
                              transition
                              group-focus-within:text-[#741522]
                            "
                          />

                          <input
                            type="text"
                            name="name"
                            required
                            value={
                              formData.name
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="Enter your full name"
                            className="
                              h-12
                              w-full
                              rounded-xl
                              border
                              border-[#d8cabe]
                              bg-white
                              pl-10
                              pr-4
                              text-sm
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a49a]
                              focus:border-[#741522]
                              focus:ring-4
                              focus:ring-[#741522]/10
                            "
                          />

                        </div>

                      </div>

                    )}


                    {/* Email / Phone */}

                    <div>

                      <label
                        className="
                          mb-2
                          block
                          text-xs
                          font-bold
                          text-[#4a1815]
                        "
                      >
                        Email Address or Phone No.
                      </label>

                      <div className="group relative">

                        <Mail
                          className="
                            absolute
                            left-3.5
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-[#a99082]
                            transition
                            group-focus-within:text-[#741522]
                          "
                        />

                        <input
                          type="text"
                          name="email"
                          required
                          value={
                            formData.email
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter your email or phone"
                          className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-[#d8cabe]
                            bg-white
                            pl-10
                            pr-4
                            text-sm
                            text-[#4a1815]
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-[#b5a49a]
                            focus:border-[#741522]
                            focus:ring-4
                            focus:ring-[#741522]/10
                          "
                        />

                      </div>

                    </div>


                    {/* Password */}

                    <div>

                      <div
                        className="
                          mb-2
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <label
                          className="
                            text-xs
                            font-bold
                            text-[#4a1815]
                          "
                        >
                          Password
                        </label>

                        {isLogin && (
                          <span
                            className="
                              text-[10px]
                              font-medium
                              text-[#b88732]
                            "
                          >
                            Secure login
                          </span>
                        )}

                      </div>


                      <div className="group relative">

                        <Lock
                          className="
                            absolute
                            left-3.5
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-[#a99082]
                            transition
                            group-focus-within:text-[#741522]
                          "
                        />

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name="password"
                          required
                          value={
                            formData.password
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter your password"
                          className="
                            h-12
                            w-full
                            rounded-xl
                            border
                            border-[#d8cabe]
                            bg-white
                            pl-10
                            pr-12
                            text-sm
                            text-[#4a1815]
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-[#b5a49a]
                            focus:border-[#741522]
                            focus:ring-4
                            focus:ring-[#741522]/10
                          "
                        />


                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                          className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-[#a99082]
                            transition
                            hover:text-[#741522]
                          "
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >

                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}

                        </button>

                      </div>

                    </div>


                    {/* Confirm Password */}

                    {!isLogin && (

                      <div>

                        <label
                          className="
                            mb-2
                            block
                            text-xs
                            font-bold
                            text-[#4a1815]
                          "
                        >
                          Confirm Password
                        </label>

                        <div className="group relative">

                          <Lock
                            className="
                              absolute
                              left-3.5
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              text-[#a99082]
                              transition
                              group-focus-within:text-[#741522]
                            "
                          />

                          <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={
                              formData.confirmPassword
                            }
                            onChange={
                              handleChange
                            }
                            placeholder="Confirm your password"
                            className="
                              h-12
                              w-full
                              rounded-xl
                              border
                              border-[#d8cabe]
                              bg-white
                              pl-10
                              pr-4
                              text-sm
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a49a]
                              focus:border-[#741522]
                              focus:ring-4
                              focus:ring-[#741522]/10
                            "
                          />

                        </div>

                      </div>

                    )}


                    {/* Submit */}

                    <motion.button
                      whileHover={{
                        scale: loading
                          ? 1
                          : 1.01,
                        y: loading
                          ? 0
                          : -1,
                      }}
                      whileTap={{
                        scale: loading
                          ? 1
                          : 0.98,
                      }}
                      type="submit"
                      disabled={loading}
                      className="
                        group
                        mt-2
                        flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#741522]
                        via-[#861d29]
                        to-[#5f111b]
                        text-sm
                        font-bold
                        text-white
                        shadow-lg
                        shadow-[#741522]/20
                        transition-all
                        duration-300
                        hover:shadow-xl
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                      "
                    >

                      {loading ? (

                        <>
                          <motion.span
                            animate={{
                              rotate: 360,
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="
                              h-4
                              w-4
                              rounded-full
                              border-2
                              border-white/30
                              border-t-white
                            "
                          />

                          Processing...

                        </>

                      ) : (

                        <>
                          {isLogin
                            ? "Log In to Darsh"
                            : "Create Darsh Account"}

                          <ArrowRight
                            className="
                              h-4
                              w-4
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                          />

                        </>

                      )}

                    </motion.button>

                  </form>


                  {/* =================================================
                      SWITCH ACCOUNT
                  ================================================== */}

                  <div className="mt-6 text-center">

                    <p
                      className="
                        text-xs
                        text-[#806c63]
                      "
                    >

                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}

                      <button
                        type="button"
                        onClick={() =>
                          switchMode(
                            !isLogin
                          )
                        }
                        className="
                          font-bold
                          text-[#741522]
                          underline-offset-4
                          transition
                          hover:text-[#b88732]
                          hover:underline
                        "
                      >
                        {isLogin
                          ? "Create one"
                          : "Log in"}
                      </button>

                    </p>

                  </div>


                  {/* =================================================
                      SECURITY
                  ================================================== */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      justify-center
                      gap-2
                      border-t
                      border-[#d4ad54]/15
                      pt-5
                    "
                  >

                    <ShieldCheck
                      className="
                        h-3.5
                        w-3.5
                        text-[#b88732]
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-wider
                        text-[#a99082]
                      "
                    >
                      Secure & Protected
                    </span>

                  </div>

                </motion.div>

              </AnimatePresence>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Auth;