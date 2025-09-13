import React from "react";
import {
  BsBank2,
  BsQrCodeScan
} from "react-icons/bs";
import { IoMdWallet } from "react-icons/io";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { FaGooglePay, FaCcAmazonPay } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";

const PaymentOptions = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Payment Options
          </h1>
          <div className="flex justify-center items-center text-6xl text-indigo-600 my-4">
            <SiPhonepe />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Multiple secure payment methods powered by PhonePe — simple,
            reliable, and fast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            { icon: <IoCardOutline />, color: "text-indigo-500", title: "Credit/Debit Cards", desc: "Pay with all major cards, processed securely." },
            { icon: <BsQrCodeScan />, color: "text-purple-500", title: "UPI Payments", desc: "Quick UPI payments by scanning QR codes." },
            { icon: <BsBank2 />, color: "text-blue-500", title: "Net Banking", desc: "Pay directly from your bank securely." },
            { icon: <IoMdWallet />, color: "text-green-500", title: "Wallets", desc: "Pay easily with PhonePe, Paytm & more." },
            { icon: <SiPaytm />, color: "text-blue-600", title: "Paytm", desc: "Safe & quick payments via Paytm app." },
            { icon: <FaGooglePay />, color: "text-green-600", title: "Google Pay", desc: "Instant transactions with GPay." },
            { icon: <FaCcAmazonPay />, color: "text-orange-500", title: "Amazon Pay", desc: "Pay via Amazon balance or linked cards." },
          ].map((method, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-md text-center transition transform hover:scale-105 hover:shadow-lg"
            >
              <div className={`flex justify-center text-4xl mb-4 ${method.color}`}>
                {method.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {method.title}
              </h2>
              <p className="text-gray-600">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
