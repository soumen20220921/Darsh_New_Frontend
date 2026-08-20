import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleCheck,
  Edit3,
  Globe2,
  Home,
  Info,
  LockKeyhole,
  Map,
  MapPin,
  MapPinned,
  Navigation,
  PackageCheck,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const INITIAL_FORM = {
  FullName: "",
  Add: "",
  VillorCity: "",
  Dist: "",
  State: "",
  customState: "",
  Pin: "",
  Phone: "",
};

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const STEPS = [
  {
    id: 1,
    title: "Recipient",
    subtitle: "Name & mobile",
    icon: User,
  },
  {
    id: 2,
    title: "Location",
    subtitle: "Address & PIN",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Review",
    subtitle: "Confirm details",
    icon: CircleCheck,
  },
];

const safeString = (value) =>
  value === undefined || value === null ? "" : String(value);

const getSavedAddressObject = (value) => {
  if (!value) return {};

  return (
    value?.data?.address ||
    value?.data?.data ||
    value?.data ||
    value?.address ||
    value?.result ||
    value
  );
};

const normalizeAddress = (savedAddress) => {
  const source = getSavedAddressObject(savedAddress);

  const rawState = safeString(
    source.State ?? source.state ?? ""
  );

  const knownState = INDIAN_STATES.includes(rawState);

  return {
    FullName: safeString(
      source.FullName ??
        source.fullName ??
        source.name ??
        ""
    ),
    Add: safeString(
      source.Add ??
        source.add ??
        source.address ??
        ""
    ),
    VillorCity: safeString(
      source.VillorCity ??
        source.VillageCity ??
        source.villorCity ??
        source.city ??
        ""
    ),
    Dist: safeString(
      source.Dist ??
        source.district ??
        ""
    ),
    State: knownState || !rawState ? rawState : "Other",
    customState: knownState ? "" : rawState,
    Pin: safeString(
      source.Pin ??
        source.pin ??
        ""
    ),
    Phone: safeString(
      source.Phone ??
        source.phone ??
        ""
    ).replace(/\D/g, "").slice(0, 10),
  };
};

const inputBase =
  "h-[52px] w-full rounded-2xl border bg-[#fcf8f1] px-4 text-sm font-medium text-[#4a1815] outline-none transition duration-200 placeholder:text-[#b5a79c] focus:bg-white";

const fieldClass = (hasError) =>
  `${inputBase} ${
    hasError
      ? "border-red-400 ring-4 ring-red-100"
      : "border-[#d4ad54]/20 focus:border-[#741522] focus:ring-4 focus:ring-[#741522]/5"
  }`;

const FieldError = memo(function FieldError({ message }) {
  if (!message) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-red-500"
    >
      <Info className="h-3 w-3" />
      {message}
    </motion.p>
  );
});

const TextField = memo(function TextField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#806c63]"
      >
        {label}
        <span className="ml-1 text-[#741522]">*</span>
      </label>

      <div className="relative">
        <Icon
          className={`absolute left-3.5 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 ${
            error ? "text-red-500" : "text-[#a48455]"
          }`}
        />

        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          spellCheck={false}
          className={`${fieldClass(error)} pl-11`}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
});

