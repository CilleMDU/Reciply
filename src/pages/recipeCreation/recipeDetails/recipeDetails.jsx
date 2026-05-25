import styles from "./recipedetails.module.css";
import { useState, useContext } from "react";
import { recipeService } from "../../../services/recipeService";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import backArrow from "../../../assets/arrows/backArrowGreen.svg";

export default function RecipeDetails() {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { recipeId, title, description } = useContext(RecipeContext);

  const handleBack = () => {
    navigate("/createRecipeFirst");
  };

    if (isSaving) {
        return <LoadingScreen/>;
    };

    return (
        <div className={styles.detailsContainer}>
            <div className= {styles.detailsTop}>
                <button className={styles.backButton} onClick={handleBack}>
                    <img src={backArrow} alt="tilbage til vælg billede og titel" />
                </button>
                <p className={styles.nytOpslag}>Nyt opslag</p>
                <button className={styles.saveButton}>
                    Opret
                </button>
            </div>
        </div>






    )
}