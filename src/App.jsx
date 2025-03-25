// App.jsx
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import image from "./assets/asd.jpg";

// Array of flashing messages
const flashMessages = [
  "Ahh!",
  "Yamate",
  "sdflşkjsşdlfkjsdf",
  "OHH",
  "seniçokseviyorumbirtanem",
  "hoyyyaaaaa",
  "fuck",
  "kendinegel",
  "her şey vatan için",
  "kendinegel",
];

function App() {
  const containerRef = useRef(null);
  const [hayirPosition, setHayirPosition] = useState(null);
  const [isEvetPressed, setIsEvetPressed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [flashingText, setFlashingText] = useState("");
  const [showFlash, setShowFlash] = useState(false);

  const showFlashingMessage = () => {
    // Select random message
    const randomIndex = Math.floor(Math.random() * flashMessages.length);
    setFlashingText(flashMessages[randomIndex]);
    
    // Show the message
    setShowFlash(true);
    
    // Hide after very brief period (100ms)
    setTimeout(() => {
      setShowFlash(false);
    }, 100);
  };
  
  const onPress = (buttonName) => {
    console.log(`Button pressed: ${buttonName}`);
  };

  // Calculate and set container dimensions
  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  };

  const randomizeHayirPosition = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      // Button dimensions (responsive)
      const buttonWidth = Math.min(160, containerWidth * 0.4); // Responsive width
      const buttonHeight = 64; 

      // Calculate maximum positions while keeping button within container
      const maxLeft = containerWidth - buttonWidth;
      const maxTop = containerHeight - buttonHeight;

      // Generate random position
      const newLeft = Math.floor(Math.random() * maxLeft);
      const newTop = Math.floor(Math.random() * maxTop);

      setHayirPosition({ left: newLeft, top: newTop });
      
      // Show flashing message when button moves
      showFlashingMessage();
    }
  };

  // Effect to set initial position and attach resize listener
  useEffect(() => {
    updateDimensions();
    
    // Add window resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Effect to update button position when dimensions change
  useEffect(() => {
    if (containerRef.current && dimensions.width > 0) {
      const containerWidth = dimensions.width;
      const containerHeight = dimensions.height;
      
      // Button width (responsive)
      const buttonWidth = Math.min(160, containerWidth * 0.4);
      
      // Position for HAYIR (centered on right side of container)
      const hayirLeft = Math.min(containerWidth / 2 + 20, containerWidth - buttonWidth - 10);
      const hayirTop = containerHeight / 2 - 32;
      
      setHayirPosition({ left: hayirLeft, top: hayirTop });
    }
  }, [dimensions]);
  
  // Effect for flashing text functionality removed from here

  const renderText = () => {
    if (!isEvetPressed)
      return (
        <p className="text-white text-center text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 md:mt-10 px-4">
          Seni üzdüğüm için özür dilerim bal bahçem benimle barışır mısın???????
        </p>
      );

    return (
      <p className="text-white text-center text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 md:mt-10 px-4">
        Cevabın evet olduğunu biliyordum 🥰 😘 😚
      </p>
    );
  };

  const renderImage = () => {
    if (!isEvetPressed) {
      return (
        <img
          src={image}
          alt="BARIŞALIM BEBEYİM"
          className="w-full h-full object-contain"
        />
      );
    }
    return (
      <img
        src="https://i.pinimg.com/originals/88/14/9b/88149b0400750578f4d07d9bc3fb0fee.gif"
        alt="Happy reconciliation"
        className="h-full w-full object-contain"
      />
    );
  };

  return (
    <div className="flex-1 bg-slate-900 min-h-screen">
      <div className="items-center justify-center min-h-screen w-full flex flex-col px-4 py-8">
        <div className="w-full md:w-4/5 lg:w-3/4 xl:w-1/2 flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          {/* GIF Container */}
          <div className="w-full rounded-lg flex items-center flex-col">
            {/* Image container with responsive height */}
            <div className="h-40 sm:h-48 md:h-64 w-full sm:w-3/4 md:w-1/2">
              {renderImage()}
            </div>
            {renderText()}
          </div>

          {/* Flashing text container - positioned absolutely in the center of the screen */}
          {!isEvetPressed && (
            <div className={`fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-75 ${showFlash ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold italic  bg-opacity-50 px-6 py-3 rounded-lg">{flashingText}</p>
            </div>
          )}
          
          {/* Buttons Container */}
          {isEvetPressed ? null : (
            <div
              ref={containerRef}
              className="w-full h-48 sm:h-56 md:h-64 rounded-lg relative mt-4"
            >
              {/* EVET button with responsive positioning */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: dimensions.width ? `${Math.max(10, dimensions.width / 2 - (dimensions.width < 640 ? 120 : 180))}px` : '10px',
                }}
              >
                <Button name="EVET" onPress={() => setIsEvetPressed(true)} />
              </div>

              {/* HAYIR button with dynamic positioning */}
              {hayirPosition && (
                <div
                  className="absolute"
                  style={{
                    left: `${hayirPosition.left}px`,
                    top: `${hayirPosition.top}px`,
                  }}
                  onMouseEnter={randomizeHayirPosition}
                  onTouchStart={randomizeHayirPosition}
                >
                  <Button name="HAYIR" onPress={() => onPress("HAYIR")} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;