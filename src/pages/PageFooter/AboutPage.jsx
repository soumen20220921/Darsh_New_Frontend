import React from "react";

const AboutPage = () => {
  const aboutSections = [
    {
      heading: "ABOUT US",
      subHeading: "POMWB: DISCOVER AND LIVE WITH TRADITIONS",
      content: [
        "PomWb, the name is reminiscent of the diversity, rich traditions, the transition that she went through all those years, resulting in the vibrant colours, finest fabrics and splashes of cultures. Isn’t it fascinating that how we have walked through the spans of time and borrowed the legacy of each period?",
        "PomWb takes you through a journey of the rich heritage of India while bringing you the regional specialty and character with each fabric. Time travel through the passages of history and discover the finest of crafts and the best of weaving with us. Bringing together the textile designers, artisanal communities, weavers and artists, here’s a contemporary platform that meets the delightful treasures and doesn’t fade them out.",
        "At our store, you'll find a wide range of products including clothing, electronics, home goods, and more.",
      ],
    },
    {
      subHeading: "WHAT IS POMWB?",
      content: [
        "Your one-stop treasure trove to find sarees online from each part of India!, Telangana’s uppada pattu or Banaras’s Banarasi silk here is an exquisite collection of delightful craftsmanship!",
        "WHAT MAKES POMWB THE PERFECT SAREE SHOPPING DESTINATION?",
        "Be at your own leisure and explore the vivacity the traditions of PomWb could bring to you. Your life enriched with tradition, PomWb is known for, with PomWb.",
        "Join us on this wonderful journey and take home the most beautiful of handloom sarees, the three yards of elegance and opulence, which are as special as they are beautiful. Handpicked and hand-woven, these sarees are the vivid examples of what we were and what we continue to be.",
        "Here are the sarees that are meant for every sphere of your life. From workwear to the occasions where you could use that special touch of glimmer, colour and gold!",
      ],
    },
    {
      subHeading: "CELEBRATE TRADITIONS WITH POMWB",
      content: [
        "Making up for the perfect gift for the special women in your life, the sarees presented here are curated especially for them and their occasions. Be it cotton sarees you are looking for to resemble your favourite Bollywood diva’s de-glam avatar she has been sporting these days or you want Kanjivaram sarees to be a part of your wedding trousseau, need pastel colours in pure linen sarees or looking for soft silk sarees that can be worn in daylight, get them all here.",
        "A range of sarees is available at your fingertips for you to explore and choose. Shop from the comforts of your surroundings and look for what you want. No bargaining or haggling, but certainly many online saree India shopping options such as only online Payment Delivery, a 3-day returns guarantee, and so on!",
        "Thank you for choosing us for your shopping needs. We look forward to serving you!",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {aboutSections.map((section, index) => (
          <section
            key={index}
            className="relative group bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl animate-fade-in-up"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>

            {/* Heading */}
            {section.heading && (
              <h1 className="relative text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 animate-slide-down">
                {section.heading}
                <div className="mx-auto mt-3 w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full animate-pulse"></div>
              </h1>
            )}

            {/* Subheading */}
            {section.subHeading && (
              <h3 className="relative text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center animate-fade-in">
                {section.subHeading}
              </h3>
            )}

            {/* Content */}
            <div className="relative text-gray-700 space-y-5 leading-relaxed text-base sm:text-lg">
              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="animate-slide-up opacity-90 hover:opacity-100 hover:text-gray-900 transition-colors"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
