import styles from "./recipeMenu.module.css";

export default function RecipeMenu({ onEdit, onDelete }) {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuEditContainer}>
        <button type="button" className={styles.menuEdit} onClick={onEdit}>
          Rediger
        </button>
      </div>
      <div className={styles.menuDeleteContainer}>
        <button type="button" className={styles.menuDelete} onClick={onDelete}>
          Slet
        </button>
      </div>
    </div>
  );
}
