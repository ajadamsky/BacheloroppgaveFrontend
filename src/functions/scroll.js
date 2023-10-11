import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ scrollRef }) {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log("scrolling to top");
    scrollRef.current.scroll(0,0);
  }, [pathname]);

  return null;
}
