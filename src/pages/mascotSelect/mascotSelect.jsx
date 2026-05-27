import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import styles from "./mascotSelect.module.css";
import crispy from "../../assets/mascots/crispy.svg";
import buzzy from "../../assets/mascots/buzzy.svg";
import cherry from "../../assets/mascots/cherry.svg";
import ziggy from "../../assets/mascots/ziggy.svg";
import exit from "../../assets/icons/exit.svg";
import LoadingScreen from "../../components/loadingScreen/loadingScreen";
import logo from "../../assets/logo.svg";
import ErrorPopUp from "../../components/errorPopUp/errorPopUp";

export default function MascotSelect() {
  const navigate = useNavigate();
  const {
    crispyTheme,
    setCrispyTheme,
    buzzyTheme,
    setBuzzyTheme,
    cherryTheme,
    setCherryTheme,
  } = useContext(ThemeContext);
  const [selection, setSelection] = useState(() =>
    crispyTheme
      ? "crispy"
      : buzzyTheme
        ? "buzzy"
        : cherryTheme
          ? "cherry"
          : null,
  );
  const [isSaving] = useState(false);
  const [error] = useState(null);

  const handleSelectCrispy = () => {
    setCrispyTheme(true);
    setBuzzyTheme(false);
    setCherryTheme(false);
    setSelection("crispy");
  };

  const handleSelectBuzzy = () => {
    setBuzzyTheme(true);
    setCrispyTheme(false);
    setCherryTheme(false);
    setSelection("buzzy");
  };

  const handleSelectCherry = () => {
    setCherryTheme(true);
    setCrispyTheme(false);
    setBuzzyTheme(false);
    setSelection("cherry");
  };

  const handleSelectZiggy = () => {
    setCrispyTheme(false);
    setBuzzyTheme(false);
    setCherryTheme(false);
    setSelection(null);
  };

  const handleSaveTheme = () => {
    navigate("/");
  };

  const handleExit = () => {
    navigate(-1);
  };

  return (
    <div className={styles.mascotDisplay}>
      {isSaving ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorPopUp />
      ) : (
        <>
          <div className={styles.mascotContainer}>
            <div className={styles.mascotTop}>
                <img src={logo} alt="Reciply logo" className={styles.logo} />
              <img
                src={exit}
                alt="fortryd"
                className={styles.exitIcon}
                onClick={handleExit}
              />
            </div>
            <div className={styles.mascotText}>
              <p className={styles.mascotTitle}>Vælg en makker til rejsen</p>
            </div>
            <div className={styles.mascotOptions}>
                <div className={styles.btnAndName}>
                    <button className={`${styles.mascotButton} ${selection === "crispy" ? styles.selected : ""}`} onClick={handleSelectCrispy}>
                        <img src={crispy} alt="Crispy mascot" className={styles.crispyImg} />
                    </button>
                    <p className={styles.mascotName}>Crispy</p>
                </div>
                <div className={styles.btnAndName}>
                    <button className={`${styles.mascotButton} ${selection === "buzzy" ? styles.selected : ""}`} onClick={handleSelectBuzzy}>
                        <img src={buzzy} alt="Buzzy mascot" className={styles.buzzyImg} />
                    </button>
                    <p className={styles.mascotName}>Buzzy</p>
                </div>
                <div className={styles.btnAndName}>
                    <button className={`${styles.mascotButton} ${selection === "cherry" ? styles.selected : ""}`} onClick={handleSelectCherry}>
                        <img src={cherry} alt="Cherry mascot" className={styles.cherryImg} />
                    </button>
                    <p className={styles.mascotName}>Cheeky & Squeaky</p>
                </div>
                <div className={styles.btnAndName}>
                    <button className={`${styles.mascotButton} ${selection === null ? styles.selected : ""}`} onClick={handleSelectZiggy}>
                        <img src={ziggy} alt="Ziggy mascot" className={styles.ziggyImg} />
                    </button>
                    <p className={styles.mascotName}>Ziggy</p>
                </div>
            </div>
            <button className={styles.saveButton} onClick={handleSaveTheme}>
              Gem valg
            </button>
          </div>
        </>
      )}
    </div>
  );
}
