import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Filter from "../../components/filter/filter";
import { FilterContext } from "../../contexts/filterContext";
import styles from "./filterAdd.module.css";
import back from "../../assets/arrows/backArrowGreen.svg";

export default function FilterAdd() {
  const navigate = useNavigate();
  const { setSelectedFilters } = useContext(FilterContext);

  const handleApplyFilter = (selectedFilters) => {
    setSelectedFilters(selectedFilters);
    navigate("/recipeDetails");
  };

    return (
      <div className={styles.filterAddContainer}>
        <div className={styles.filterAddTop}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <img src={back} alt="tilbage til opskriftsdetaljer" />
            </button>
             <p className={styles.filterAddTitle}>
            Vælg de filtre der passer til dine opskrifter
          </p>
        </div>
        <Filter onApplyFilter={handleApplyFilter} />
      </div>
    );
}