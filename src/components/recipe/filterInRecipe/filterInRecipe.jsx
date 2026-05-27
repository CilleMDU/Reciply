import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./filterInRecipe.module.css";
import { FilterContext } from "../../../contexts/filterContext";
import add from "../../..//assets/icons/add.svg";

export default function FilterInRecipe() {
  const navigate = useNavigate();
  const { selectedFilters } = useContext(FilterContext);

  return (
    <div className={styles.filtersContent}>
      <p className={styles.sectionTitle}>Filtre</p>
      <div className={styles.selectedFilters}>
        {selectedFilters.length > 0 ? (
          <div className={styles.filterTags}>
            {selectedFilters.map((filter) => (
              <span key={filter.id} className={styles.filterTag}>
                {filter.name}
              </span>
            ))}
          </div>
        ) : (
          <p className={styles.noFilters}>Ingen filtre valgt</p>
        )}
        <button
          className={styles.addFilters}
          onClick={() => navigate("/filterAdd")}
        >
          <img src={add} alt="tilføj" />
          Rediger filtre
        </button>
      </div>
    </div>
  );
}
