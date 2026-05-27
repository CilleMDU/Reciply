import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import styles from "./loadingScreen.module.css";
import ziggySpin from "../../assets/lottie/ziggySpin.json";
import buzzySpin from "../../assets/lottie/buzzySpin.json";
import cherrySpin from "../../assets/lottie/cherrySpin.json";
import crispySpin from "../../assets/lottie/crispySpin.json";
import barLoad from "../../assets/lottie/bar.json";
import { useTheme } from "../../hooks/themeHook";
import logo from "../../assets/logo.svg";

export default function LoadingScreen({ progress = 0 }) {
  const { crispyTheme, buzzyTheme, cherryTheme } = useTheme();
  const ziggyRef = useRef(null);
  const barRef = useRef(null);
  const barInstanceRef = useRef(null);

  const mascotSpin = crispyTheme
    ? crispySpin
    : buzzyTheme
      ? buzzySpin
      : cherryTheme
        ? cherrySpin
        : ziggySpin;

  useEffect(() => {
    let ziggyInstance;
    if (ziggyRef.current) {
      ziggyInstance = Lottie.loadAnimation({
        container: ziggyRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: mascotSpin,
      });
    }
    return () => {
      if (ziggyInstance) {
        ziggyInstance.destroy();
      }
    };
  }, [mascotSpin]);

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
    <div className={styles.loadingContainer}>
      <img src={logo} alt="Reciply Logo" className={styles.logo} />
      <div className={styles.loadingScreen}>
        <div ref={ziggyRef} className={styles.animationContainer}></div>
        <div ref={barRef} className={styles.barContainer}></div>
      </div>
    </div>
  );
}
