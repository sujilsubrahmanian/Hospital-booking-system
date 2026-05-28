import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Detects route changes

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top
  }, [pathname]); // Runs when pathname changes

  return null; // No UI, just functionality
};

export default ScrollToTop;
