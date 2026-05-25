import styles from "./errorPopUp.module.css";
import ziggy from "../../assets/mascots/mascotsConfused/ziggyConfused.svg";

export default function ErrorPopUp({ onRetry, onUndo, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className={styles.errorContent}>
        <div className={styles.errorModal}>
            <div className={styles.errorTop}>
                <p>Så øøh... noget gik galt. <br /> Hvad skal vi gøre ved det?</p>
            </div>
            <div className={styles.confusedMascot}>
                <img src={ziggy} alt="forvirret maskot" />
            </div>
            <div className={styles.errorButtons}>
                <button className={styles.retry} onClick={onRetry}>Prøv igen</button>
                <button className={styles.undo} onClick={onUndo}>Fortryd</button>
            </div>
        </div>
    </div>
  );
}