const PhoneField = memo(function PhoneField({
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor="Phone"
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#806c63]"
      >
        Mobile Number
        <span className="ml-1 text-[#741522]">*</span>
      </label>

      <div className="relative">
        <Phone
          className={`absolute left-3.5 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 ${
            error ? "text-red-500" : "text-[#a48455]"
          }`}
        />

        <span className="absolute left-11 top-1/2 z-10 -translate-y-1/2 text-sm font-bold text-[#806c63]">
          +91
        </span>

        <input
          id="Phone"
          name="Phone"
          type="tel"
          value={value}
          onChange={onChange}
          placeholder="10 digit mobile number"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
          spellCheck={false}
          className={`${fieldClass(error)} pl-[4.8rem] tracking-wide`}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
});

const AddressField = memo(function AddressField({
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor="Add"
          className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#806c63]"
        >
          Complete Address
          <span className="ml-1 text-[#741522]">*</span>
        </label>

        <span className="text-[10px] text-[#a99a8f]">
          {value.length}/180
        </span>
      </div>

      <div className="relative">
        <Map
          className={`absolute left-3.5 top-4 h-[18px] w-[18px] ${
            error ? "text-red-500" : "text-[#a48455]"
          }`}
        />

        <textarea
          id="Add"
          name="Add"
          value={value}
          onChange={onChange}
          maxLength={180}
          rows={4}
          placeholder="House / Flat No., Street, Locality, Landmark"
          autoComplete="street-address"
          spellCheck={false}
          className={`${fieldClass(error)} min-h-[120px] resize-none py-3.5 pl-11 leading-6`}
        />
      </div>

      <p className="mt-1.5 text-[10px] text-[#9d8e83]">
        Add a nearby landmark when possible.
      </p>

      <FieldError message={error} />
    </div>
  );
});

const PinField = memo(function PinField({
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor="Pin"
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#806c63]"
      >
        PIN Code
        <span className="ml-1 text-[#741522]">*</span>
      </label>

      <div className="relative">
        <Navigation
          className={`absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${
            error ? "text-red-500" : "text-[#a48455]"
          }`}
        />

        <input
          id="Pin"
          name="Pin"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="6 digit PIN"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          spellCheck={false}
          className={`${fieldClass(error)} pl-11 font-bold tracking-[0.18em]`}
        />
      </div>

      <FieldError message={error} />
    </div>
  );
});

const StateField = memo(function StateField({
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <label
        htmlFor="State"
        className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[#806c63]"
      >
        State
        <span className="ml-1 text-[#741522]">*</span>
      </label>

      <div className="relative">
        <Globe2
          className={`pointer-events-none absolute left-3.5 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 ${
            error ? "text-red-500" : "text-[#a48455]"
          }`}
        />

        <select
          id="State"
          name="State"
          value={value}
          onChange={onChange}
          autoComplete="address-level1"
          className={`${fieldClass(error)} appearance-none pl-11 pr-11 ${
            value ? "text-[#4a1815]" : "text-[#b5a79c]"
          }`}
        >
          <option value="" disabled>
            Select state
          </option>

          {INDIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}

          <option value="Other">Other State</option>
        </select>

        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806c63]" />
      </div>

      <FieldError message={error} />
    </div>
  );
});

const LivePreview = memo(function LivePreview({ formData }) {
  const previewState =
    formData.State === "Other"
      ? formData.customState
      : formData.State;

  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#f5d98a]">
            Live Preview
          </p>
          <p className="mt-1 text-sm font-bold text-white">
            Delivery destination
          </p>
        </div>
        <MapPinned className="h-5 w-5 text-[#f5d98a]" />
      </div>

      <div className="rounded-2xl bg-black/10 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4ad54] text-[#741522]">
            <User className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-wider text-white/40">
              Recipient
            </p>
            <p className="mt-1 truncate text-sm font-bold text-white">
              {formData.FullName || "Your name"}
            </p>
          </div>
        </div>

        <div className="my-4 h-px bg-white/10" />

        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f5d98a]" />

          <p className="text-xs leading-5 text-white/70">
            {formData.Add || "House / street / locality"}
            <br />
            {formData.VillorCity || "Village / city"}
            {formData.Dist ? `, ${formData.Dist}` : ""}
            <br />
            {previewState || "State"}
            {formData.Pin ? ` - ${formData.Pin}` : ""}
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-white/5 px-3 py-2.5">
          <p className="text-[10px] text-white/50">Mobile</p>
          <p className="mt-1 text-xs font-semibold text-white/80">
            {formData.Phone
              ? `+91 ${formData.Phone}`
              : "Not entered"}
          </p>
        </div>
      </div>
    </div>
  );
});

