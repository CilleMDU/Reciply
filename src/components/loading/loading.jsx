import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loadingZiggy from "../../assets/lottie/loadingZiggy.json";
import styles from "./loading.module.css";
import logo from "../../assets/logo.svg";

export default function Loading() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = "";

      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loadingZiggy,
      });

      return () => {
        animation.destroy();
      };
    }
  }, []);

  return (
    <main className={styles.loading}>
      <img src={logo} alt="logo" />
      <div ref={containerRef} className={styles.loadingLottie}></div>
    </main>
  );
}
