import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPreloaderProps {
  videoSrc?: string;
  onComplete?: () => void;
  minDisplayTime?: number;
  onProgress?: (progress: number) => void;
}

const VideoPreloader = ({
  videoSrc = "https://res.cloudinary.com/dkgjl08a5/video/upload/v1744839021/Dubai_realestate_video_01_tsmqus.webm",
  onComplete = () => {},
  minDisplayTime = 30000,
  onProgress,
}: VideoPreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [canClose, setCanClose] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const startTimeRef = useRef(Date.now());

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
        video.muted = false;
        video.volume = 1.0;
        await video.play();
        console.log('Playing preloader with audio');
      } catch (error) {
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

  useEffect(() => {
    if (canClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [canClose, onComplete]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const prog = Math.min(elapsed / minDisplayTime, 1);
      setProgress(prog);
      if (onProgress) onProgress(prog);
    }, 50);
    return () => clearInterval(interval);
  }, [minDisplayTime, onProgress]);

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
      scale: 0.8,
      transition: {
        duration: 0.6
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
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        variants={overlayVariants}
        initial="visible"
        animate="visible"
        exit="exit"
      >
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-300 ease-out"
          style={{ opacity: 1 - progress }}
        />
        
        <div className="fixed top-0 left-0 w-full h-2 z-[10000]">
          <div
            className="h-full bg-gradient-to-r from-rose-500 to-sky-500 transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        
        <motion.div
          className="relative w-full h-full max-w-md max-h-screen flex items-center justify-center z-[9999]"
          variants={preloaderVariants}
          initial={{ opacity: 0, scale: 0.9 }}
          animate="visible"
          exit="exit"
          transition={{ ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full aspect-[9/16] max-w-sm max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              playsInline
              preload="auto"
            />
            
            {!videoLoaded && (
              <div className="absolute inset-0 bg-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <p className="text-white text-sm font-medium">Loading...</p>
                </div>
              </div>
            )}

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
          </div>

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

const WebsiteWithPreloader = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showMiniVideo, setShowMiniVideo] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setShowMiniVideo(true);
  };

  const handleProgress = (prog: number) => {
    setProgress(prog);
  };

  return (
    <div className="relative">
      {showPreloader && (
        <VideoPreloader
          onComplete={handlePreloaderComplete}
          minDisplayTime={30000}
          onProgress={handleProgress}
        />
      )}

      <AnimatePresence>
        {showMiniVideo && (
          <motion.div
            className="fixed z-[9999] overflow-hidden bg-black shadow-2xl border-2 border-white/20 rounded-xl"
            initial={{
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '21rem',
              height: '37rem',
              borderRadius: '1rem',
              opacity: 0,
            }}
            animate={{
              top: 'auto',
              left: 'auto',
              bottom: '1.5rem',
              right: '1.5rem',
              x: 0,
              y: 0,
              width: '21rem',
              height: '37rem',
              borderRadius: '1rem',
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.6 }
            }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 18,
              duration: 2.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.button
              className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-200"
              onClick={() => setShowMiniVideo(false)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
            
            <video
              src="https://res.cloudinary.com/dkgjl08a5/video/upload/v1744839021/Dubai_realestate_video_01_tsmqus.webm"
              className="w-full h-full object-contain bg-black"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteWithPreloader;