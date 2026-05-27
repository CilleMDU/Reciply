import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./recipeDisplay.module.css";
import { recipeService } from "../../services/recipeService";
import LoadingScreen from "../../components/loadingScreen/loadingScreen";
import backArrow from "../../assets/arrows/backArrowGreen.svg";
import ErrorPopUp from "../../components/errorPopUp/errorPopUp";
import add from "../../assets/icons/addToList.svg";
import RecipeMenu from "../../components/recipeMenu/recipeMenu";
import DeleteConfirmation from "../../components/deleteConfirmation/deleteConfirmation";

export default function RecipeDisplay() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isAddedToList, setIsAddedToList] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleAddToList = () => {
    setIsAddedToList(!isAddedToList);
  };

  const handleOpenMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleEdit = () => {
    navigate(`/edit/${recipeId}`);
  };

  const handleOpenConfirmation = () => {
    setShowMenu(false);
    setShowDeleteConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      await recipeService.deleteRecipe(recipeId);
      setShowDeleteConfirmation(false);
      navigate("/");
    } catch (deleteError) {
      console.error("Error deleting recipe:", deleteError);
    }
  };

  useEffect(() => {
    const loadRecipe = async () => {
      if (!recipeId) {
        setError("No recipe ID provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadingProgress(0);

      try {
        setLoadingProgress(30);
        const recipeData = await recipeService.fetchRecipeById(recipeId);

        setLoadingProgress(100);
        setRecipe(recipeData);
        setTimeout(() => setIsLoading(false), 500);
      } catch (err) {
        console.error("Error loading recipe:", err);
        setError("Failed to load recipe. Please try again later.");
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.recipeDisplay}>
      {isLoading ? (
        <LoadingScreen progress={loadingProgress} />
      ) : error ? (
        <ErrorPopUp />
      ) : recipe ? (
        <>
          <div className={styles.displayContainer}>
            <div className={styles.displayTop}>
              <button className={styles.backButton} onClick={handleBack}>
                <img src={backArrow} alt="Tilbage" />
              </button>
              <p className={styles.recipeTitle}>{recipe.title}</p>
              <div className={styles.menuContainer}>
                <button className={styles.menuButton} onClick={handleOpenMenu}>
                  ...
                </button>
              </div>
            </div>

            {showMenu && (
              <div className={styles.menuOverlay} onClick={handleCloseMenu}>
                <div
                  className={styles.menuContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <RecipeMenu
                    onEdit={handleEdit}
                    onDelete={handleOpenConfirmation}
                  />
                </div>
              </div>
            )}

            {showDeleteConfirmation && (
              <div
                className={styles.backdrop}
                onClick={handleCloseConfirmation}
              >
                <div
                  className={styles.popup}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DeleteConfirmation
                    onCancel={handleCloseConfirmation}
                    onConfirm={handleDelete}
                  />
                </div>
              </div>
            )}

            <div className={styles.displayImage}>
              <img src={recipe.img} alt={recipe.title} />
            </div>

            <div className={styles.displayFilters}>
              {recipe.categories?.map((filters) => (
                <span key={filters.id} className={styles.filterTag}>
                  {filters.name}
                </span>
              ))}
            </div>

            <div className={styles.displayIngredients}>
              <p className={styles.sectionsTitles}>Ingredienser</p>
              <ul className={styles.ingredientsList}>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.displayAddToList}>
              <button
                className={`${styles.addToListButton} ${isAddedToList ? styles.added : styles.notAdded}`}
                onClick={handleAddToList}
              >
                {isAddedToList ? "Lagt i indkøbsliste" : "Læg i indkøbsliste"}
                <img
                  src={add}
                  alt="Tilføj til indkøbsliste"
                  className={styles.addIcon}
                />
              </button>
            </div>

            <div className={styles.displaySteps}>
              <p className={styles.sectionsTitles}>Fremgangsmåde</p>
              <ol className={styles.stepsList}>
                {recipe.steps.map((step) => (
                  <li key={step.id}>{step.instruction}</li>
                ))}
              </ol>
            </div>

            <div className={styles.displayDescription}>
              <p className={styles.sectionsTitles}>Extra informationer</p>
              <p className={styles.description}>{recipe.information}</p>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <p>No recipe data available</p>
        </div>
      )}
    </div>
  );
}
