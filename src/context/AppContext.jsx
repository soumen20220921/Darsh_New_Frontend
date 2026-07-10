import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);
  const [totalItems, setTotalItems] = useState(0); 
  const [orderCount, setOrderCount] = useState(0);

  const url = "https://api.pomwb.com"; // or your production URL
  const token = localStorage.getItem("token");
  const user = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("userId"),
  };

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  // Fetch address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${url}/api/address/getAddressById`, {
          headers: { Auth: token }
        });

        if (res.data.message === "Address Found") {
          setAddress(res.data.address);
          setError(null);
        } else {
          setError(res.data.message || "Failed to fetch address");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAddress();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch all products
  const [allProduct, setAllProduct] = useState(null);
  const getProduct = async () => {
    try {
      const res = await axios.get(`${url}/api/product/getallproduct`);
      setAllProduct(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Fetch cart
  const [cart, setCart] = useState(null);
  const getCart = async () => {
    try {
      const res = await axios.get(`${url}/api/cart/userCart`, {
        headers: { Auth: token }
      });
      setCart(res.data.cart.items);
      const total = res.data.cart.items.reduce((acc, item) => acc + item.qty, 0);
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // Fetch orders
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const getOrder = async () => {
    setOrderLoading(true);
    setOrderError(null);

    try {
      const res = await axios.get(`${url}/api/payment/getOrderById`, {
        headers: { Auth: token }
      });
      setOrder(res.data.orders || null);
      const total = res.data.orders ? res.data.orders.length : 0;
      setOrderCount(total);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrderError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setOrderLoading(false);
    }
  };

  // Fetch doctors
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);
  const [doctorsError, setDoctorsError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setDoctorsLoading(true);
      setDoctorsError(null);
      const res = await axios.get(`${url}/api/doctor/all`);
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctorsError("Failed to load doctors. Please try again later.");
      setDoctors([]);
    } finally {
      setDoctorsLoading(false);
    }
  };

  // Fetch doctor bookings
  const [booking, setBooking] = useState(null);
  const getBooking = async () => {
    try {
      const res = await axios.get(`${url}/api/booking/getBookingById`, {
        headers: { Auth: token }
      });
      setBooking(res.data.orders || null);
    } catch (err) {
      console.error("Error fetching doctor bookings:", err);
    }
  };

  // Fetch therapists
  const [therapists, setTherapists] = useState([]);
  const [therapistsLoading, setTherapistsLoading] = useState(true);
  const [therapistsError, setTherapistsError] = useState(null);

  const fetchTherapists = async () => {
    try {
      setTherapistsLoading(true);
      setTherapistsError(null);
      const res = await axios.get(`${url}/api/therapist/all`);
      const therapistsData = res.data.therapists || res.data || [];
      setTherapists(Array.isArray(therapistsData) ? therapistsData : []);
    } catch (err) {
      console.error("Error fetching therapists:", err);
      setTherapistsError(
        err.response?.data?.message || 
        "Failed to load therapists. Please try again later."
      );
      setTherapists([]);
    } finally {
      setTherapistsLoading(false);
    }
  };

  // Fetch all therapist bookings
  const [therapistBookings, setTherapistBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const fetchTherapistBookings = async () => {
    if (!token) return;
    
    setBookingsLoading(true);
    try {
      const res = await axios.get(`${url}/api/therapistbooking/alltherapistbookings`, {
        headers: { Auth: token }
      });
      setTherapistBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching therapist bookings:", err);
      setTherapistBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  // Fetch single therapist booking by ID
  const [singleTherapistBooking, setSingleTherapistBooking] = useState(null);
  const [singleBookingLoading, setSingleBookingLoading] = useState(false);
  const [singleBookingError, setSingleBookingError] = useState(null);

  const fetchTherapistBookingById = async (bookingId) => {
    if (!token || !bookingId) return;
    
    setSingleBookingLoading(true);
    setSingleBookingError(null);
    
    try {
      const res = await axios.get(`${url}/api/therapistbooking/gettherapistBookingById`, {
        headers: { Auth: token },
        params: { bookingId }
      });
      setSingleTherapistBooking(res.data.booking || null);
      return res.data.booking;
    } catch (err) {
      console.error("Error fetching therapist booking by ID:", err);
      setSingleBookingError(
        err.response?.data?.message || "Failed to fetch booking details"
      );
      return null;
    } finally {
      setSingleBookingLoading(false);
    }
  };

  // Create new therapist booking
  const createTherapistBooking = async (bookingData) => {
    if (!token) return { success: false, message: "Please login first" };
    
    try {
      const res = await axios.post(
        `${url}/api/therapistbooking/createbooking`,
        bookingData,
        { headers: { Auth: token, 'Content-Type': 'application/json' } }
      );
      
      // Refresh bookings after creating new one
      await fetchTherapistBookings();
      
      return { 
        success: true, 
        data: res.data,
        message: res.data.message || "Booking created successfully" 
      };
    } catch (err) {
      console.error("Error creating therapist booking:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Failed to create booking" 
      };
    }
  };

  // Update therapist booking status
  const updateTherapistBookingStatus = async (bookingId, status) => {
    if (!token) return { success: false, message: "Please login first" };
    
    try {
      const res = await axios.put(
        `${url}/api/therapistbooking/updatebooking`,
        { bookingId, status },
        { headers: { Auth: token, 'Content-Type': 'application/json' } }
      );
      
      // Refresh bookings after update
      await fetchTherapistBookings();
      
      return { 
        success: true, 
        data: res.data,
        message: res.data.message || "Booking updated successfully" 
      };
    } catch (err) {
      console.error("Error updating therapist booking:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Failed to update booking" 
      };
    }
  };

  // Cancel therapist booking
  const cancelTherapistBooking = async (bookingId) => {
    if (!token) return { success: false, message: "Please login first" };
    
    try {
      const res = await axios.delete(`${url}/api/therapistbooking/cancelbooking`, {
        headers: { Auth: token },
        data: { bookingId }
      });
      
      // Refresh bookings after cancellation
      await fetchTherapistBookings();
      
      return { 
        success: true, 
        data: res.data,
        message: res.data.message || "Booking cancelled successfully" 
      };
    } catch (err) {
      console.error("Error cancelling therapist booking:", err);
      return { 
        success: false, 
        message: err.response?.data?.message || "Failed to cancel booking" 
      };
    }
  };

  // Initialize all data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch public data
        await Promise.all([
          getProduct(),
          fetchDoctors(),
          fetchTherapists()
        ]);

        // Fetch user-specific data if logged in
        if (token) {
          await Promise.all([
            getCart(),
            getOrder(),
            getBooking(),
            fetchTherapistBookings()
          ]);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [token]);

  const refreshDoctors = () => {
    fetchDoctors();
  };

  const refreshTherapists = () => {
    fetchTherapists();
  };

  const refreshBookings = () => {
    fetchTherapistBookings();
  };

  const clearSingleBooking = () => {
    setSingleTherapistBooking(null);
    setSingleBookingError(null);
  };

  return (
    <AppContext.Provider
      value={{
        // User & Auth
        token,
        login,
        setLogin,
        user,
        
        // Address
        address,
        setAddress,
        
        // UI States
        error,
        setError,
        loading,
        setLoading,
        
        // Products
        allProduct,
        
        // Cart
        cart,
        getCart,
        totalItems,
        
        // Orders
        order,
        getOrder,
        orderCount,
        orderLoading,
        orderError,
        
        // Doctors
        doctors,
        doctorsLoading,
        doctorsError,
        refreshDoctors,
        
        // Doctor Bookings
        booking,
        getBooking,
        
        // Therapists
        therapists,
        therapistsLoading,
        therapistsError,
        refreshTherapists,
        
        // Therapist Bookings
        therapistBookings,
        bookingsLoading,
        refreshBookings,
        
        // Single Therapist Booking
        singleTherapistBooking,
        singleBookingLoading,
        singleBookingError,
        fetchTherapistBookingById,
        clearSingleBooking,
        
        // Therapist Booking Operations
        createTherapistBooking,
        updateTherapistBookingStatus,
        cancelTherapistBooking,
        
        // Base URL
        url,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};