import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./loadingScreen.module.css";
import ziggySpin from "../../assets/lottie/ziggySpin.json";
import barLoad from "../../assets/lottie/bar.json";

export default function LoadingScreen() {
  const ziggyRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let ziggyInstance;
    if (ziggyRef.current) {
      ziggyInstance = Lottie.loadAnimation({
        container: ziggyRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: ziggySpin,
      });
    }
    return () => {
      if (ziggyInstance) {
        ziggyInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    let barInstance;
    if (barRef.current) {
      barInstance = Lottie.loadAnimation({
        container: barRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: barLoad,
      });
    }
    return () => {
      if (barInstance) {
        barInstance.destroy();
      }
    };
  }, []);

  return (
    <div className={styles.loadingScreen}>
      <div ref={ziggyRef} className={styles.animationContainer}></div>
      <div ref={barRef} className={styles.barContainer}></div>
    </div>
  );
}