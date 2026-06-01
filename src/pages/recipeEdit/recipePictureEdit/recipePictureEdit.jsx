import styles from "./recipePictureEdit.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import { recipeService } from "../../../services/recipeService";
import { filterService } from "../../../services/filterService";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import exit from "../../../assets/icons/exit.svg";

export default function RecipePictureEdit() {
  const { recipeId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);
  const descriptionTextareaRef = useRef(null);
  const navigate = useNavigate();
  const {
    setRecipeId,
    setTitle: setContextTitle,
    setDescription: setContextDescription,
  } = useContext(RecipeContext);

  useEffect(() => {
    if (descriptionTextareaRef.current) {
      descriptionTextareaRef.current.style.height = "auto";
      descriptionTextareaRef.current.style.height =
        descriptionTextareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsUploading(true);
      setLoadingProgress(0);

      try {
        setLoadingProgress(30);
        await filterService.fetchCategories();

        setLoadingProgress(70);
        await filterService.fetchAllFilters();

        if (recipeId) {
          setLoadingProgress(85);
          const existingRecipe = await recipeService.fetchRecipeById(recipeId);
          setTitle(existingRecipe.title || "");
          setDescription(existingRecipe.information || "");
          setImagePreview(existingRecipe.img || null);
          setContextTitle(existingRecipe.title || "");
          setContextDescription(existingRecipe.information || "");
        }

        setLoadingProgress(100);
        setTimeout(() => setIsUploading(false), 500);
      } catch (error) {
        console.error("Error loading initial data:", error);
        setIsUploading(false);
      } finally {
        setIsLoadingRecipe(false);
      }
    };

    loadInitialData();
  }, [recipeId, setContextDescription, setContextTitle]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleNext = async () => {
    if (!title || !description || (!selectedFile && !imagePreview)) {
      alert("Please fill in title, description, and select an image");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = imagePreview;

      if (selectedFile) {
        imageUrl = await recipeService.uploadRecipeImage(selectedFile);
      }

      const result = await recipeService.updateRecipeMain(recipeId, {
        title,
        description,
        picture: imageUrl,
      });

      const updatedRecipeId = result?.[0]?.id || recipeId;

      setRecipeId(updatedRecipeId);
      setContextTitle(title);
      setContextDescription(description);

      navigate(`/editRecipeDetails/${updatedRecipeId}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleExit = () => {
    navigate(-1);
  };

  const handleRemovePicture = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  if (isLoadingRecipe) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className={styles.container}>
      {isUploading ? (
        <LoadingScreen progress={loadingProgress} />
      ) : (
        <>
          <div className={styles.recipeUpload}>
            <div className={styles.recipeTopFirst}>
              <img
                src={exit}
                alt="fortryd"
                className={styles.exitIcon}
                onClick={handleExit}
              />
              <p className={styles.opslagNyt}>Rediger opslag</p>
              <button onClick={handleNext} className={styles.nextButton}>
                Næste
              </button>
            </div>
            <div className={styles.recipeTitle}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel"
              />
            </div>
            <div className={styles.recipePictureAndUpload}>
              <div className={styles.pictureUpload}>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {imagePreview && (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className={styles.previewImage}
                    />
                    <button
                      onClick={handleRemovePicture}
                      className={styles.removeButton}
                    >
                      <img
                        src={exit}
                        alt="Fjern billede"
                        className={styles.removeIcon}
                      />
                    </button>
                  </div>
                )}
                <button
                  onClick={handlePictureClick}
                  className={`${styles.addPicture} ${imagePreview ? styles.pictureSelected : ""}`}
                >
                  Tilføj billede
                </button>
              </div>
            </div>
            <div className={styles.recipeDescription}>
              <textarea
                ref={descriptionTextareaRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Hvad har du at sige om denne opskrift?"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
