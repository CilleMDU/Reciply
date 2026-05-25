import { useEffect, useRef } from "react";

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
      <h3>Lækre tips og tricks</h3>
        <div className="tipBrod">
            <p>
            Så kan vi se hvad man kan
            erstatte sukker med
            </p>
            <div className="ziggyBox">
                  <img className="ziggyTip" src="src/assets/mascots/ziggy.svg" alt="ziggy" />
            </div>
        </div>
        </div>
  );
}