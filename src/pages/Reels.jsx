import React, { useState, useEffect, useRef } from "react";
import {  Volume2, VolumeX, Sparkles, Maximize, Minimize } from "lucide-react";

const Reels = () => {
  const reelsData = [
    {
      id: 1,
      video: "https://www.youtube.com/embed/1zlUl2l0m0Q",
      title: "POMWB Tredings Looks",
      shopLink: "/products",
      thumbnail: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
  ];

  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showReelList, setShowReelList] = useState(false);
  const reelRef = useRef(null);
  const containerRef = useRef(null);

  const handleNextReel = () => {
    setCurrentReel((prev) => (prev + 1) % reelsData.length);
  };

  const handlePrevReel = () => {
    setCurrentReel((prev) => (prev === 0 ? reelsData.length - 1 : prev - 1));
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

 

  const handleShop = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    if (reelRef.current) {
      observer.observe(reelRef.current);
    }

    return () => {
      if (reelRef.current) {
        observer.unobserve(reelRef.current);
      }
    };
  }, [currentReel]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNextReel();
      } else if (e.key === 'ArrowLeft') {
        handlePrevReel();
      } else if (e.key === ' ') {
        setMuted(!muted);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [muted]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-pink-50 to-yellow-50 font-inter">
      {/* New Reels Section */}
      <section className="py-5 bg-gradient-to-b from-pink-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-maroon-900 mb-6 font-serif">
              <span className="text-pink-500">
                <Sparkles className="inline-block mr-2" />
              </span>
              TRENDING LOOKS TO WATCH
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto text-sm sm:text-xl font-body">
              Discover our latest styles and get inspired by our fashion reels
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
          

            {/* Main Reel Player */}
            <div className="flex-1 w-full" ref={containerRef}>
              <div className="relative max-w-xs mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black" ref={reelRef}>
                <div className="relative aspect-[9/16] bg-gray-900">
                  <iframe
                    src={`${reelsData[currentReel].video}?autoplay=${isPlaying ? 1 : 0}&mute=${muted ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={reelsData[currentReel].title}
                  ></iframe>
                  
                 
                </div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-lg mb-4">
                    {reelsData[currentReel].title}
                  </h3>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      
                      
                      <button onClick={toggleMute} className="text-white">
                        {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </button>

                      <button onClick={toggleFullscreen} className="text-white">
                        {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                      </button>
                    </div>
                    
                    {/* <button 
                      onClick={() => handleShop(reelsData[currentReel].shopLink)}
                      className="flex items-center space-x-1 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Shop Now</span>
                    </button> */}
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                {/* <button 
                  onClick={handlePrevReel}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button 
                  onClick={handleNextReel}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button> */}
                
                {/* Reel Indicators */}
                <div className="absolute top-4 left-0 right-0 flex justify-center space-x-2">
                  {reelsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReel(index)}
                      className={`h-1.5 rounded-full transition-all ${index === currentReel ? "w-8 bg-pink-500" : "w-4 bg-white/50"}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setShowReelList(!showReelList)}
                  className="lg:hidden absolute top-4 left-4 text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-3 text-center">
                <p className="text-gray-600 text-sm">
                  Tap the speaker to mute/unmute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reels;