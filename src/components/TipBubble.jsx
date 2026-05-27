import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/themeHook";
import tipIcon from "../assets/icons/tips.svg";
import tipIconBuzzy from "../assets/icons/tipsBuzzy.svg";
import tipIconCherry from "../assets/icons/tipsCherry.svg";
import tipIconCrispy from "../assets/icons/tipsCrispy.svg";

export default function TipBubble({ setShowBubble }) {
  const { crispyTheme, buzzyTheme, cherryTheme } = useTheme();
  const bubbleRef = useRef();

  const bubbleIcon = crispyTheme
    ? tipIconCrispy
    : buzzyTheme
      ? tipIconBuzzy
      : cherryTheme
        ? tipIconCherry
        : tipIcon;

  useEffect(() => {
    function handleClickOutside(event) {
      if (bubbleRef.current && !bubbleRef.current.contains(event.target)) {
        setShowBubble(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowBubble]);

  return (
    <div ref={bubbleRef} className="tip-bubble">
      <img
        src={bubbleIcon}
        alt="her kan du finde tips og tricks"
        className="bubbleImg"
      />
    </div>
  );
}
