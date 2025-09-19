import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import {
  ArrowRight,
  Star,
  Heart,
  Sparkles,
  Truck,
  ShoppingBag,
  Flame,
  Crown,
} from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import FestiveBanner from "./FestiveBanner.jsx";
import Reels from "./Reels.jsx"

const Home = () => {
  const { allProduct ,url } = useAppContext();
  const [hotSales, setHotSales] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

 useEffect(() => {
    if (allProduct) {
      const hot = allProduct.filter((p) => p.hotSell);
      setHotSales(hot.slice(0, 8));

      const sortedNew = [...allProduct].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNewArrivals(sortedNew.slice(0, 8));
    }
  }, [allProduct]);

  const categories = [
    { id: "1", name: "saree", image: "/IMG/saree.jpg" },
    { id: "2", name: "blouse", image: "/IMG/blouse.jpg" },
    { id: "3", name: "men", image: "/IMG/men.jpg" },
    { id: "4", name: "kids", image: "/IMG/kids.png" },
    { id: "5", name: "jwellary", image: "/IMG/jwellary.png" },
    {
      id: "6",
      name: "acceceries",
      image:
        "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const testimonials = [
    {
      name: "Debolina Chatterjee",
      quote:
        "একদম অসাধারণ কাজ! শাড়ির গুনগত মান দারুণ, পড়তে খুবই আরামদায়ক। আমি বারবার এখান থেকেই কিনব।",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS30SkjTndCVjYNtrDYfr7QgG7j7L9gdqIhug&s",
    },
    {
      name: "Rituparna Das",
      quote:
        "The blouse designs are so stylish yet comfortable. Perfect match with my silk saree collection.",
      image:
        "https://t4.ftcdn.net/jpg/03/48/83/25/360_F_348832546_xzYPZhbHjzkQz3pMHO8376J5ADF2QhxE.jpg",
    },
    {
      name: "Sohini Mukherjee",
      quote:
        "খুব সুন্দরভাবে ডেলিভারি হয়েছে। দাম অনুযায়ী মান খুব ভালো। পরিবারের সবার কাছেই প্রশংসা কুড়িয়েছি।",
      image:
        "https://previews.123rf.com/images/devjyoti/devjyoti2109/devjyoti210900013/177631545-a-simple-bengali-girl-wearing-a-traditional-red-sari-and-golden-ornaments-giving-poses-in-front-of.jpg",
    },
    {
      name: "Ananya Roy",
      quote:
        "Bought a kurta set for my brother. The fitting and fabric are really good. Value for money.",
      image:
        "https://i.pinimg.com/736x/55/90/a4/5590a4448787f5af9c6c81b00e3def3e.jpg",
    },
    {
      name: "Madhumita Pal",
      quote:
        "এখানকার শাড়িগুলো একদম ঐতিহ্যবাহী। মা ও দিদির জন্যও কিনেছি, সবাই খুব খুশি।",
      image:
        "https://media.istockphoto.com/id/484288034/photo/portrait-of-happy-woman-after-applying-vermilion-during-durga-puja.jpg?s=612x612&w=0&k=20&c=fRC7IbQmqN1U2vJD_hC8Id9JKfL9fB3aJZ1YEoTvGJ0=",
    },
    {
      name: "Subhra Dey",
      quote:
        "Ordered kidswear for my daughter. The fabric is soft and comfortable, perfect for daily use.",
      image:
        "https://media.istockphoto.com/id/1179812556/photo/holi-and-durga-puja-festival-in-india-portrait-of-an-unidentified-bengali-woman-playing-with.jpg?s=612x612&w=0&k=20&c=4mtfKFEovKHV4-RmLxq1vw1WQVf4kZj1gVu9I7Dqd8k=",
    },
    {
      name: "Piyali Saha",
      quote:
        "Pujor আগেই অর্ডার করেছিলাম। সময়মতো ডেলিভারি হয়েছে আর শাড়ি দেখে সবাই অবাক! Highly recommended.",
      image:
        "https://media.istockphoto.com/id/1284505478/photo/portrait-of-beautiful-smiling-indian-woman.jpg?s=612x612&w=0&k=20&c=PXO1i8gQJpv4CNSRTmJgJag2gOny7rWTnywehXg8hCw=",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-yellow-50 font-inter">
      <Hero />

      {/* Categories Section */}
      <section className="py-8 bg-white/70 backdrop-blur-md shadow-inner rounded-b-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/20 via-amber-100/10 to-transparent animate-pulse-slow" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl whitespace-nowrap sm:text-3xl lg:text-4xl font-extrabold text-maroon-900 mb-6 font-serif animate-fade-in-up">
              <span className="text-pink-500 animate-pulse">
                <Sparkles className="inline-block mr-2 animate-spin-slow" />
              </span>
              Shop by Category
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-sm sm:text-xl font-body animate-fade-in delay-200">
              Discover our wide range of products across different categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/Categories/${cat.name}`}
                onClick={() =>
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                }
                className="group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-52 object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-pink-700/50 group-hover:via-amber-500/20 transition-all duration-500"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg">
                    {cat.name}
                  </h3>
                  <div className="flex justify-between items-center cursor-pointer">
                    <span className="text-xs uppercase tracking-wider font-medium">
                      Shop Now
                    </span>
                    <ArrowRight
                      className=" h-5 w-5 ml-1 animate-[arrowMove_1.2s_ease-in-out_infinite]"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Hot Sales */}
      <section className="  my-8 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
            <div className="flex items-center">
              <div className="p-3 animate-pulse bg-red-100 rounded-full mr-4">
                <Flame size={32} className=" text-red-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Hot Sales</h2>
                <p className="text-sm sm:text-lg text-gray-600">Limited time offers on our most popular items</p>
              </div>
            </div>
            <Link
              to="/hotsales"
              className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-3 w-auto rounded-full font-semibold text-white text-sm sm:text-base md:text-lg bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-pink-500 hover:via-red-500 hover:to-rose-500 shadow-lg hover:shadow-xl  transform hover:scale-105 active:scale-95  transition-all duration-300 ease-out "
            >
              <span>View All</span>
              <ArrowRight className="ml-2 h-4 animate-arrowMove sm:h-5 w-4 sm:w-5" />
            </Link>
          </div>

          {/* Mobile Swipe */}
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {hotSales.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-pink-200">
                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.productName,
                      image: product.images?.[0]
                        ? `${url}/img/${product.images[0]}`
                        : "https://placehold.co/400x400",
                      price: product.price,
                      oldprice: product.originalPrice,
                    }}
                    onAddToCart={() => {}}
                    onToggleWishlist={() => {}}
                    isCompactMobile={true}
                  />
                  <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    Hot
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* New Arrivals */}
      <section className=" my-8 mt-9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
            <div className="flex items-center">
              <div className="p-3 animate-pulse bg-blue-100 rounded-full mr-4">
                <Crown size={32} className="text-blue-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                <p className="text-sm sm:text-lg text-gray-600">Discover our latest additions</p>
              </div>
            </div>
            <Link
              to="/newarrivals"
              className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-3 w-auto rounded-full font-semibold text-white text-sm sm:text-base md:text-lg bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View All
              <ArrowRight className="ml-2 animate-arrowMove h-5 w-5" />
            </Link>
          </div>

          {/* Mobile Swipe */}
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {newArrivals.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-indigo-200">
                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.productName,
                      image: product.images?.[0]
                        ? `${url}/img/${product.images[0]}`
                        : "",
                      price: product.price,
                    }}
                    onAddToCart={() => {}}
                    onToggleWishlist={() => {}}
                    isCompactMobile={true}
                  />
                  <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                    New
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Reels/>

      {/* Why Choose Darsh (Enhanced Design) */}
      {/* <section className="py-20 bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl whitespace-nowrap sm:text-4xl lg:text-5xl font-extrabold text-maroon-900 mb-6 font-serif animate-fade-in-up">
            Why Choose POMWB
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-16 text-sm sm:text-xl font-body animate-fade-in delay-200">
            We combine traditional craftsmanship with modern convenience to bring you the best shopping experience.
          </p>

          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper why-choose-swiper"
          >
            {[
              {
                icon: Heart,
                color: "text-red-500",
                title: "Artisanal Craftsmanship",
                desc: "Each piece is lovingly handcrafted with attention to every detail.",
              },
              {
                icon: Sparkles,
                color: "text-pink-500",
                title: "Sustainable Elegance",
                desc: "Ethically sourced materials for timeless, eco-conscious fashion.",
              },
              {
                icon: Truck,
                color: "text-indigo-500",
                title: "Swift Delivery",
                desc: "Fast & secure shipping to your doorstep, anywhere.",
              },
              {
                icon: ShoppingBag,
                color: "text-teal-500",
                title: "Guaranteed Quality",
                desc: "We promise the finest quality with complete satisfaction.",
              },
            ].map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative bg-gradient-to-tr from-white via-amber-50 to-white rounded-3xl p-8 border border-amber-200 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className={`mb-6 text-center`}>
                    <item.icon
                      className={`h-16 w-16 mx-auto ${item.color} animate-bounce-slow`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold whitespace-nowrap text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-light">
                    {item.desc}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}


      <FestiveBanner />

      {/* All Products */}
      <section className="my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag size={36} className="text-teal-500 animate-pulse" />
              All Products
            </h2>
            <Link
              to="/allproducts"
              className="flex items-center justify-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-3 w-auto rounded-full font-semibold text-white text-sm sm:text-base md:text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-cyan-500 hover:to-teal-500 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              View All 
              <ArrowRight className="ml-2 animate-arrowMove h-5 w-5" />
            </Link>
          </div>

          {/* Mobile & Tablet Swipe (below 1024px) */}
          <div className="lg:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.5}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 2.5 },
              }}
              autoplay={{ delay: 3000 }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {allProduct?.slice(0, 8).map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-teal-200">
                    <ProductCard
                      product={{
                        id: product._id,
                        name: product.productName,
                        image: product.images?.[0]
                          ? `${url}/img/${product.images[0]}`
                          : "https://placehold.co/400x400",
                        price: product.price,
                        description: product.description,
                        stock: product.stock,
                      }}
                      isCompactMobile={true}
                      onAddToCart={() => {}}
                      onToggleWishlist={() => {}}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid (1024px and above) */}
          <div className="hidden lg:block">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {allProduct && allProduct.length > 0 ? (
                allProduct.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <ProductCard
                      product={{
                        id: product._id,
                        name: product.productName,
                        image: product.images?.[0]
                          ? `${url}/img/${product.images[0]}`
                          : "https://placehold.co/400x400",
                        price: product.price,
                        description: product.description,
                        stock: product.stock,
                      }}
                      isCompactMobile={true}
                      onAddToCart={() => {}}
                      onToggleWishlist={() => {}}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  className="text-gray-600 col-span-full text-center py-10 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No products found.
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials - Redesigned & Animated */}
      <section className="py-7 bg-gradient-to-r from-yellow-50 via-amber-100 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-maroon-900 mb-4 font-serif animate-fade-in-up">
            Our Community
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-sm sm:text-xl font-body animate-fade-in delay-200">
            Stories from our happy customers who are part of the ShopHub family.
          </p>

          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper testimonial-swiper"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white p-8 rounded-2xl border border-amber-200 transform hover:scale-105 transition-all duration-500 animate-fade-in-up">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-maroon-800 animate-bounce-slow"
                  />
                  <p className="text-gray-700 italic mb-4 text-sm sm:text-base">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-center text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{t.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;
