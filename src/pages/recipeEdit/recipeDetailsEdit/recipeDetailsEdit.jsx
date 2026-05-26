import styles from "./recipeDetailsEdit.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import { recipeService } from "../../../services/recipeService";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import backArrow from "../../../assets/arrows/backArrowGreen.svg";
import Ingrediens from "../../../components/recipe/ingrediens/ingrediens";
import Steps from "../../../components/recipe/steps/steps";
import FilterInRecipe from "../../../components/recipe/filterInRecipe/filterInRecipe";
import { FilterContext } from "../../../contexts/filterContext";

export default function RecipeDetailsEdit() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const ingredientsRef = useRef(null);
  const stepsRef = useRef(null);
  const originalIngredientsRef = useRef([]);
  const originalStepsRef = useRef([]);
  const originalFiltersRef = useRef([]);
  const {
    setRecipeId,
    title,
    description,
    image,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    setTitle,
    setDescription,
    setImage,
  } = useContext(RecipeContext);
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!recipeId) {
        setIsLoadingRecipe(false);
        return;
      }

      try {
        const recipeData = await recipeService.fetchRecipeById(recipeId);

        originalIngredientsRef.current = recipeData.ingredients || [];
        originalStepsRef.current = recipeData.steps || [];
        originalFiltersRef.current = recipeData.categories || [];

        const mappedSteps = (recipeData.steps || []).map((step) => ({
          id: step.id,
          description: step.instruction,
          stepNumber: step.step_number,
        }));

        setRecipeId(recipeData.id);
        setTitle(recipeData.title || "");
        setDescription(recipeData.information || "");
        setImage(recipeData.img || "");
        setIngredients(recipeData.ingredients || []);
        setSteps(mappedSteps);
        setSelectedFilters(recipeData.categories || []);
      } catch (error) {
        console.error("Fejl ved indlæsning af opskrift til redigering:", error);
      } finally {
        setIsLoadingRecipe(false);
      }
    };

    loadRecipe();
  }, [
    recipeId,
    setDescription,
    setImage,
    setIngredients,
    setRecipeId,
    setSelectedFilters,
    setSteps,
    setTitle,
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSaveRecipe = async () => {
    setIsSaving(true);
    setLoadingProgress(0);

    try {
      const currentIngredients = ingredients || [];
      const currentSteps = steps || [];
      const currentFilters = selectedFilters || [];

      if (currentIngredients.length === 0 || currentSteps.length === 0) {
        alert("Du skal tilføje mindst én ingrediens og ét trin");
        setIsSaving(false);
        return;
      }

      setLoadingProgress(15);

      await recipeService.updateRecipeMain(recipeId, {
        title,
        description,
        picture: image,
      });

      await Promise.all(
        (originalIngredientsRef.current || []).map((ingredient) =>
          recipeService.deleteIngredient(ingredient.id),
        ),
      );

      await Promise.all(
        (originalStepsRef.current || []).map((step) =>
          recipeService.deleteStep(step.id),
        ),
      );

      await Promise.all(
        (originalFiltersRef.current || []).map((filter) =>
          recipeService.removeRecipeFilter(recipeId, filter.id),
        ),
      );

      for (const ingredient of currentIngredients) {
        await recipeService.createIngredient(recipeId, {
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }

      for (const step of currentSteps) {
        await recipeService.createStep(recipeId, {
          description: step.description,
          step_number: step.stepNumber,
        });
      }

      for (const filter of currentFilters) {
        await recipeService.addRecipeFilter(recipeId, filter.id);
      }

      setLoadingProgress(80);

      setLoadingProgress(100);
      setSelectedFilters([]);
      setRecipeId(null);
      setIngredients([]);
      setSteps([]);
      setImage("");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Fejl ved opdatering af opskrift:", error);
      alert("Der opstod en fejl. Prøv igen senere.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingRecipe || isSaving) {
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
          Gem
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
