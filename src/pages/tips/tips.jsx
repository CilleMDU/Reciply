import { useNavigate } from "react-router-dom";
import styles from "./tips.module.css";
import allergyIcon from "../../assets/icons/tipsIcons/allergyIcon.svg";
import dietIcon from "../../assets/icons/tipsIcons/dietIcon.svg";
import storageIcon from "../../assets/icons/tipsIcons/storageIcon.svg";
import seasonIcon from "../../assets/icons/tipsIcons/seasonIcon.svg";
import timeIcon from "../../assets/icons/tipsIcons/timeIcon.svg";

export default function Tips() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/allergiTips");
  }

  return (
    <div className={styles.tipsContainer}>
      <div className={styles.tipsTop}>
        <p className={styles.tipsTitle}>Tips og tricks</p>
      </div>
      <div className={styles.tipsContent}>
        <button className={styles.tipButtons} onClick={handleNavigate}>
          <span>
            <img src={allergyIcon} alt="allergi" />
          </span>
          Allergi
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={dietIcon} alt="diæt" />
          </span>
          Diæter
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={timeIcon} alt="holdbarhedd" />
          </span>
          Holdbarhed
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={storageIcon} alt="opbevaring" />
          </span>
          Opbevaring
        </button>
        <button className={styles.tipButtons}>
          <span>
            <img src={seasonIcon} alt="sæson ingredienser" />
          </span>
          Sæson ingredienser
        </button>
      </div>
    </div>
  );
}