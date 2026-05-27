import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./loadingScreen.module.css";
import ziggySpin from "../../assets/lottie/ziggySpin.json";
import barLoad from "../../assets/lottie/bar.json";

export default function LoadingScreen({ progress = 0 }) {
  const ziggyRef = useRef(null);
  const barRef = useRef(null);
  const barInstanceRef = useRef(null);

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
        loop: false,
        autoplay: false,
        animationData: barLoad,
      });
      barInstanceRef.current = barInstance;
    }
    return () => {
      if (barInstance) {
        barInstance.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (barInstanceRef.current) {
      const totalFrames = barInstanceRef.current.totalFrames;
      const frameToShow = (progress / 100) * totalFrames;
      barInstanceRef.current.goToAndStop(frameToShow, true);
    }
  }, [progress]);

  return (
    <div className={styles.loadingScreen}>
      <div ref={ziggyRef} className={styles.animationContainer}></div>
      <div ref={barRef} className={styles.barContainer}></div>
    </div>
  );
}