const ReviewCard = memo(function ReviewCard({
  formData,
  onEditRecipient,
  onEditLocation,
}) {
  const state =
    formData.State === "Other"
      ? formData.customState
      : formData.State;

  return (
    <div className="space-y-4">
      <div className="rounded-[26px] border border-[#d4ad54]/15 bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f5d98a]">
            <User className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#9b806d]">
                Recipient
              </p>

              <button
                type="button"
                onClick={onEditRecipient}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-[#741522] transition hover:bg-[#faf3e5]"
              >
                <Edit3 className="h-3 w-3" />
                Edit
              </button>
            </div>

            <p className="mt-1 break-words text-sm font-bold text-[#4a1815]">
              {formData.FullName || "—"}
            </p>

            <p className="mt-1 text-xs text-[#806c63]">
              {formData.Phone
                ? `+91 ${formData.Phone}`
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[26px] border border-[#d4ad54]/15 bg-white p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3e8d2] text-[#741522]">
            <MapPin className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#9b806d]">
                Delivery location
              </p>

              <button
                type="button"
                onClick={onEditLocation}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-[#741522] transition hover:bg-[#faf3e5]"
              >
                <Edit3 className="h-3 w-3" />
                Edit
              </button>
            </div>

            <p className="mt-1 break-words text-sm font-bold text-[#4a1815]">
              {formData.VillorCity || "—"}
              {formData.Dist ? `, ${formData.Dist}` : ""}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-[#faf6ee] p-4">
          <p className="break-words text-sm leading-6 text-[#5f5048]">
            {formData.Add || "—"}
            <br />
            {formData.VillorCity || "—"}
            {formData.Dist ? `, ${formData.Dist}` : ""}
            <br />
            {state || "—"}
            {formData.Pin ? ` - ${formData.Pin}` : ""}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-[#b8d9c0] bg-[#f1faf3] p-4">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2d7a45]" />

        <div>
          <p className="text-xs font-bold text-[#356445]">
            Ready to save
          </p>
          <p className="mt-1 text-[10px] leading-4 text-[#527761]">
            Everything looks complete. Save the address to use it during checkout.
          </p>
        </div>
      </div>
    </div>
  );
});

const StepButton = memo(function StepButton({
  step,
  activeStep,
  onClick,
  mobile = false,
}) {
  const completed = activeStep > step.id;
  const current = activeStep === step.id;
  const Icon = step.icon;

  if (mobile) {
    return (
      <button
        type="button"
        disabled={step.id > activeStep}
        onClick={() =>
          step.id < activeStep && onClick(step.id)
        }
        className={`min-h-[44px] rounded-xl px-2 text-[10px] font-bold transition ${
          current
            ? "bg-[#741522] text-white"
            : completed
              ? "bg-[#f3e8d2] text-[#741522]"
              : "bg-[#f5efe6] text-[#aa9a8d]"
        }`}
      >
        {completed && (
          <Check className="mr-1 inline h-3 w-3" />
        )}
        {step.title}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={step.id > activeStep}
      onClick={() =>
        step.id < activeStep && onClick(step.id)
      }
      className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
        current ? "bg-white/10" : "hover:bg-white/5"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          current || completed
            ? "bg-[#d4ad54] text-[#741522]"
            : "border border-white/10 bg-white/5 text-white/40"
        }`}
      >
        {completed ? (
          <Check className="h-4 w-4" />
        ) : (
          <Icon className="h-4 w-4" />
        )}
      </div>

      <div>
        <p
          className={`text-xs font-bold ${
            current || completed
              ? "text-white"
              : "text-white/45"
          }`}
        >
          {step.id}. {step.title}
        </p>

        <p className="mt-0.5 text-[10px] text-white/40">
          {step.subtitle}
        </p>
      </div>
    </button>
  );
});

const AddressInfo = () => {
  const {
    address,
    setAddress,
    error,
    setError,
    loading,
    setLoading,
    url,
  } = useAppContext();

  const [showPopup, setShowPopup] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveCountdown, setSaveCountdown] = useState(0);

  const formScrollRef = useRef(null);
  const successTimerRef = useRef(null);
  const saveDelayTimerRef = useRef(null);
  const saveCountdownTimerRef = useRef(null);
  const previousBodyOverflowRef = useRef("");
  const previousBodyPaddingRef = useRef("");

  const completion = useMemo(() => {
    const fields = [
      formData.FullName.trim(),
      formData.Phone.trim(),
      formData.Add.trim(),
      formData.VillorCity.trim(),
      formData.Dist.trim(),
      formData.Pin.trim(),
      formData.State,
      formData.State === "Other"
        ? formData.customState.trim()
        : true,
    ];

    return Math.round(
      (fields.filter(Boolean).length / fields.length) * 100
    );
  }, [formData]);

  const clearSuccessTimer = useCallback(() => {
    if (successTimerRef.current) {
      window.clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
  }, []);

  const scrollFormTop = useCallback((behavior = "smooth") => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const node = formScrollRef.current;
        if (!node) return;

        node.scrollTo({
          top: 0,
          behavior,
        });
      });
    });
  }, []);

  useEffect(() => {
    if (!showPopup) return undefined;

    scrollFormTop("auto");

    const timer = window.setTimeout(() => {
      scrollFormTop("smooth");
    }, 40);

    return () => window.clearTimeout(timer);
  }, [activeStep, showPopup, scrollFormTop]);

  const goToStep = useCallback(
    (step) => {
      setErrors({});
      setError(null);
      setActiveStep(step);
    },
    [setError]
  );

  const updateField = useCallback(
    (name, value) => {
      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));

      setErrors((previous) => {
        if (!previous[name]) return previous;

        const next = { ...previous };
        delete next[name];
        return next;
      });

      if (error) setError(null);
    },
    [error, setError]
  );

  const handleTextChange = useCallback(
    (event) => {
      updateField(
        event.target.name,
        event.target.value
      );
    },
    [updateField]
  );

  const handlePhoneChange = useCallback(
    (event) => {
      updateField(
        "Phone",
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 10)
      );
    },
    [updateField]
  );

  const handlePinChange = useCallback(
    (event) => {
      updateField(
        "Pin",
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 6)
      );
    },
    [updateField]
  );

  const handleStateChange = useCallback(
    (event) => {
      const value = event.target.value;

      setFormData((previous) => ({
        ...previous,
        State: value,
        customState:
          value === "Other"
            ? previous.customState
            : "",
      }));

      setErrors((previous) => {
        const next = { ...previous };
        delete next.State;

        if (value !== "Other") {
          delete next.customState;
        }

        return next;
      });

      if (error) setError(null);
    },
    [error, setError]
  );

  const resetToSaved = useCallback(() => {
    setFormData(
      address
        ? normalizeAddress(address)
        : { ...INITIAL_FORM }
    );
    setErrors({});
    setActiveStep(1);
    setError(null);
  }, [address, setError]);

  useEffect(() => {
    if (!address || showPopup) return;

    setFormData(normalizeAddress(address));
  }, [address, showPopup]);

  useEffect(() => {
    if (!showPopup) return undefined;

    previousBodyOverflowRef.current =
      document.body.style.overflow;
    previousBodyPaddingRef.current =
      document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSaving) {
        event.preventDefault();
        closeModal();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflowRef.current;
      document.body.style.paddingRight =
        previousBodyPaddingRef.current;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showPopup, isSaving]);

  useEffect(() => {
    return () => {
      clearSuccessTimer();
      if (saveDelayTimerRef.current) {
        window.clearTimeout(saveDelayTimerRef.current);
        saveDelayTimerRef.current = null;
      }
      if (saveCountdownTimerRef.current) {
        window.clearInterval(saveCountdownTimerRef.current);
        saveCountdownTimerRef.current = null;
      }
    };
  }, [clearSuccessTimer]);

  const openAddressModal = useCallback(() => {
    clearSuccessTimer();
    setError(null);
    setErrors({});
    setActiveStep(1);

    setFormData(
      address
        ? normalizeAddress(address)
        : { ...INITIAL_FORM }
    );

    setShowPopup(true);
  }, [address, clearSuccessTimer, setError]);

  function closeModal() {
    if (isSaving) return;

    setShowPopup(false);
    resetToSaved();
  }

  const validateRecipient = useCallback(() => {
    const next = {};
    const name = formData.FullName.trim();
    const phone = formData.Phone.trim();

    if (!name) {
      next.FullName = "Please enter the recipient name.";
    } else if (name.length < 3) {
      next.FullName =
        "Name should contain at least 3 characters.";
    }

    if (!phone) {
      next.Phone = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      next.Phone =
        "Mobile number must contain 10 digits.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      next.Phone =
        "Enter a valid Indian mobile number.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [formData.FullName, formData.Phone]);

  const validateLocation = useCallback(() => {
    const next = {};
    const addressLine = formData.Add.trim();
    const city = formData.VillorCity.trim();
    const district = formData.Dist.trim();
    const pin = formData.Pin.trim();

    if (!addressLine) {
      next.Add = "Complete address is required.";
    } else if (addressLine.length < 5) {
      next.Add =
        "Please enter a more complete address.";
    }

    if (!city) {
      next.VillorCity =
        "Village / city is required.";
    }

    if (!district) {
      next.Dist = "District is required.";
    }

    if (!pin) {
      next.Pin = "PIN code is required.";
    } else if (!/^\d{6}$/.test(pin)) {
      next.Pin = "PIN code must contain 6 digits.";
    }

    if (!formData.State) {
      next.State = "Please select a state.";
    }

    if (
      formData.State === "Other" &&
      !formData.customState.trim()
    ) {
      next.customState =
        "Please enter your state.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }, [
    formData.Add,
    formData.VillorCity,
    formData.Dist,
    formData.Pin,
    formData.State,
    formData.customState,
  ]);

  const handleNext = useCallback(() => {
    if (activeStep === 1) {
      if (validateRecipient()) {
        goToStep(2);
      }
      return;
    }

    if (activeStep === 2) {
      if (validateLocation()) {
        goToStep(3);
      }
    }
  }, [
    activeStep,
    validateRecipient,
    validateLocation,
    goToStep,
  ]);

  const handleBack = useCallback(() => {
    if (activeStep > 1) {
      goToStep(activeStep - 1);
    }
  }, [activeStep, goToStep]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) return;

    const recipientValid = validateRecipient();

    if (!recipientValid) {
      goToStep(1);
      return;
    }

    const locationValid = validateLocation();

    if (!locationValid) {
      goToStep(2);
      return;
    }

    // Keep the final Live Preview visible for 10 seconds before the
    // address is actually sent to the server. This gives the customer
    // a clear final confirmation window and prevents accidental saves.
    setIsSaving(true);
    // Keep the Live Preview visible during the 10-second confirmation hold.
    // The global loading state starts only when the API request begins.
    setLoading(false);
    setError(null);
    setErrors({});
    setSaveCountdown(10);

    if (saveDelayTimerRef.current) {
      window.clearTimeout(saveDelayTimerRef.current);
      saveDelayTimerRef.current = null;
    }

    let remaining = 10;
    saveCountdownTimerRef.current = window.setInterval(() => {
      remaining -= 1;
      setSaveCountdown(remaining);

      if (remaining <= 0) {
        window.clearInterval(saveCountdownTimerRef.current);
        saveCountdownTimerRef.current = null;
      }
    }, 1000);

    saveDelayTimerRef.current = window.setTimeout(async () => {
      saveDelayTimerRef.current = null;
      if (saveCountdownTimerRef.current) {
        window.clearInterval(saveCountdownTimerRef.current);
        saveCountdownTimerRef.current = null;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const stateToSave =
          formData.State === "Other"
            ? formData.customState.trim()
            : formData.State.trim();

        const payload = {
          FullName: formData.FullName.trim(),
          Add: formData.Add.trim(),
          VillorCity: formData.VillorCity.trim(),
          Dist: formData.Dist.trim(),
          State: stateToSave,
          Pin: formData.Pin.trim(),
          Phone: formData.Phone.trim(),
          userId,
        };

        const config = {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Auth: token } : {}),
          },
        };

        const response = address?._id
          ? await axios.put(
              `${url}/api/address/updateAddress/${address._id}`,
              payload,
              config
            )
          : await axios.post(
              `${url}/api/address/addaddress`,
              payload,
              config
            );

        if (response?.data?.success === false) {
          throw new Error(
            response?.data?.message || "Unable to save address."
          );
        }

        const savedAddress =
          response?.data?.address ||
          response?.data?.data?.address ||
          response?.data?.data ||
          response?.data?.result ||
          payload;

        setAddress(savedAddress);
        setFormData(normalizeAddress(savedAddress));
        setShowPopup(false);
        setActiveStep(1);
        setErrors({});
        setError(null);
        setSaveCountdown(0);

        setSuccessMessage(
          address
            ? "Address updated successfully."
            : "Address saved successfully."
        );

        clearSuccessTimer();

        successTimerRef.current = window.setTimeout(() => {
          setSuccessMessage("");
          successTimerRef.current = null;
        }, 3500);
      } catch (err) {
        console.error("Address save error:", err);

        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Unable to save your address. Please try again."
        );
        setSaveCountdown(0);
        setShowPopup(true);
      } finally {
        setIsSaving(false);
        setLoading(false);
      }
    }, 10000);
  };

  const currentState =
    formData.State === "Other"
      ? formData.customState
      : formData.State;

  return (
    <div className="w-full space-y-3">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#741522] via-[#861d29] to-[#5f111b] p-5 shadow-[0_18px_55px_rgba(63,22,22,0.12)] sm:p-7">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d4ad54]/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d4ad54]/30 bg-white/10 text-[#f5d98a]">
              <MapPin className="h-7 w-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-[#f5d98a]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#f5d98a]">
                  Delivery
                </span>
              </div>

              <h2 className="mt-1 font-serif text-2xl font-bold text-white">
                My Address
              </h2>

              <p className="mt-1 text-xs text-white/55">
                Manage your delivery information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {loading && !showPopup ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-[28px] border border-[#d4ad54]/15 bg-[#fffdf8]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="mx-auto h-12 w-12 rounded-full border-4 border-[#ead9b7] border-t-[#741522]"
            />
            <p className="mt-4 text-sm text-[#806c63]">
              Loading address...
            </p>
          </div>
        </div>
      ) : address ? (
        <div className="overflow-hidden  ">
          {/* <div className="h-1 bg-gradient-to-r from-[#741522] via-[#d4ad54] to-[#741522]" /> */}

          <div className="mt-2">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3e8d2] text-[#741522]">
                  <Home className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#b88732]">
                    Saved destination
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#4a1815]">
                    Delivery Address
                  </h3>
                </div>
              </div>

              <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#f3e8d2] px-3 py-1.5 text-[10px] font-bold text-[#741522]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Saved
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl bg-[#faf6ee] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f5d98a]">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#9b806d]">
                      Recipient
                    </p>
                    <p className="mt-1 text-base font-bold text-[#4a1815]">
                      {safeString(address.FullName) || "—"}
                    </p>
                  </div>
                </div>

                <div className="my-4 h-px bg-[#d4ad54]/15" />

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#741522]" />

                  <p className="text-sm leading-6 text-[#5f5048]">
                    {safeString(address.Add) || "—"}
                    <br />
                    {safeString(address.VillorCity) || "—"}
                    {address.Dist
                      ? `, ${address.Dist}`
                      : ""}
                    <br />
                    {safeString(address.State) || "—"}
                    {address.Pin
                      ? ` - ${address.Pin}`
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-3xl bg-[#faf6ee] p-5">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#741522]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#741522]">
                      Contact
                    </span>
                  </div>

                  <p className="mt-3 text-base font-bold text-[#4a1815]">
                    +91 {safeString(address.Phone) || "—"}
                  </p>

                  <p className="mt-2 text-[10px] text-[#806c63]">
                    Used for delivery communication.
                  </p>
                </div>

                <div className="flex flex-1 items-center gap-3 rounded-3xl bg-gradient-to-br from-[#741522] to-[#5f111b] p-5 text-white">
                  <Truck className="h-6 w-6 text-[#f5d98a]" />

                  <div>
                    <p className="text-xs font-bold">
                      Ready for delivery
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-white/55">
                      Your address can be reused during checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openAddressModal}
              className="mt-5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-2xl border border-[#741522]/15 bg-white text-sm font-bold text-[#741522] transition hover:bg-[#faf3e5]"
            >
              <Edit3 className="h-4 w-4" />
              Edit Delivery Address
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-[30px] border border-[#d4ad54]/20 bg-[#fffdf8] px-5 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#f3e8d2] text-[#741522]">
            <MapPin className="h-10 w-10" />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b88732]">
            Delivery setup
          </p>

          <h3 className="mt-2 font-serif text-2xl font-bold text-[#4a1815]">
            No Address Saved
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#806c63]">
            Add your delivery address once and make checkout faster.
          </p>

          <button
            type="button"
            onClick={openAddressModal}
            className="mt-7 inline-flex min-h-[50px] items-center gap-2 rounded-2xl bg-[#741522] px-6 text-sm font-bold text-white shadow-lg"
          >
            Add New Address
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && !showPopup && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: LockKeyhole,
            title: "Secure",
            text: "Your address is protected",
          },
          {
            icon: Truck,
            title: "Reliable",
            text: "Accurate delivery details",
          },
          {
            icon: PackageCheck,
            title: "Faster checkout",
            text: "Reuse saved address",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-[#d4ad54]/15 bg-[#fffdf8] p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3e8d2] text-[#741522]">
                <Icon className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#4a1815]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[10px] text-[#806c63]">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 20,
              x: "-50%",
            }}
            className="fixed bottom-5 left-1/2 z-[11000] w-[calc(100%-2rem)] max-w-sm"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-[#d4ad54]/30 bg-[#fffdf8] p-4 shadow-2xl">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f5d98a]">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#4a1815]">
                  {successMessage}
                </p>
                <p className="mt-1 text-[10px] text-[#806c63]">
                  Your delivery information is ready.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-end justify-center bg-[#240b0f]/80 p-0 backdrop-blur-md sm:items-center sm:p-4 lg:p-6"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !isSaving
              ) {
                closeModal();
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.98,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 25,
              }}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              className="relative flex h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[30px] bg-[#fffdf8] shadow-[0_30px_120px_rgba(20,5,8,0.5)] sm:h-[min(92dvh,860px)] sm:rounded-[32px]"
            >
              <div className="absolute left-0 right-0 top-0 z-50 h-1 bg-gradient-to-r from-[#741522] via-[#d4ad54] to-[#741522]" />

              <div className="flex shrink-0 justify-center pt-3 sm:hidden">
                <span className="h-1 w-12 rounded-full bg-[#cdbda7]" />
              </div>

              <div className="shrink-0 border-b border-[#d4ad54]/15 bg-[#fffdf8] mt-8 px-4 py-4 sm:px-7 sm:py-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#741522] text-[#f5d98a]">
                      <MapPinned className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3 text-[#b88732]" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#b88732]">
                          Darsh Delivery
                        </span>
                      </div>

                      <h3 className="mt-0.5 truncate font-serif text-xl font-bold text-[#4a1815] sm:text-2xl">
                        {address
                          ? "Update your address"
                          : "Add delivery address"}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={closeModal}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4ad54]/20 bg-white text-[#741522] transition hover:rotate-90 hover:bg-[#faf3e5] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#806c63]">
                      Address completion
                    </span>
                    <span className="text-[10px] font-bold text-[#741522]">
                      {completion}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#eee4d6]">
                    <motion.div
                      animate={{
                        width: `${completion}%`,
                      }}
                      transition={{ duration: 0.25 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#741522] to-[#d4ad54]"
                    />
                  </div>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-hidden">
                <div className="grid h-full lg:grid-cols-[340px_minmax(0,1fr)]">
                  <aside className="hidden min-h-0 overflow-y-auto overscroll-contain bg-gradient-to-br from-[#741522] via-[#861d29] to-[#5f111b] p-6 text-white lg:block"
                    style={{
                      WebkitOverflowScrolling: "touch",
                      scrollbarGutter: "stable",
                    }}>
                    <div className="flex min-h-full flex-col">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#f5d98a]">
                          Simple & secure
                        </p>

                        <h4 className="mt-2 font-serif text-2xl font-bold">
                          Where should we deliver?
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-white/55">
                          Complete each step and review your address before saving.
                        </p>
                      </div>

                      <div className="mt-8 space-y-2">
                        {STEPS.map((step) => (
                          <StepButton
                            key={step.id}
                            step={step}
                            activeStep={activeStep}
                            onClick={goToStep}
                          />
                        ))}
                      </div>

                      <div className="mt-6">
                        <LivePreview formData={formData} />
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="flex items-center gap-2 text-[10px] text-white/45">
                          <ShieldCheck className="h-4 w-4 text-[#d4ad54]" />
                          Your information is securely stored.
                        </div>
                      </div>
                    </div>
                  </aside>

                  <div
                    ref={formScrollRef}
                    className="min-h-0 min-w-0 overflow-y-auto overscroll-contain touch-pan-y"
                    style={{
                      WebkitOverflowScrolling: "touch",
                      scrollbarGutter: "stable",
                      overflowAnchor: "none",
                    }}
                  >
                    <form
                      id="address-form"
                      onSubmit={handleSubmit}
                      noValidate
                      className="mx-auto w-full max-w-3xl p-4 pb-8 sm:p-6 sm:pb-10 lg:p-8 lg:pb-10"
                    >
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700"
                        >
                          <Info className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}

                      <div className="mb-6 grid grid-cols-3 gap-2 lg:hidden">
                        {STEPS.map((step) => (
                          <StepButton
                            key={step.id}
                            step={step}
                            activeStep={activeStep}
                            onClick={goToStep}
                            mobile
                          />
                        ))}
                      </div>

                      <AnimatePresence mode="wait" initial={false}>
                        {activeStep === 1 && (
                          <motion.section
                            key="recipient"
                            initial={{
                              opacity: 0,
                              x: 15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: -15,
                            }}
                            transition={{ duration: 0.18 }}
                          >
                            <div className="mb-6">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b88732]">
                                Step 01
                              </p>
                              <h4 className="mt-1 font-serif text-2xl font-bold text-[#4a1815]">
                                Recipient details
                              </h4>
                              <p className="mt-1 text-xs leading-5 text-[#806c63]">
                                Enter the person who will receive the order.
                              </p>
                            </div>

                            <div className="rounded-[28px] border border-[#d4ad54]/15 bg-white p-4 shadow-sm sm:p-6">
                              <div className="grid gap-5 sm:grid-cols-2">
                                <TextField
                                  icon={User}
                                  label="Full Name"
                                  name="FullName"
                                  value={formData.FullName}
                                  onChange={handleTextChange}
                                  placeholder="Recipient's full name"
                                  autoComplete="name"
                                  error={errors.FullName}
                                />

                                <PhoneField
                                  value={formData.Phone}
                                  onChange={handlePhoneChange}
                                  error={errors.Phone}
                                />
                              </div>

                              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#faf3e5] p-4">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#741522]" />

                                <div>
                                  <p className="text-xs font-bold text-[#4a1815]">
                                    Delivery contact
                                  </p>
                                  <p className="mt-1 text-[10px] leading-5 text-[#806c63]">
                                    Your mobile number may be used by the delivery partner for order updates.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.section>
                        )}

                        {activeStep === 2 && (
                          <motion.section
                            key="location"
                            initial={{
                              opacity: 0,
                              x: 15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: -15,
                            }}
                            transition={{ duration: 0.18 }}
                          >
                            <div className="mb-6">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b88732]">
                                Step 02
                              </p>
                              <h4 className="mt-1 font-serif text-2xl font-bold text-[#4a1815]">
                                Delivery location
                              </h4>
                              <p className="mt-1 text-xs leading-5 text-[#806c63]">
                                Add your complete address and PIN code.
                              </p>
                            </div>

                            <div className="rounded-[28px] border border-[#d4ad54]/15 bg-white p-4 shadow-sm sm:p-6">
                              <AddressField
                                value={formData.Add}
                                onChange={handleTextChange}
                                error={errors.Add}
                              />

                              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <TextField
                                  icon={Home}
                                  label="Village / City"
                                  name="VillorCity"
                                  value={formData.VillorCity}
                                  onChange={handleTextChange}
                                  placeholder="Village or city"
                                  autoComplete="address-level2"
                                  error={errors.VillorCity}
                                />

                                <TextField
                                  icon={Building2}
                                  label="District"
                                  name="Dist"
                                  value={formData.Dist}
                                  onChange={handleTextChange}
                                  placeholder="District"
                                  autoComplete="address-level2"
                                  error={errors.Dist}
                                />
                              </div>

                              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                <PinField
                                  value={formData.Pin}
                                  onChange={handlePinChange}
                                  error={errors.Pin}
                                />

                                <StateField
                                  value={formData.State}
                                  onChange={handleStateChange}
                                  error={errors.State}
                                />
                              </div>

                              <AnimatePresence initial={false}>
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
                                    className="mt-5 overflow-hidden"
                                  >
                                    <TextField
                                      icon={Globe2}
                                      label="State Name"
                                      name="customState"
                                      value={formData.customState}
                                      onChange={handleTextChange}
                                      placeholder="Enter your state"
                                      autoComplete="address-level1"
                                      error={errors.customState}
                                    />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#d4ad54]/15 bg-[#faf6ee] p-4">
                              <Navigation className="mt-0.5 h-5 w-5 shrink-0 text-[#741522]" />

                              <div>
                                <p className="text-xs font-bold text-[#4a1815]">
                                  Delivery tip
                                </p>
                                <p className="mt-1 text-[10px] leading-5 text-[#806c63]">
                                  A correct PIN and nearby landmark help reduce delivery delays.
                                </p>
                              </div>
                            </div>
                          </motion.section>
                        )}

                        {activeStep === 3 && (
                          <motion.section
                            key="review"
                            initial={{
                              opacity: 0,
                              x: 15,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: -15,
                            }}
                            transition={{ duration: 0.18 }}
                          >
                            <div className="mb-6">
                              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b88732]">
                                Step 03
                              </p>
                              <h4 className="mt-1 font-serif text-2xl font-bold text-[#4a1815]">
                                Review & confirm
                              </h4>
                              <p className="mt-1 text-xs leading-5 text-[#806c63]">
                                Review every detail before saving.
                              </p>
                            </div>

                            <ReviewCard
                              formData={formData}
                              onEditRecipient={() =>
                                goToStep(1)
                              }
                              onEditLocation={() =>
                                goToStep(2)
                              }
                            />
                          </motion.section>
                        )}
                      </AnimatePresence>
                    </form>
                  </div>
                </div>
              </div>

              <div className="relative z-50 shrink-0 border-t border-[#d4ad54]/15 bg-[#fffdf8]/95 p-1 shadow-[0_-12px_35px_rgba(63,22,22,0.08)] backdrop-blur-xl ">
                <div className="grid min-w-0 lg:grid-cols-[340px_minmax(0,1fr)]">
                  <div className="hidden lg:block" aria-hidden="true" />

                  <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 lg:max-w-3xl">
                    <div className="hidden items-center gap-2 text-[10px] text-[#806c63] sm:flex">
                      <LockKeyhole className="h-4 w-4 text-[#b88732]" />
                      Securely stored
                    </div>

                    <div className="flex w-full gap-2 sm:w-auto">
                    {activeStep > 1 ? (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={handleBack}
                        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d4ad54]/25 bg-white px-5 text-xs font-bold text-[#741522] transition hover:bg-[#faf3e5] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[120px]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={closeModal}
                        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl border border-[#d4ad54]/25 bg-white px-5 text-xs font-bold text-[#741522] transition hover:bg-[#faf3e5] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[120px]"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    )}

                    {activeStep < 3 ? (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={handleNext}
                        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#741522] to-[#5f111b] px-5 text-xs font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[150px]"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        form="address-form"
                        disabled={isSaving}
                        className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#741522] to-[#5f111b] px-5 text-xs font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[170px]"
                      >
                        {isSaving ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            />
                            {saveCountdown > 0
                              ? `Reviewing… ${saveCountdown}s`
                              : "Saving..."}
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            {address
                              ? "Update Address"
                              : "Save Address"}
                          </>
                        )}
                      </button>
                    )}
                    </div>
                  </div>
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