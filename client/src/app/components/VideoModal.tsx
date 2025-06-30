import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VideoPreloader = ({
  videoSrc = "https://res.cloudinary.com/dkgjl08a5/video/upload/v1744839021/Dubai_realestate_video_01_tsmqus.webm",
  onComplete = () => {},
  minDisplayTime = 3000, // Minimum time to show preloader (3 seconds)
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startTimeRef = useRef(Date.now());

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    const handleEnded = () => {
      setVideoEnded(true);
    };

    const handleCanPlayThrough = async () => {
      try {
        // Try to play with audio first
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        console.log('Playing preloader with audio');
      } catch (error) {
        // Fallback to muted if autoplay with audio fails
        console.log('Audio autoplay failed, playing muted:', error);
        video.muted = true;
        try {
          await video.play();
        } catch (mutedError) {
          console.log('Muted autoplay also failed:', mutedError);
        }
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  // Check if we can close the preloader
  useEffect(() => {
    const checkCanClose = () => {
      const timeElapsed = Date.now() - startTimeRef.current;
      const minTimeReached = timeElapsed >= minDisplayTime;
      
      if (videoLoaded && (videoEnded || minTimeReached)) {
        setCanClose(true);
      }
    };

    const interval = setInterval(checkCanClose, 100);
    return () => clearInterval(interval);
  }, [videoLoaded, videoEnded, minDisplayTime]);

  // Auto-close preloader when conditions are met
  useEffect(() => {
    if (canClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 800); // Wait for exit animation
      }, 500); // Small delay before closing

      return () => clearTimeout(timer);
    }
  }, [canClose, onComplete]);

  // Prevent body scroll while preloader is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Manual skip functionality
  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const preloaderVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8
      }
    }
  };

  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        variants={overlayVariants}
        initial="visible"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative w-full h-full max-w-md max-h-screen flex items-center justify-center"
          variants={preloaderVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate="visible"
          exit="exit"
          transition={{ ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Video Container */}
          <div className="relative w-full aspect-[9/16] max-w-sm max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
            />
            
            {/* Loading overlay while video loads */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white text-sm font-medium">Loading...</p>
                </div>
              </div>
            )}

            {/* Skip button */}
            <motion.button
              onClick={handleSkip}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip
            </motion.button>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/20 rounded-full h-1 overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="bg-white h-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: minDisplayTime / 1000,
                    ease: "linear"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Brand/Logo area (optional) */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Welcome</h2>
              <p className="text-white/70 text-sm">Loading your experience...</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Example usage component showing how to integrate with your main website
const WebsiteWithPreloader = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <div className="relative">
      {/* Preloader */}
      {showPreloader && (
        <VideoPreloader
          onComplete={handlePreloaderComplete}
          minDisplayTime={30000} // 4 seconds minimum
        />
      )}

  
    </div>
  );
};

export default WebsiteWithPreloader;