import React, { useState, useEffect } from "react";
import { MapPin, X, CheckCircle, User, Phone, Map, Globe, Home } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

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

  const { address, setAddress, error, setError, loading, setLoading, url } =
    useAppContext();

  useEffect(() => {
    if (address) {
      const predefinedStates = [
        "West Bengal", "Bihar", "Jharkhand", "Odisha", "Maharashtra",
        "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", "Andhra Pradesh",
        "Arunachal Pradesh"
      ];
      const isOtherState = !predefinedStates.includes(address.State);

      setFormData({
        FullName: address.FullName || "",
        Add: address.Add || "",
        VillorCity: address.VillorCity || "",
        Dist: address.Dist || "",
        State: isOtherState ? "Other" : address.State,
        customState: isOtherState ? address.State : "",
        Pin: address.Pin || "",
        Phone: address.Phone || "",
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (validationErrors[name]) {
      setValidationErrors({...validationErrors, [name]: ""});
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.FullName.trim()) errors.FullName = "Full name is required";
    if (!formData.Add.trim()) errors.Add = "Address is required";
    if (!formData.VillorCity.trim()) errors.VillorCity = "City/Village is required";
    if (!formData.Dist.trim()) errors.Dist = "District is required";
    
    if (formData.State === "Other" && !formData.customState.trim()) {
      errors.customState = "Please specify your state";
    } else if (formData.State === "Select State") {
      errors.State = "Please select a state";
    }
    
    if (!formData.Pin) errors.Pin = "PIN code is required";
    else if (isNaN(Number(formData.Pin))) errors.Pin = "PIN code must be a number";
    else if (formData.Pin.length !== 6) errors.Pin = "PIN code must be 6 digits";
    
    if (!formData.Phone) errors.Phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.Phone)) errors.Phone = "Phone number must be exactly 10 digits";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditClick = () => {
    setShowPopup(true);
    setError(null);
    setValidationErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const stateToSave =
        formData.State === "Other" ? formData.customState : formData.State;

      const dataToSend = { ...formData, State: stateToSave, userId };
      delete dataToSend.customState; 

      let res;
      if (address?._id) {
        res = await axios.put(
          `${url}/api/address/updateAddress/${address._id}`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Auth: token }),
            },
          }
        );
      } else {
        res = await axios.post(
          `${url}/api/address/addaddress`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Auth: token }),
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
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        setError(res.data.message || "Error saving address.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 flex items-center gap-2">
          <MapPin className="text-indigo-600" size={28} />
          My Address
        </h2>
        <button
          onClick={handleEditClick}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300 flex items-center gap-2"
        >
          {address ? "Edit Address" : "Add New Address"}
        </button>
      </div>

      {/* Address Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-200">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : address ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="text-indigo-600" size={24} />
                <span className="text-lg font-semibold text-gray-800">
                  {address.FullName}
                </span>
              </div>
              <span className="text-xs font-medium text-white bg-indigo-600 px-3 py-1 rounded-full">
                Default
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="mt-1">
                    {address.Add}, {address.VillorCity}, {address.Dist}<br />
                    {address.State} - {address.Pin}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-500 flex-shrink-0" size={20} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="mt-1">{address.Phone}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleEditClick}
              className="w-full mt-4 bg-white border border-indigo-200 text-indigo-600 font-semibold py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-indigo-50 flex items-center justify-center gap-2"
            >
              <MapPin size={18} />
              Edit Address
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="h-10 w-10 text-indigo-600" />
            </div>
            <p className="text-gray-600 mt-4 mb-6">No addresses saved yet.</p>
            <button
              onClick={handleEditClick}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-transform duration-300 flex items-center gap-2 mx-auto"
            >
              <MapPin size={18} />
              Add New Address
            </button>
          </div>
        )}
      </div>
  {showSuccessMessage && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 animate-fade-in bg-gradient-to-br from-green-400 to-emerald-600 p-4 text-center">
          <CheckCircle className="h-24 w-24 sm:h-32 sm:w-32 text-white animate-bounce-in" />
          <h2 className="mt-6 text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
            Address Saved!
          </h2>
          <p className="mt-2 text-lg sm:text-xl text-green-100 font-medium">
            Your address has been successfully updated.
          </p>
        </div>
      )}
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowPopup(false)}></div>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-2">
              <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-3">
                {address ? "Edit Address" : "Add New Address"}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {["FullName", "Add", "VillorCity", "Dist", "Pin", "Phone"].map(
                (field) => {
                  const placeholderMap = {
                    FullName: "Full Name",
                    Add: "Street Address",
                    VillorCity: "Village or City",
                    Dist: "District",
                    Pin: "PIN Code",
                    Phone: "Phone Number",
                  };
                  const iconMap = {
                    FullName: User,
                    Add: Map,
                    VillorCity: Home,
                    Dist: MapPin,
                    Pin: MapPin,
                    Phone: Phone,
                  };
                  const Icon = iconMap[field];

                  return (
                    <div key={field}>
                      <div className="relative">
                        <Icon
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name={field}
                          placeholder={placeholderMap[field]}
                          value={formData[field]}
                          onChange={handleChange}
                          className={`w-full border ${validationErrors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                        />
                      </div>
                      {validationErrors[field] && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors[field]}</p>
                      )}
                    </div>
                  );
                }
              )}
              
              {/* State Field */}
              <div>
                <div className="relative">
                  <Globe
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <select
                    name="State"
                    value={formData.State}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        State: e.target.value,
                        customState: e.target.value === "Other" ? formData.customState : "",
                      });
                      if (validationErrors.State) {
                        setValidationErrors({...validationErrors, State: ""});
                      }
                    }}
                    className={`w-full border ${validationErrors.State ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 appearance-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                  >
                    <option value="Select State" disabled>Select State</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
                {validationErrors.State && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.State}</p>
                )}
                
                {formData.State === "Other" && (
                  <div className="mt-3">
                    <div className="relative">
                      <Globe
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="customState"
                        placeholder="Enter your state"
                        value={formData.customState}
                        onChange={handleChange}
                        className={`w-full border ${validationErrors.customState ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:border-transparent`}
                      />
                    </div>
                    {validationErrors.customState && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.customState}</p>
                    )}
                  </div>
                )}
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-3 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700 transition-colors font-medium"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInfo;