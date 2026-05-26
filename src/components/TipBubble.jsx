import { useEffect, useRef } from "react";
import tipIcon from "../assets/icons/tips.svg";

export default function TipBubble({
  setShowBubble,
}) {
  const bubbleRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(
          event.target
        )
      ) {
        setShowBubble(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      ref={bubbleRef}
      className="tip-bubble"
    >
      <img src={tipIcon} alt="her kan du finde tips og tricks"/>
        </div>
  );
}