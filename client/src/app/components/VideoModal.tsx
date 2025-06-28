"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const VideoModal = ({
  videoSrc = "https://res.cloudinary.com/dkgjl08a5/video/upload/v1744839021/Dubai_realestate_video_01_tsmqus.webm",
  thumbnail = "",
  autoPlay = true,
  muted = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMini, setIsMini] = useState(false); // Start in fullscreen mode
  const [isMuted, setIsMuted] = useState(false); // never muted by default
  const [showMiniAfterClose, setShowMiniAfterClose] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation variants for fullscreen modal
  const fullscreenVariants: Variants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 18, duration: 0.6 },
    },
    exit: {
      x: "100vw",
      opacity: 0,
      transition: { type: 'spring', stiffness: 120, damping: 18, duration: 0.6 },
    },
  };

  // Mini modal variants - always slide from right, never from bottom
  const miniVariants: Variants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
  };

  // Overlay animation (opacity + blur)
  const overlayVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(0px)" },
    visible: {
      opacity: 1,
      filter: "blur(4px)",
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
    exit: {
      opacity: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
    },
  };

  // Prevent body scroll and blur background when modal is open
  useEffect(() => {
    if (isOpen && !isMini) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, isMini]);

  // Ensure video plays when component mounts and stays playing
  useEffect(() => {
    if (videoRef.current && isOpen) {
      const video = videoRef.current;
      video.muted = false;
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false); // If autoplay fails, show play overlay
        }
      };
      playVideo();
    }
  }, [isOpen, isMuted, autoPlay]);

  // Keep video playing during transitions between fullscreen and mini
  useEffect(() => {
    if (videoRef.current && isOpen) {
      const video = videoRef.current;
      
      // Don't pause the video during state transitions
      // Only ensure it's playing if it should be
      if (isPlaying && video.paused) {
        video.play().catch(() => {});
      }
    }
  }, [isMini, isPlaying, isOpen]);

  // Play/pause on click (only manual control)
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.paused) {
      video.muted = false; // Always unmute when user clicks play
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Handle close of fullscreen modal (go to mini mode, keep playing)
  const handleCloseFullscreen = () => {
    // Don't pause video when minimizing
    setIsMini(true);
  };

  // Handle click outside video to close modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
    }
  };

  // When modal is closed, don't render
  if (!isOpen) return null;

  return (
    <>
      {(!isMini && isOpen) && (
        <>
          {/* Overlay for blur - OUTSIDE the flex container */}
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-[6px] z-[9998]"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ pointerEvents: 'none' }}
            />
          </AnimatePresence>
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            variants={fullscreenVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="fullscreen-modal"
            onClick={handleOutsideClick}
          >
            {/* Modal Content */}
            <div
              className="relative bg-black aspect-[9/16] w-auto h-auto max-w-[90vw] max-h-[90vh] flex items-center justify-center rounded-lg overflow-hidden shadow-2xl z-[10000]"
              style={{ borderRadius: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={thumbnail}
                autoPlay={autoPlay}
                muted={false}
                loop
                playsInline
                className="w-full h-full object-contain aspect-[9/16] cursor-pointer"
                onClick={handleVideoClick}
              />
              {/* Play overlay if video is paused */}
              {!isPlaying && (
                <button
                  onClick={handleVideoClick}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 z-20"
                  aria-label="Play video"
                  style={{ borderRadius: 24 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="64" height="64">
                    <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.6)" />
                    <polygon points="10,8 16,12 10,16" fill="white" />
                  </svg>
                </button>
              )}
              {/* Close Button (slide out right) */}
              <button
                onClick={handleCloseFullscreen}
                className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg transition-transform hover:scale-110"
                aria-label="Close video"
                style={{ zIndex: 3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Mute/Unmute Button */}
              <button
                onClick={handleMuteToggle}
                className="absolute bottom-2 left-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg transition-transform hover:scale-110"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                style={{ zIndex: 3 }}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
      {/* Mini Modal (appears after closing fullscreen) */}
      {isMini && (
        <motion.div
          className="fixed bottom-4 right-4 w-48 h-80 sm:w-64 sm:h-[28rem] lg:w-80 lg:h-[32rem] z-[9999] shadow-2xl group"
          variants={miniVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ borderRadius: 16 }}
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.5}
          onDragEnd={(event, info) => {
            if (Math.abs(info.offset.x) > 80) {
              setIsOpen(false);
            }
          }}
        >
          <div
            className="relative bg-black w-full h-full flex items-center justify-center rounded-lg overflow-hidden"
            style={{ borderRadius: 16 }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={thumbnail}
              autoPlay
              muted={false}
              loop
              playsInline
              className="w-full h-full object-contain aspect-[9/16] cursor-pointer"
              onClick={() => setIsMini(false)}
            />
            {/* Play overlay if video is paused in mini mode */}
            {!isPlaying && (
              <button
                onClick={handleVideoClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 z-20"
                aria-label="Play video"
                style={{ borderRadius: 16 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="48" height="48">
                  <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.6)" />
                  <polygon points="10,8 16,12 10,16" fill="white" />
                </svg>
              </button>
            )}
            {/* Close Button (only on hover) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Close video"
            >
              {/* Close (X) icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Mute/Unmute Button (only on hover) */}
            <button
              onClick={handleMuteToggle}
              className="absolute bottom-2 left-2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                // Muted volume icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              ) : (
                // Unmuted volume icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default VideoModal;