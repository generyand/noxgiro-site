import { useState, useEffect } from 'react';

export function useKeyboardAware() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(keyboardHeight);
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    
    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  return keyboardHeight;
}