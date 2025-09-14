import React, { useState, useEffect } from "react";
import { MapPin, X, CheckCircle, User, Phone, Map, Globe, Home } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const AddressInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    FullName: "",
    Add: "",
    VillorCity: "",
    Dist: "",
    State: "",
    Pin: "",
    Phone: "",
  });

  const { address, setAddress, error, setError, loading, setLoading, url } =
    useAppContext();

  useEffect(() => {
    if (address) {
      setFormData({
        FullName: address.FullName || "",
        Add: address.Add || "",
        VillorCity: address.VillorCity || "",
        Dist: address.Dist || "",
        State: address.State || "",
        Pin: address.Pin || "",
        Phone: address.Phone || "",
      });
    }
  }, [address]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEditClick = () => setShowPopup(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.Phone)) return setError("Phone number must be exactly 10 digits.");
    if (isNaN(Number(formData.Pin))) return setError("Pin Code must be a number.");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const dataToSend = { ...formData, userId };
      let res;

      if (address?._id) {
        res = await axios.put(
          `${url}/api/address/updateAddress/${address._id}`,
          dataToSend,
          { headers: { "Content-Type": "application/json", ...(token && { Auth: token }) } }
        );
      } else {
        res = await axios.post(
          `${url}/api/address/addaddress`,
          dataToSend,
          { headers: { "Content-Type": "application/json", ...(token && { Auth: token }) } }
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
    <div className="max-w-4xl mx-auto p-1 sm:p-6 lg:p-8 font-sans space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 animate-fade-in">
          My Addresse
        </h2>
        <button
          onClick={handleEditClick}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          {address ? "Edit Address" : "Add New Address"}
        </button>
      </div>

      {/* Address Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 md:p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-1">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
          </div>
        ) : address ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="text-indigo-600 animate-pulse" size={22} />
                <span className="text-md font-semibold text-gray-800">{address.FullName}</span>
              </div>
              <span className="text-xs font-medium text-white bg-indigo-600 px-3 py-1 rounded-full animate-bounce">
                Default
              </span>
            </div>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <div className="flex items-start gap-2">
                <MapPin className="text-gray-500 mt-1" size={20} />
                <p>
                  {address.Add}, {address.VillorCity}, {address.Dist} <br />
                  {address.State} - {address.Pin}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-gray-500" size={20} />
                <p>{address.Phone}</p>
              </div>
            </div>
            <button
              onClick={handleEditClick}
              className="w-full mt-4 bg-white border border-gray-200 text-indigo-600 font-semibold py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:bg-indigo-50"
            >
              Edit Address
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-16 w-16 text-indigo-400 animate-bounce" />
            <p className="text-gray-500 mt-2 mb-4">No addresses saved yet.</p>
            <button
              onClick={handleEditClick}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md md:max-w-xl shadow-2xl transform animate-scale-up hover:scale-105 transition-transform duration-300 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 text-indigo-700 animate-fade-in">
              {address ? "Edit Address" : "Add New Address"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {["FullName", "Add", "VillorCity", "Dist", "State", "Pin", "Phone"].map((field, idx) => {
                const placeholderMap = {
                  FullName: "Full Name",
                  Add: "Street Address",
                  VillorCity: "Village or City",
                  Dist: "District",
                  State: "State",
                  Pin: "Pin Code",
                  Phone: "Phone Number (10 digits)"
                };
                const iconMap = {
                  FullName: User,
                  Add: Map,
                  VillorCity: Home,
                  Dist: MapPin,
                  State: Globe,
                  Pin: MapPin,
                  Phone: Phone
                };
                const Icon = iconMap[field];
                return (
                  <div className="relative" key={idx}>
                    <label className="sr-only">{placeholderMap[field]}</label>
                    <input
                      type="text"
                      name={field}
                      placeholder={placeholderMap[field]}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:ring-indigo-400 focus:border-indigo-400 text-sm sm:text-base"
                      required
                    />
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 animate-pulse" size={20} />
                  </div>
                );
              })}
              {error && (
                <div className="w-full text-center bg-red-100 text-red-700 p-2 rounded-md transition-all duration-300 text-sm">
                  {error}
                </div>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300"
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
