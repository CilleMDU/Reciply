import { useNavigate } from "react-router-dom";
import styles from "./lactose.module.css";
import backArrow from "../../../assets/arrows/backArrowGreen.svg";

export default function Lactose() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
      <div className={styles.lactoseContainer}>
        <div className={styles.topLactose}>
          <button className={styles.backButton} onClick={handleGoBack}>
            <img src={backArrow} alt="tilbage" />
          </button>
          <p className={styles.lactoseTitle}>Allergi - Laktose</p>
        </div>
        <div className={styles.lactoseContent}>
          <div className={styles.textContainer}>
            <p className={styles.lactoseTitles}>Kend dine grænser</p>
            <p className={styles.lactoseText}>
              Tilstanden er ufarlig, og de fleste med laktoseintolerance kan
              tåle op til 1/4 liter almindelig mælk om dagen uden at få ubehag.
              Prøv dig forsigtigt frem.
            </p>
          </div>

          <div className={styles.textContainer}>
            <p className={styles.lactoseTitles}>Alternativer</p>
            <p className={styles.lactoseText}>
              Udskift traditionel mælk, fløde og yoghurt med laktosefrie
              produkter, eller brug plantedrikke som havre- og mandelmælk.
            </p>
          </div>

          <div className={styles.textContainer}>
            <p className={styles.lactoseTitles}>Hjælpemidler</p>
            <p className={styles.lactoseText}>
              Hvis du skal spise ude eller ved særlige lejligheder vil nyde
              almindelig mad med laktose, kan du tage et enzymtilskud (kaldet
              laktase).
            </p>
          </div>

          <div className={styles.textContainer}>
            <p className={styles.lactoseTitles}>Varedeklarationen</p>
            <p className={styles.lactoseText}>
              Vær opmærksom på skjult laktose i forarbejdede fødevarer,
              færdigretter og visse typer chokolade.
            </p>
          </div>
        </div>
      </div>
    );
}