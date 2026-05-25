import styles from "./recipedetails.module.css";
import { useState, useContext } from "react";
import { recipeService } from "../../../services/recipeService";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import backArrow from "../../../assets/arrows/backArrowGreen.svg";
import remove from "../../../assets/icons/exit.svg";
import { FilterContext } from "../../../contexts/filterContext";

export default function RecipeDetails() {
  const [isSaving, setIsSaving] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" });
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState("");
  const navigate = useNavigate();
  const { recipeId, title } = useContext(RecipeContext);
  const { selectedFilters } = useContext(FilterContext);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() && newIngredient.amount.trim()) {
      setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
      setNewIngredient({ name: "", amount: "" });
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      const stepNumber = steps.length + 1;
      setSteps([
        ...steps,
        { description: newStep, stepNumber, id: Date.now() },
      ]);
      setNewStep("");
    }
  };

  const handleDeleteStep = (id) => {
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleSaveRecipe = async () => {
    if (ingredients.length === 0 || steps.length === 0) {
      alert("Tilføj venligst mindst én ingrediens og ét trin.");
      return;
    }
    setIsSaving(true);
    try {
      for (const ingredient of ingredients) {
        await recipeService.createIngredient(recipeId, {
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
      for (const step of steps) {
        await recipeService.createStep(recipeId, {
          description: step.description,
          step_number: step.stepNumber,
        });
      }
      for (const filterId of selectedFilters) {
        await recipeService.addRecipeCategory(recipeId, filterId);
      }
      navigate("/");
    } catch (error) {
      console.error("Fejl ved oprettelse af opskrift:", error);
      alert("Der opstod en fejl. Prøv igen senere.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) {
    return <LoadingScreen />;
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

      <div className={styles.ingredientsContent}>
        <p className={styles.sectionTitle}>Ingredienser</p>
        <div className={styles.ingredientsList}>
          <input
            type="text"
            placeholder="Navn"
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, name: e.target.value })
            }
            className={styles.ingredientName}
          />
          <input
            type="text"
            placeholder="Mængde"
            value={newIngredient.amount}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, amount: e.target.value })
            }
            className={styles.ingredientAmount}
          />
          <button
            onClick={handleAddIngredient}
            className={styles.addIngredient}
          >
            Tilføj ingrediens
          </button>
          {ingredients.map((ing) => (
            <div key={ing.id} className={styles.ingredientItem}>
              <span>
                {ing.name} - {ing.amount}
              </span>
              <button
                onClick={() => handleDeleteIngredient(ing.id)}
                className={styles.deleteIngredient}
              >
                <img src={remove} alt="fjern ingrediens" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.instructionsContent}>
        <p className={styles.sectionTitle}>Fremgangsmåde</p>
        <div className={styles.instructionsList}>
          <textarea
            placeholder="Beskriv første trin..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            className={styles.instructionInput}
          />
          <button onClick={handleAddStep} className={styles.addInstruction}>
            Tilføj trin
          </button>
          {steps.map((step) => (
            <div key={step.id} className={styles.instructionItem}>
              <span>
                Trin {step.step_number}: {step.description}
              </span>
              <button
                onClick={() => handleDeleteStep(step.id)}
                className={styles.deleteInstruction}
              >
                <img src={remove} alt="fjern trin" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.filtersContent}>
        <p className={styles.sectionTitle}>Filtre</p>
        <div className={styles.selectedFilters}>
          {selectedFilters.length > 0 ? (
            <p className={styles.filterCount}>
              {selectedFilters.length} filter(s) valgt
            </p>
          ) : (
            <p className={styles.noFilters}>Ingen filtre valgt</p>
          )}
          <button
            className={styles.editFiltersButton}
            onClick={() => navigate("/filterAdd")}
          >
            Vælg filtre
          </button>
        </div>
      </div>
    </div>
  );
}
