import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create the context
const AppContext = createContext();

// 2. Create a provider component
export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(false);
  const [totalItems, setTotalItems] = useState(0); 
  
  //  const url = "https://api2.darshsaree.com"
   const url = "http://localhost:8001"
  const token = localStorage.getItem("token");
  const user = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    id: localStorage.getItem("userId"),
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  // Fetch User Address
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${url}/api/address/getAddressById`,
          {
            headers: {
              Auth: token,
            },
          }
        );

        if (res.data.message === "Address Found") {
          setAddress(res.data.address);
          setError(null);
            // console.log("address",res.data.address);
        } else {
          setError(res.data.message || "Failed to fetch address");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  // Fetch All product
  const [allProduct, setAllProduct] = useState(null);
  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${url}/api/product/getallproduct`
      );
            // console.log("all product", res.data); // res.data has your actual products
      setAllProduct(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Fetch cart details
  const [cart, setCart] = useState(null);
  const getCart = async () => {
    try {
      const res = await axios.get(
        `${url}/api/cart/userCart`,
        {
          headers: {
            Auth: token,
          },
        }
      );
      setCart(res.data.cart.items);
      // Calculate total items from the fetched cart
      const total = res.data.cart.items.reduce(
        (acc, item) => acc + item.qty,
        0
      );
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  // Fetch Order
  const [order, setOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const getOrder = async () => {
    setOrderLoading(true);
    setOrderError(null);

    try {
      const res = await axios.get(
        `${url}/api/payment/getOrderById`,
        {
          headers: {
            Auth: token,
          },
        }
      );

      console.log("order", res.data);
      setOrder(res.data.orders || null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrderError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setOrderLoading(false);
    }
  };
// fetch all doctors

  const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${url}/api/doctor/all`);
      // console.log(res.data.doctors)
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      // toast.error("Failed to fetch doctors");
    }
  };




  // Fetch Booking By ID

   const [booking, setBooking] = useState(null);

  const getBooking = async () => {
    try {
      const res = await axios.get(
        `${url}/api/booking/getBookingById`,
        {
          headers: {
            Auth: token,
          },
        }
      );

      console.log("booking", res.data);
      setBooking(res.data.orders || null);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } 
  };
  
  useEffect(() => {
    getProduct();
    if (token) {
      getCart();
      getOrder();
      fetchDoctors();
      getBooking();
    }
  }, [token]);
  return (
    <AppContext.Provider
      value={{
        token,
        login,
        setLogin,
        user,
        address,
        setAddress,
        error,
        setError,
        loading,
        setLoading,
        allProduct,
        cart,
        getCart,
        order,
        getOrder,
        orderLoading,
        orderError,
        totalItems,
        url,
        doctors,
        booking
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 3. Custom hook for easier usage
export const useAppContext = () => {
  return useContext(AppContext);
};