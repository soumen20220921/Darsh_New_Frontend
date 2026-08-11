import React, { useState, useEffect } from "react";
import {
  MapPin,
  X,
  CheckCircle,
  User,
  Phone,
  Map,
  Globe,
  Home,
  Sparkles,
  Edit3,
  ShieldCheck,
  Navigation,
  Save,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const AddressInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    FullName: "",
    Add: "",
    VillorCity: "",
    Dist: "",
    State: "Select State",
    customState: "",
    Pin: "",
    Phone: "",
  });

  const {
    address,
    setAddress,
    error,
    setError,
    loading,
    setLoading,
    url,
  } = useAppContext();

  /* =========================================================
     PREDEFINED STATES
  ========================================================= */

  const predefinedStates = [
    "West Bengal",
    "Bihar",
    "Jharkhand",
    "Odisha",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Delhi",
    "Uttar Pradesh",
    "Andhra Pradesh",
    "Arunachal Pradesh",
  ];

  /* =========================================================
     LOAD EXISTING ADDRESS
  ========================================================= */

  useEffect(() => {
    if (address) {
      const isOtherState =
        !predefinedStates.includes(address.State);

      setFormData({
        FullName: address.FullName || "",
        Add: address.Add || "",
        VillorCity: address.VillorCity || "",
        Dist: address.Dist || "",
        State: isOtherState
          ? "Other"
          : address.State || "Select State",
        customState: isOtherState
          ? address.State
          : "",
        Pin: address.Pin || "",
        Phone: address.Phone || "",
      });
    }
  }, [address]);

  /* =========================================================
     MODAL UX
  ========================================================= */

  useEffect(() => {
    if (!showPopup) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    // Prevent background page movement while the address dialog is open.
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowPopup(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPopup]);

  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const errors = {};

    if (!formData.FullName.trim()) {
      errors.FullName = "Full name is required";
    }

    if (!formData.Add.trim()) {
      errors.Add = "Address is required";
    }

    if (!formData.VillorCity.trim()) {
      errors.VillorCity =
        "City/Village is required";
    }

    if (!formData.Dist.trim()) {
      errors.Dist = "District is required";
    }

    if (
      formData.State === "Other" &&
      !formData.customState.trim()
    ) {
      errors.customState =
        "Please specify your state";
    } else if (
      formData.State === "Select State"
    ) {
      errors.State = "Please select a state";
    }

    if (!formData.Pin) {
      errors.Pin = "PIN code is required";
    } else if (isNaN(Number(formData.Pin))) {
      errors.Pin = "PIN code must be a number";
    } else if (formData.Pin.length !== 6) {
      errors.Pin = "PIN code must be 6 digits";
    }

    if (!formData.Phone) {
      errors.Phone = "Phone number is required";
    } else if (
      !/^\d{10}$/.test(formData.Phone)
    ) {
      errors.Phone =
        "Phone number must be exactly 10 digits";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const handleEditClick = () => {
    setShowPopup(true);
    setError(null);
    setValidationErrors({});
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const userId =
        localStorage.getItem("userId");

      const stateToSave =
        formData.State === "Other"
          ? formData.customState
          : formData.State;

      const dataToSend = {
        ...formData,
        State: stateToSave,
        userId,
      };

      delete dataToSend.customState;

      let res;

      if (address?._id) {
        res = await axios.put(
          `${url}/api/address/updateAddress/${address._id}`,
          dataToSend,
          {
            headers: {
              "Content-Type":
                "application/json",
              ...(token && {
                Auth: token,
              }),
            },
          }
        );
      } else {
        res = await axios.post(
          `${url}/api/address/addaddress`,
          dataToSend,
          {
            headers: {
              "Content-Type":
                "application/json",
              ...(token && {
                Auth: token,
              }),
            },
          }
        );
      }

      setLoading(false);

      if (res.data.success !== false) {
        setError(null);
        setShowPopup(false);
        setShowSuccessMessage(true);

        setAddress(res.data.address);

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setError(
          res.data.message ||
            "Error saving address."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Something went wrong."
      );

      setLoading(false);
    }
  };

  /* =========================================================
     FORM FIELDS
  ========================================================= */

  const fields = [
    {
      name: "FullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      icon: User,
    },
    {
      name: "Add",
      label: "Street Address",
      placeholder: "House / Street / Locality",
      icon: Map,
    },
    {
      name: "VillorCity",
      label: "Village / City",
      placeholder: "Enter village or city",
      icon: Home,
    },
    {
      name: "Dist",
      label: "District",
      placeholder: "Enter district",
      icon: MapPin,
    },
    {
      name: "Pin",
      label: "PIN Code",
      placeholder: "6 digit PIN code",
      icon: Navigation,
    },
    {
      name: "Phone",
      label: "Phone Number",
      placeholder: "10 digit mobile number",
      icon: Phone,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-5xl space-y-5 font-sans sm:space-y-7">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/25
          bg-gradient-to-r
          from-[#741522]
          via-[#851c28]
          to-[#5f111b]
          p-5
          shadow-lg
          sm:p-6
        "
      >

        {/* Decorative glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-[#e7c875]/15
            blur-2xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-10
            left-1/3
            h-28
            w-28
            rounded-full
            bg-white/5
            blur-2xl
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                flex
                h-12
                w-12
                flex-shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-[#e7c875]/40
                bg-white/10
                text-[#f5d98a]
                backdrop-blur-sm
                sm:h-14
                sm:w-14
              "
            >
              <MapPin className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                    text-[#e7c875]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#f5d98a]
                  "
                >
                  Delivery Details
                </span>

              </div>

              <h2
                className="
                  mt-1
                  font-serif
                  text-xl
                  font-semibold
                  text-white
                  sm:text-2xl
                "
              >
                My Address
              </h2>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/65
                  sm:text-xs
                "
              >
                Manage your preferred delivery address
              </p>

            </div>

          </div>


          {/* Add / Edit */}

          <motion.button
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={handleEditClick}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#e7c875]/40
              bg-[#fffdf8]
              px-4
              py-2.5
              text-xs
              font-bold
              text-[#741522]
              shadow-md
              transition-all
              duration-300
              hover:bg-[#f8f1e5]
              sm:px-5
            "
          >
            <Edit3 className="h-4 w-4" />

            {address
              ? "Edit Address"
              : "Add Address"}
          </motion.button>

        </div>
      </motion.div>


      {/* =====================================================
          ADDRESS CARD
      ===================================================== */}

      <AnimatePresence mode="wait">

        {loading ? (

          <motion.div
            key="loading"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              flex
              min-h-[360px]
              items-center
              justify-center
              rounded-3xl
              border
              border-[#d4ad54]/20
              bg-[#fffdf8]
              shadow-lg
            "
          >

            <div className="text-center">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-[#ead9b7]
                  border-t-[#741522]
                "
              >
                <MapPin className="h-5 w-5 text-[#741522]" />
              </motion.div>

              <p
                className="
                  mt-4
                  text-sm
                  font-medium
                  text-[#806c63]
                "
              >
                Loading your address...
              </p>

            </div>

          </motion.div>

        ) : address ? (

          <motion.div
            key="address"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[#d4ad54]/25
              bg-[#fffdf8]
              p-4
              shadow-[0_20px_60px_rgba(63,22,22,0.07)]
              sm:p-6
              lg:p-7
            "
          >

            {/* Top decorative line */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-1
                bg-gradient-to-r
                from-[#741522]
                via-[#d4ad54]
                to-[#741522]
              "
            />

            {/* Card header */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#f3e8d2]
                    text-[#741522]
                  "
                >
                  <Home className="h-5 w-5" />
                </div>

                <div>

                  <h3
                    className="
                      text-base
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    Delivery Address
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-[#9b806d]
                    "
                  >
                    Your saved shipping destination
                  </p>

                </div>

              </div>


              {/* Default */}

              <span
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-[#d4ad54]/40
                  bg-[#f3e8d2]
                  px-3
                  py-1.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#741522]
                "
              >
                <CheckCircle className="h-3.5 w-3.5 text-[#b88732]" />

                Default Address
              </span>

            </div>


            {/* Name */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              className="
                mb-5
                rounded-2xl
                border
                border-[#d4ad54]/15
                bg-[#faf6ee]
                p-4
                transition-all
                duration-300
                hover:border-[#d4ad54]/35
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    text-[#f5d98a]
                    shadow-md
                  "
                >
                  <User className="h-5 w-5" />
                </div>

                <div>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#9b806d]
                    "
                  >
                    Recipient
                  </p>

                  <p
                    className="
                      mt-1
                      text-base
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    {address.FullName}
                  </p>

                </div>

              </div>

            </motion.div>


            {/* Address + Phone */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              {/* Address */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-[#d4ad54]/15
                  bg-[#faf6ee]
                  p-4
                  transition-all
                  duration-300
                  hover:border-[#d4ad54]/35
                  hover:shadow-sm
                "
              >

                <div className="mb-3 flex items-center gap-2">

                  <MapPin
                    className="
                      h-5
                      w-5
                      text-[#741522]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#741522]
                    "
                  >
                    Address
                  </span>

                </div>

                <p
                  className="
                    text-sm
                    leading-6
                    text-[#5f5048]
                  "
                >
                  {address.Add}
                  <br />

                  {address.VillorCity},{" "}
                  {address.Dist}

                  <br />

                  {address.State} -{" "}
                  <span className="font-bold text-[#741522]">
                    {address.Pin}
                  </span>
                </p>

              </motion.div>


              {/* Phone */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-[#d4ad54]/15
                  bg-[#faf6ee]
                  p-4
                  transition-all
                  duration-300
                  hover:border-[#d4ad54]/35
                  hover:shadow-sm
                "
              >

                <div className="mb-3 flex items-center gap-2">

                  <Phone
                    className="
                      h-5
                      w-5
                      text-[#741522]
                    "
                  />

                  <span
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#741522]
                    "
                  >
                    Contact Number
                  </span>

                </div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#4a1815]
                  "
                >
                  {address.Phone}
                </p>

                <div
                  className="
                    mt-3
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    text-[#7b704e]
                  "
                >
                  <ShieldCheck
                    className="
                      h-3.5
                      w-3.5
                      text-[#b88732]
                    "
                  />

                  Used for delivery updates

                </div>

              </motion.div>

            </div>


            {/* Edit button */}

            <motion.button
              whileHover={{
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={handleEditClick}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#741522]/20
                bg-[#fffdf8]
                py-3
                text-sm
                font-semibold
                text-[#741522]
                shadow-sm
                transition-all
                duration-300
                hover:bg-[#f8f1e5]
                hover:shadow-md
              "
            >

              <Edit3 className="h-4 w-4" />

              Edit Delivery Address

            </motion.button>

          </motion.div>

        ) : (

          /* ===================================================
             EMPTY ADDRESS
          =================================================== */

          <motion.div
            key="empty"
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[#d4ad54]/25
              bg-[#fffdf8]
              px-5
              py-12
              text-center
              shadow-lg
              sm:py-16
            "
          >

            {/* Decorative background */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-48
                w-48
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#d4ad54]/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  mx-auto
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d4ad54]/40
                  bg-[#f3e8d2]
                  text-[#741522]
                  shadow-lg
                  sm:h-24
                  sm:w-24
                "
              >
                <MapPin className="h-9 w-9 sm:h-11 sm:w-11" />
              </motion.div>


              <h3
                className="
                  mt-6
                  font-serif
                  text-xl
                  font-bold
                  text-[#4a1815]
                  sm:text-2xl
                "
              >
                No Address Saved
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-xs
                  leading-5
                  text-[#806c63]
                  sm:text-sm
                "
              >
                Add your delivery address to make your
                Darsh shopping experience faster and easier.
              </p>


              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={handleEditClick}
                className="
                  mt-6
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#741522]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-[#fffdf8]
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-[#5f111b]
                  hover:shadow-xl
                "
              >
                <MapPin className="h-4 w-4" />

                Add New Address

              </motion.button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      <AnimatePresence>

        {error && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              font-medium
              text-red-700
            "
          >
            {error}
          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
          TRUST FOOTER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-[#d4ad54]/20
          bg-gradient-to-r
          from-[#faf3e5]
          via-[#fffdf8]
          to-[#faf3e5]
          p-4
          text-center
          sm:flex-row
        "
      >

        <ShieldCheck
          className="
            h-4
            w-4
            text-[#b88732]
          "
        />

        <p
          className="
            text-[10px]
            font-medium
            text-[#806c63]
            sm:text-xs
          "
        >
          Your delivery information is securely
          stored for a smooth Darsh shopping experience.
        </p>

      </motion.div>


      {/* =====================================================
          SUCCESS SCREEN
      ===================================================== */}

      <AnimatePresence>

        {showSuccessMessage && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[#3a1015]/70
              p-4
              backdrop-blur-md
            "
          >

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 16,
              }}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                border-[#d4ad54]/40
                bg-[#fffdf8]
                p-7
                text-center
                shadow-2xl
                sm:p-10
              "
            >

              {/* Gold glow */}

              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  h-32
                  w-32
                  -translate-x-1/2
                  rounded-full
                  bg-[#d4ad54]/20
                  blur-3xl
                "
              />

              <div className="relative z-10">

                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.15,
                    type: "spring",
                    stiffness: 220,
                  }}
                  className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    text-[#f5d98a]
                    shadow-xl
                  "
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>


                <h2
                  className="
                    mt-6
                    font-serif
                    text-2xl
                    font-bold
                    text-[#4a1815]
                    sm:text-3xl
                  "
                >
                  Address Saved!
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#806c63]
                  "
                >
                  Your delivery address has been
                  successfully updated.
                </p>


                <div
                  className="
                    mx-auto
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <span className="h-px w-10 bg-[#d4ad54]" />

                  <Sparkles
                    className="
                      h-4
                      w-4
                      text-[#b88732]
                    "
                  />

                  <span className="h-px w-10 bg-[#d4ad54]" />

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =====================================================
    PREMIUM ADDRESS MODAL
===================================================== */}

<AnimatePresence>
  {showPopup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-end
        justify-center
        bg-[#2b0d10]/70
        p-0
        backdrop-blur-md
        sm:items-center
        sm:p-4
        lg:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setShowPopup(false);
        }
      }}
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.22, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-24
          top-1/4
          h-72
          w-72
          rounded-full
          bg-[#d4ad54]/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-1/4
          h-80
          w-80
          rounded-full
          bg-[#741522]/30
          blur-3xl
        "
      />

      {/* =================================================
          MODAL
      ================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 35,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          y: 25,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.8,
        }}
        onMouseDown={(event) => event.stopPropagation()}
        className="
          relative
          z-10
          flex
          h-[94dvh]
          w-full
          flex-col
          overflow-hidden
          rounded-t-[30px]
          border
          border-[#d4ad54]/35
          bg-[#fffdf8]
          shadow-[0_30px_100px_rgba(40,10,15,0.35)]
          sm:h-auto
          sm:max-h-[92dvh]
          sm:max-w-xl
          sm:rounded-[30px]
          lg:max-w-2xl
        "
      >

        {/* =================================================
            TOP GOLD ACCENT
        ================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-30
            h-1.5
            bg-gradient-to-r
            from-[#5f111b]
            via-[#d4ad54]
            to-[#5f111b]
          "
        />

        {/* =================================================
            MOBILE HANDLE
        ================================================== */}

        <div className="flex shrink-0 justify-center pt-3 sm:hidden">
          <span
            className="
              h-1
              w-12
              rounded-full
              bg-[#d4c2a7]
            "
          />
        </div>

        {/* =================================================
            PREMIUM HEADER
        ================================================== */}

        <div
          className="
            relative
            shrink-0
            overflow-hidden
            bg-gradient-to-br
            from-[#741522]
            via-[#861d29]
            to-[#5f111b]
            px-5
            pb-6
            pt-5
            sm:px-7
            sm:pb-7
            sm:pt-6
          "
        >

          {/* Header glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-[#d4ad54]/15
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              left-1/3
              h-40
              w-40
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          {/* Close */}

          <button
            type="button"
            onClick={() => setShowPopup(false)}
            aria-label="Close address dialog"
            className="
              absolute
              right-4
              top-5
              z-20
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/10
              text-white/80
              backdrop-blur-sm
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-white/20
              hover:text-white
              active:scale-90
              sm:right-6
              sm:top-6
            "
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Darsh branding */}

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="
                mb-4
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-[#f5d98a]" />

              <span
                className="
                  font-serif
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.32em]
                  text-[#f5d98a]
                "
              >
                Darsh
              </span>

              <Sparkles className="h-3.5 w-3.5 text-[#f5d98a]" />
            </motion.div>

            {/* Animated address icon */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.65,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 15,
                delay: 0.12,
              }}
              className="relative mb-5"
            >

              {/* Pulse ring */}

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.35, 0.08, 0.35],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -inset-4
                  rounded-full
                  border
                  border-[#d4ad54]
                "
              />

              {/* Icon */}

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d4ad54]/50
                  bg-gradient-to-br
                  from-[#8a202c]
                  via-[#741522]
                  to-[#5f111b]
                  shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                  sm:h-24
                  sm:w-24
                "
              >
                <MapPin
                  className="
                    h-9
                    w-9
                    text-[#f5d98a]
                    sm:h-10
                    sm:w-10
                  "
                />
              </div>

              {/* Gold dot */}

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  -right-1
                  top-1
                  h-3
                  w-3
                  rounded-full
                  bg-[#d4ad54]
                  shadow-lg
                "
              />

            </motion.div>

            {/* Title */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
              }}
            >

              <h3
                id="address-modal-title"
                className="
                  font-serif
                  text-2xl
                  font-bold
                  text-white
                  sm:text-3xl
                "
              >
                {address ? "Edit Your Address" : "Add Your Address"}
              </h3>

              <div
                className="
                  mx-auto
                  mt-3
                  h-0.5
                  w-14
                  rounded-full
                  bg-gradient-to-r
                  from-[#741522]
                  via-[#d4ad54]
                  to-[#741522]
                "
              />

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-md
                  text-[11px]
                  leading-5
                  text-white/65
                  sm:text-xs
                "
              >
                Enter your delivery details carefully
                for a smooth Darsh shopping experience.
              </p>

            </motion.div>

          </div>
        </div>

        {/* =================================================
            SCROLLABLE CONTENT
        ================================================== */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            overscroll-contain
            bg-[#fffdf8]
            px-4
            py-5
            [scrollbar-color:#c7ad87_transparent]
            [scrollbar-width:thin]
            sm:px-7
            sm:py-6
          "
        >

          <form
            id="address-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================================
                SECURITY / INFO CARD
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.18 }}
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#d4ad54]/20
                bg-gradient-to-r
                from-[#faf3e5]
                to-[#fffdf8]
                p-4
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#741522]
                  text-[#f5d98a]
                  shadow-sm
                "
              >
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    text-[#4a1815]
                  "
                >
                  Your information is protected
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    leading-5
                    text-[#806c63]
                  "
                >
                  We use your address only to process
                  and deliver your Darsh orders.
                </p>
              </div>

            </motion.div>

            {/* =================================================
                SECTION 1
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.22 }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/15
                bg-white
                p-4
                shadow-[0_8px_30px_rgba(63,22,22,0.04)]
                sm:p-5
              "
            >

              {/* Section title */}

              <div className="mb-4 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                  "
                >
                  1
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#b88732]
                    "
                  >
                    Personal details
                  </p>

                  <h4
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    Who should receive the order?
                  </h4>
                </div>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >

                {fields
                  .filter((field) =>
                    ["FullName", "Phone"].includes(field.name)
                  )
                  .map((field) => {
                    const Icon = field.icon;

                    const hasError = Boolean(
                      validationErrors[field.name]
                    );

                    return (
                      <motion.div
                        key={field.name}
                        layout
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >

                        <label
                          className="
                            mb-1.5
                            block
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#806c63]
                          "
                        >
                          {field.label}
                        </label>

                        <div className="relative">

                          <Icon
                            className={`
                              absolute
                              left-3
                              top-1/2
                              z-10
                              h-4
                              w-4
                              -translate-y-1/2
                              ${
                                hasError
                                  ? "text-red-500"
                                  : "text-[#a48455]"
                              }
                            `}
                          />

                          <input
                            type={
                              field.name === "Phone"
                                ? "tel"
                                : "text"
                            }
                            inputMode={
                              field.name === "Phone"
                                ? "numeric"
                                : "text"
                            }
                            autoComplete={
                              field.name === "FullName"
                                ? "name"
                                : "tel"
                            }
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className={`
                              w-full
                              rounded-xl
                              border
                              bg-[#faf6ee]
                              py-3
                              pl-10
                              pr-4
                              text-sm
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a59b]
                              focus:bg-white
                              ${
                                hasError
                                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                  : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                              }
                            `}
                          />

                        </div>

                        {hasError && (
                          <motion.p
                            initial={{
                              opacity: 0,
                              y: -3,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            className="
                              mt-1
                              text-[10px]
                              font-medium
                              text-red-500
                            "
                          >
                            {validationErrors[field.name]}
                          </motion.p>
                        )}

                      </motion.div>
                    );
                  })}

              </div>
            </motion.div>

            {/* =================================================
                SECTION 2
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.26 }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/15
                bg-white
                p-4
                shadow-[0_8px_30px_rgba(63,22,22,0.04)]
                sm:p-5
              "
            >

              <div className="mb-4 flex items-center gap-3">

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                  "
                >
                  2
                </div>

                <div>
                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#b88732]
                    "
                  >
                    Delivery location
                  </p>

                  <h4
                    className="
                      mt-0.5
                      text-sm
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    Where should we deliver?
                  </h4>
                </div>

              </div>

              <div className="space-y-4">

                {/* Street address */}

                {fields
                  .filter((field) => field.name === "Add")
                  .map((field) => {
                    const Icon = field.icon;

                    const hasError = Boolean(
                      validationErrors[field.name]
                    );

                    return (
                      <div key={field.name}>

                        <label
                          className="
                            mb-1.5
                            block
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#806c63]
                          "
                        >
                          {field.label}
                        </label>

                        <div className="relative">

                          <Icon
                            className={`
                              absolute
                              left-3
                              top-4
                              h-4
                              w-4
                              ${
                                hasError
                                  ? "text-red-500"
                                  : "text-[#a48455]"
                              }
                            `}
                          />

                          <textarea
                            name={field.name}
                            rows={3}
                            autoComplete="street-address"
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className={`
                              w-full
                              resize-none
                              rounded-xl
                              border
                              bg-[#faf6ee]
                              py-3
                              pl-10
                              pr-4
                              text-sm
                              leading-5
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a59b]
                              focus:bg-white
                              ${
                                hasError
                                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                  : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                              }
                            `}
                          />

                        </div>

                        {hasError && (
                          <p
                            className="
                              mt-1
                              text-[10px]
                              font-medium
                              text-red-500
                            "
                          >
                            {validationErrors[field.name]}
                          </p>
                        )}

                      </div>
                    );
                  })}

                {/* City / District */}

                <div
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                  "
                >

                  {fields
                    .filter((field) =>
                      ["VillorCity", "Dist"].includes(field.name)
                    )
                    .map((field) => {
                      const Icon = field.icon;

                      const hasError = Boolean(
                        validationErrors[field.name]
                      );

                      return (
                        <div key={field.name}>

                          <label
                            className="
                              mb-1.5
                              block
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-[#806c63]
                            "
                          >
                            {field.label}
                          </label>

                          <div className="relative">

                            <Icon
                              className={`
                                absolute
                                left-3
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                ${
                                  hasError
                                    ? "text-red-500"
                                    : "text-[#a48455]"
                                }
                              `}
                            />

                            <input
                              type="text"
                              name={field.name}
                              autoComplete="address-level2"
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                              className={`
                                w-full
                                rounded-xl
                                border
                                bg-[#faf6ee]
                                py-3
                                pl-10
                                pr-4
                                text-sm
                                text-[#4a1815]
                                outline-none
                                transition-all
                                duration-300
                                placeholder:text-[#b5a59b]
                                focus:bg-white
                                ${
                                  hasError
                                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                    : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                                }
                              `}
                            />

                          </div>

                          {hasError && (
                            <p
                              className="
                                mt-1
                                text-[10px]
                                font-medium
                                text-red-500
                              "
                            >
                              {validationErrors[field.name]}
                            </p>
                          )}

                        </div>
                      );
                    })}

                </div>

                {/* PIN */}

                {fields
                  .filter((field) => field.name === "Pin")
                  .map((field) => {
                    const Icon = field.icon;

                    const hasError = Boolean(
                      validationErrors[field.name]
                    );

                    return (
                      <div key={field.name}>

                        <label
                          className="
                            mb-1.5
                            block
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#806c63]
                          "
                        >
                          {field.label}
                        </label>

                        <div className="relative">

                          <Icon
                            className={`
                              absolute
                              left-3
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              ${
                                hasError
                                  ? "text-red-500"
                                  : "text-[#a48455]"
                              }
                            `}
                          />

                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="postal-code"
                            name="Pin"
                            maxLength={6}
                            placeholder={field.placeholder}
                            value={formData.Pin}
                            onChange={(event) => {
                              const value =
                                event.target.value.replace(
                                  /\D/g,
                                  ""
                                );

                              setFormData((prev) => ({
                                ...prev,
                                Pin: value,
                              }));

                              if (validationErrors.Pin) {
                                setValidationErrors((prev) => ({
                                  ...prev,
                                  Pin: "",
                                }));
                              }
                            }}
                            className={`
                              w-full
                              rounded-xl
                              border
                              bg-[#faf6ee]
                              py-3
                              pl-10
                              pr-4
                              text-sm
                              tracking-wider
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a59b]
                              focus:bg-white
                              ${
                                hasError
                                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                  : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                              }
                            `}
                          />

                        </div>

                        {hasError && (
                          <p
                            className="
                              mt-1
                              text-[10px]
                              font-medium
                              text-red-500
                            "
                          >
                            {validationErrors.Pin}
                          </p>
                        )}

                      </div>
                    );
                  })}

                {/* State */}

                <div>

                  <label
                    className="
                      mb-1.5
                      block
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#806c63]
                    "
                  >
                    State
                  </label>

                  <div className="relative">

                    <Globe
                      className={`
                        absolute
                        left-3
                        top-1/2
                        z-10
                        h-4
                        w-4
                        -translate-y-1/2
                        ${
                          validationErrors.State
                            ? "text-red-500"
                            : "text-[#a48455]"
                        }
                      `}
                    />

                    <select
                      name="State"
                      value={formData.State}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          State: e.target.value,
                          customState:
                            e.target.value === "Other"
                              ? prev.customState
                              : "",
                        }));

                        setValidationErrors((prev) => ({
                          ...prev,
                          State: "",
                          customState: "",
                        }));
                      }}
                      className={`
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        bg-[#faf6ee]
                        py-3
                        pl-10
                        pr-10
                        text-sm
                        text-[#4a1815]
                        outline-none
                        transition-all
                        duration-300
                        focus:bg-white
                        ${
                          validationErrors.State
                            ? "border-red-400 focus:ring-2 focus:ring-red-100"
                            : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                        }
                      `}
                    >
                      <option
                        value="Select State"
                        disabled
                      >
                        Select State
                      </option>

                      {predefinedStates.map((state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      ))}

                      <option value="Other">
                        Other State
                      </option>
                    </select>

                    <span
                      className="
                        pointer-events-none
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-[#8e6c48]
                      "
                    >
                      ▾
                    </span>

                  </div>

                  {validationErrors.State && (
                    <p
                      className="
                        mt-1
                        text-[10px]
                        font-medium
                        text-red-500
                      "
                    >
                      {validationErrors.State}
                    </p>
                  )}

                  <AnimatePresence>
                    {formData.State === "Other" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="mt-3 overflow-hidden"
                      >

                        <div className="relative">

                          <Globe
                            className={`
                              absolute
                              left-3
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              ${
                                validationErrors.customState
                                  ? "text-red-500"
                                  : "text-[#a48455]"
                              }
                            `}
                          />

                          <input
                            type="text"
                            name="customState"
                            autoComplete="address-level1"
                            placeholder="Enter your state"
                            value={formData.customState}
                            onChange={handleChange}
                            className={`
                              w-full
                              rounded-xl
                              border
                              bg-[#faf6ee]
                              py-3
                              pl-10
                              pr-4
                              text-sm
                              text-[#4a1815]
                              outline-none
                              transition-all
                              duration-300
                              placeholder:text-[#b5a59b]
                              focus:bg-white
                              ${
                                validationErrors.customState
                                  ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                  : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-2 focus:ring-[#d4ad54]/15"
                              }
                            `}
                          />

                        </div>

                        {validationErrors.customState && (
                          <p
                            className="
                              mt-1
                              text-[10px]
                              font-medium
                              text-red-500
                            "
                          >
                            {validationErrors.customState}
                          </p>
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </div>

            </motion.div>

            {/* =================================================
                API ERROR
            ================================================== */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  className="
                    flex
                    items-start
                    gap-2
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-3
                    text-xs
                    font-medium
                    leading-5
                    text-red-700
                  "
                >
                  <span className="font-bold">!</span>

                  <span>
                    {error}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-1 sm:hidden" />

          </form>
        </div>

        {/* =================================================
            STICKY FOOTER
        ================================================== */}

        <div
          className="
            shrink-0
            border-t
            border-[#d4ad54]/20
            bg-[#fffdf8]/95
            px-4
            py-3
            shadow-[0_-8px_25px_rgba(63,22,22,0.06)]
            backdrop-blur-md
            sm:px-7
            sm:py-4
          "
        >

          {/* Security */}

          <div
            className="
              mb-3
              flex
              items-center
              justify-center
              gap-2
              text-[9px]
              text-[#8b786d]
              sm:justify-start
            "
          >
            <ShieldCheck
              className="
                h-3.5
                w-3.5
                text-[#b88732]
              "
            />

            <span>
              Your delivery information is securely protected.
            </span>
          </div>

          {/* Buttons */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {/* Cancel */}

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="button"
              onClick={() => setShowPopup(false)}
              className="
                flex
                min-h-[48px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#d4ad54]/30
                bg-white
                px-4
                text-xs
                font-bold
                text-[#741522]
                shadow-sm
                transition-all
                duration-300
                hover:bg-[#faf3e5]
                hover:shadow-md
              "
            >
              <X className="h-4 w-4" />

              Cancel
            </motion.button>

            {/* Save */}

            <motion.button
              whileHover={{
                scale: 1.02,
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              form="address-form"
              disabled={loading}
              className="
                group
                flex
                min-h-[48px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#741522]
                to-[#5f111b]
                px-4
                text-xs
                font-bold
                text-white
                shadow-lg
                shadow-[#741522]/20
                transition-all
                duration-300
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-60
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

                  Saving...
                </>
              ) : (
                <>
                  <Save
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                  {address
                    ? "Update Address"
                    : "Save Address"}
                </>
              )}

            </motion.button>

          </div>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
};

export default AddressInfo;