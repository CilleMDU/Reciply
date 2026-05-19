import { useNavigate } from "react-router-dom";
import styles from "./errorPage.module.css";
import ziggyConfused from "../../assets/mascots/mascotsConfused/ziggyConfused.svg";
import backArrow from "../../assets/arrows/backArrow.svg";
import logo from "../../assets/logo.svg";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.errorPage}>
      <img src={logo} className={styles.logo} alt="Reciply logo" />
      <h2 className={styles.errorCode}>Fejlkode 404 - Side ikke fundet</h2>
      <p className={styles.errorMessage}>Øøøh... siden er væk!</p>
      <img
        src={ziggyConfused}
        className={styles.errorImage}
        alt="Forvirret maskot Ziggy"
      />
      <button className={styles.errorButton} onClick={() => navigate("/")}>
        <img src={backArrow} alt="Tilbage til feed" />
        Tilbage til Feed
      </button>
    </main>
  );
}
