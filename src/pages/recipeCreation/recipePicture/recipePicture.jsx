import styles from "./recipePicture.module.css";
import { useState, useContext } from "react";
import { recipeService } from "../../../services/recipeService";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loadingScreen/loadingScreen";
import { RecipeContext } from "../../../contexts/recipeContext";
import exit from "../../../assets/icons/exit.svg";

export default function RecipePicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const {
    setRecipeId,
    setTitle: setContextTitle,
    setDescription: setContextDescription,
  } = useContext(RecipeContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create preview URL
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
    if (!title || !description || !selectedFile) {
      alert("Please fill in title, description, and select an image");
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await recipeService.uploadRecipeImage(selectedFile);
      const result = await recipeService.createRecipeMain({
        title,
        description,
        picture: imageUrl,
      });
      const newRecipeId = result[0].id;

      setRecipeId(newRecipeId);
      setContextTitle(title);
      setContextDescription(description);

      navigate("/recipeDetails");
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Failed to create recipe. Please try again.");
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

  return (
    <div className={styles.container}>
      {isUploading ? (
        <LoadingScreen />
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
              <p className={styles.opslagNyt}>Nyt opslag</p>
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
