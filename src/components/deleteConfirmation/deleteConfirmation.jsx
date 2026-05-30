import styles from "./deleteConfirmation.module.css";
import sadZiggy from "../../assets/mascots/mascotsSad/sadZiggy.svg";

export default function DeleteConfirmation({ onCancel, onDelete }) {
  return (
    <div className={styles.confirmationContainer}>
      <p className={styles.confirmationText}>
        Skal vi virkelig slette den lækre opskrift?
      </p>
      <img src={sadZiggy} alt="Sad Ziggy" className={styles.sadZiggy} />
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Annuller
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          Slet
        </button>
      </div>
    </div>
  );
}
