import { useNavigate } from "react-router-dom";
import styles from "./tips.module.css";
import backArrow from "../../assets/arrows/backArrowGreen.svg";
import grain from "../../assets/icons/tipsIcons/grain.svg";
import milk from "../../assets/icons/tipsIcons/milk.svg";
import nuts from "../../assets/icons/tipsIcons/nut.svg";
import bean from "../../assets/icons/tipsIcons/bean.svg";
import shellfish from "../../assets/icons/tipsIcons/shellfish.svg";

export default function Tips() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLactose = () => {
    navigate("/tipsOgTricks/lactose");
  };


  return (
    <div className={styles.tipsContainer}>
      <div className={styles.tipsAllergyTop}>
        <img
          src={backArrow}
          alt="Back"
          className={styles.backArrow}
          onClick={handleGoBack}
        />
        <p className={styles.tipsTitle}>Allergi</p>
      </div>
      <div className={styles.tipsContent}>
        <button className={styles.tipButtons}>
          <span>
            <img src={grain} alt="gluten" />
          </span>
          Gluten
        </button>
        <button className={styles.tipButtons} onClick={handleLactose}>
          <span>
            <img src={milk} alt="laktose" />
          </span>
          Laktose
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={nuts} alt="nødder" />
          </span>
          Nødder
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={bean} alt="soja" />
          </span>
          Soja
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={shellfish} alt="skalddyr" />
          </span>
          Skalddyr
        </button>
      </div>
    </div>
  );
}