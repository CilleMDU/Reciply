import styles from "./recipeDetails.module.css";
import { useState, useContext, useRef } from "react";
import { recipeService } from "../../../services/recipeService";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import backArrow from "../../../assets/arrows/backArrowGreen.svg";
import Ingrediens from "../../../components/recipe/ingrediens/ingrediens";
import Steps from "../../../components/recipe/steps/steps";
import FilterInRecipe from "../../../components/recipe/filterInRecipe/filterInRecipe";
import { FilterContext } from "../../../contexts/filterContext";

export default function RecipeDetails() {
  const [isSaving, setIsSaving] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();
  const ingredientsRef = useRef(null);
  const stepsRef = useRef(null);
  const {
    recipeId,
    title,
    setRecipeId,
    ingredients,
    setIngredients,
    steps,
    setSteps,
  } = useContext(RecipeContext);
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveRecipe = async () => {
    setIsSaving(true);
    setLoadingProgress(0);
    try {
      const currentIngredients = ingredients || [];
      const currentSteps = steps || [];

      if (currentIngredients.length === 0 || currentSteps.length === 0) {
        alert("Du skal tilføje mindst én ingrediens og ét trin");
        setIsSaving(false);
        return;
      }

      setLoadingProgress(15);
      for (const ingredient of currentIngredients) {
        await recipeService.createIngredient(recipeId, {
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }

      setLoadingProgress(50);
      for (const step of currentSteps) {
        await recipeService.createStep(recipeId, {
          description: step.description,
          step_number: step.stepNumber,
        });
      }

      setLoadingProgress(80);
      for (const filter of selectedFilters) {
        await recipeService.addRecipeFilter(recipeId, filter.id);
      }

      setLoadingProgress(100);
      setSelectedFilters([]);
      setRecipeId(null);
      setIngredients([]);
      setSteps([]);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Fejl ved oprettelse af opskrift:", error);
      alert("Der opstod en fejl. Prøv igen senere.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsTop}>
        <button className={styles.backButton} onClick={handleBack}>
          <img src={backArrow} alt="tilbage til vælg billede og titel" />
        </button>
        <p className={styles.opskriftTitle}>{title}</p>
        <button className={styles.saveButton} onClick={handleSaveRecipe}>
          Opret
        </button>
      </div>

      <div className={styles.recipeSection}>
        <Ingrediens ref={ingredientsRef} />
        <Steps ref={stepsRef} />
        <FilterInRecipe />
      </div>
    </div>
  );
}
