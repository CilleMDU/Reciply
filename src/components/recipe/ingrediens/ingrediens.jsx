import {
  useState,
  useImperativeHandle,
  forwardRef,
  useContext,
  useEffect,
} from "react";
import styles from "./ingrediens.module.css";
import remove from "../../../assets/icons/exit.svg";
import add from "../../../assets/icons/add.svg";
import edit from "../../../assets/icons/edit.svg";
import check from "../../../assets/icons/check.svg";
import { RecipeContext } from "../../../contexts/recipeContext";

const Ingrediens = forwardRef((props, ref) => {
  const {
    ingredients: contextIngredients,
    setIngredients: setContextIngredients,
  } = useContext(RecipeContext);
  const [ingredients, setIngredients] = useState(contextIngredients || []);
  const [newIngredient, setNewIngredient] = useState({ name: "", amount: "" });
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [confirmedIngredients, setConfirmedIngredients] = useState(new Set());
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [editedIngredient, setEditedIngredient] = useState({
    name: "",
    amount: "",
  });

  useEffect(() => {
    setContextIngredients(ingredients);
  }, [ingredients, setContextIngredients]);

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() && newIngredient.amount.trim()) {
      const newId = Date.now();
      setIngredients([...ingredients, { ...newIngredient, id: newId }]);
      setConfirmedIngredients(new Set([...confirmedIngredients, newId]));
      setNewIngredient({ name: "", amount: "" });
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const handleConfirmIngredient = (id) => {
    const newConfirmed = new Set(confirmedIngredients);
    if (newConfirmed.has(id)) {
      newConfirmed.delete(id);
    } else {
      newConfirmed.add(id);
    }
    setConfirmedIngredients(newConfirmed);
  };

  const handleEditIngredient = (ing) => {
    setEditingIngredientId(ing.id);
    setEditedIngredient({ name: ing.name, amount: ing.amount });
  };

  const handleSaveEditedIngredient = (id) => {
    if (editedIngredient.name.trim() && editedIngredient.amount.trim()) {
      setIngredients(
        ingredients.map((ing) =>
          ing.id === id
            ? {
                ...ing,
                name: editedIngredient.name,
                amount: editedIngredient.amount,
              }
            : ing,
        ),
      );
      setEditingIngredientId(null);
      setEditedIngredient({ name: "", amount: "" });
    }
  };

  useImperativeHandle(ref, () => ({
    getIngredients: () => ingredients,
  }));

  return (
    <div className={styles.ingredientsContent}>
      <p className={styles.sectionTitle}>Ingredienser</p>
      <div className={styles.ingredientsList}>
        {ingredients.map((ing) => (
          <div key={ing.id} className={styles.ingredientItem}>
            {editingIngredientId === ing.id ? (
              <>
                <input
                  type="text"
                  value={editedIngredient.name}
                  onChange={(e) =>
                    setEditedIngredient({
                      ...editedIngredient,
                      name: e.target.value,
                    })
                  }
                  className={styles.ingredientName}
                />
                <input
                  type="text"
                  value={editedIngredient.amount}
                  onChange={(e) =>
                    setEditedIngredient({
                      ...editedIngredient,
                      amount: e.target.value,
                    })
                  }
                  className={styles.ingredientAmount}
                />
                <button
                  onClick={() => handleSaveEditedIngredient(ing.id)}
                  className={styles.saveEditIngredient}
                >
                  <img src={check} alt="gem ingrediens" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleDeleteIngredient(ing.id)}
                  className={styles.deleteIngredient}
                >
                  <img src={remove} alt="fjern ingrediens" />
                </button>
                <div className={styles.ingNameContainer}>
                  <span className={styles.ingName}>{ing.name}</span>
                </div>
                <div className={styles.ingAmountContainer}>
                  <span className={styles.ingAmount}>{ing.amount}</span>
                </div>
                {confirmedIngredients.has(ing.id) ? (
                  <button
                    onClick={() => handleEditIngredient(ing)}
                    className={styles.editIngredient}
                  >
                    <img src={edit} alt="rediger ingrediens" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleConfirmIngredient(ing.id)}
                    className={`${styles.confirmIngredient} ${confirmedIngredients.has(ing.id) ? styles.confirmed : ""}`}
                  >
                    <img src={check} alt="bekræft ingrediens" />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
        {showIngredientForm && (
          <div className={styles.ingredientInputs}>
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
                setNewIngredient({
                  ...newIngredient,
                  amount: e.target.value,
                })
              }
              className={styles.ingredientAmount}
            />
            <button
              onClick={() => {
                if (newIngredient.name.trim() && newIngredient.amount.trim()) {
                  handleAddIngredient();
                  setShowIngredientForm(false);
                }
              }}
              className={styles.confirmAddIngredient}
            >
              <img src={check} alt="bekræft tilføj ingrediens" />
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          if (
            showIngredientForm &&
            newIngredient.name.trim() &&
            newIngredient.amount.trim()
          ) {
            handleAddIngredient();
            setShowIngredientForm(false);
          } else {
            setShowIngredientForm(!showIngredientForm);
          }
        }}
        className={styles.addIngredient}
      >
        <img src={add} alt="tilføj" />
        {showIngredientForm ? "Tilføj ingrediens" : "Tilføj ingrediens"}
      </button>
    </div>
  );
});

export default Ingrediens;
