import React, { useEffect, useState } from "react";

const images = [
  "/img-1.webp",
  "/img-2.webp",
  "/img-3.webp",
];


const Hero = ({ langData, onShowForm }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000); // change every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGES */}
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      />
      <div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${images[currentImage]})` }}
/>



      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-black/20" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-20">
        <div
          className="
            bg-gradient-to-br from-white/20 to-white/5
            backdrop-blur-xl
            border border-white/30
            p-14 rounded-3xl
            text-white max-w-xl
            shadow-[0_30px_70px_rgba(0,0,0,0.5)]
            animate-[fadeUp_1s_ease-out]
          "
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
            {langData.heroTitle || "KrishiSakhi"}
          </h2>

          <p className="text-lg md:text-xl text-gray-100 mb-10">
            Empowering farmers with smart tools, local language support,
            and real-time agricultural insights.
          </p>

          <button
            onClick={onShowForm}
            className="
              bg-green-600 px-12 py-4 rounded-full
              text-xl font-bold shadow-xl
              hover:bg-green-700 transition-all
              hover:scale-105 active:scale-95
            "
          >
            {langData.heroBtn || "Helping Farmers Build Better"}
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <i className="fa-solid fa-chevron-down text-white opacity-70 text-xl"></i>
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }`
        }
      </style>
    </section>
  );
};

export default Hero;