import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    "Hi! I'm visiting the POMWB website and would like some assistance. Please let me know how you can help."
  );

  const handleChat = () => {
    const text = `Customer Number: ${phone}\n\n${message}`;
    const whatsappUrl = `https://wa.me/919474048860?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed
          bottom-5
          right-5
          md:bottom-6
          md:right-6
          z-50
          w-14 h-14
          rounded-full
          text-white
          shadow-2xl
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
          animate-bounce
        "
        style={{ backgroundColor: "#905CD4" }}
      >
        <FaWhatsapp size={34} />
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-36 right-4 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">

          {/* Header */}
          <div
            className="text-white flex justify-between items-center p-4"
            style={{ backgroundColor: "#905CD4" }}
          >
            <div className="flex items-center gap-2">
              <FaWhatsapp size={28} />
              <h2 className="font-semibold">Chat with us</h2>
            </div>

            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <input
              type="tel"
              placeholder="Enter your number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#905CD4" }}
            />

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#905CD4" }}
            />

            <button
              onClick={handleChat}
              className="w-full text-white py-3 rounded-lg font-semibold transition duration-300"
              style={{ backgroundColor: "#BA53BA" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#A445A4")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#BA53BA")}
            >
              Start Chat
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppChat;