import { useEffect, useState } from "react";
import styles from "./filter.module.css";
import { filterService } from "../../services/filterService";
// import Lottie from "lottie-react";
// import loadingZiggy from "../../assets/lottie/loadingZiggy.json";
import ErrorPopUp from "../errorPopUp/errorPopUp";

export default function Filter({ onApplyFilter }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await filterService.fetchCategories();
        console.log("Categories data:", data);
        if (data && data.length > 0) {
          console.log("First category object keys:", Object.keys(data[0]));
          console.log("First category object:", data[0]);
        }
        setCategories(data);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const loadFilters = async () => {
        try {
          setIsLoadingFilters(true);
          setFilters([]);
          setSelectedFilters([]);
          const data =
            await filterService.fetchFiltersByCategory(selectedCategory);
          setFilters(data);
        } catch (err) {
          setError(err.message || "Failed to load filters");
        } finally {
          setIsLoadingFilters(false);
        }
      };
      loadFilters();
    }
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterToggle = (filterId) => {
    setSelectedFilters((prev) => {
      if (prev.includes(filterId)) {
        return prev.filter((id) => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const handleApplyFilters = () => {
    if (onApplyFilter) {
      onApplyFilter(selectedFilters);
    }
  };

  return (
    <div className={styles.filter}>
      <div className={styles.categoryTop}>
        <p>Vælg kategori</p>
      </div>

      <div className={styles.categories}>
        {isLoadingCategories ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <label key={category.id} className={styles.categoryOptions}>
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <span>{category.title || category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filters}>
        {isLoadingFilters ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.filterList}>
            {filters.map((filter) => (
              <label key={filter.id} className={styles.filterOptions}>
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.id)}
                  onChange={() => handleFilterToggle(filter.id)}
                />
                <span>{filter.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterButtons}>
        <button className={styles.clearButton} onClick={handleClearFilters}>
          Ryd filtre
        </button>
        <button className={styles.applyButton} onClick={handleApplyFilters}>
          Anvend filtre
        </button>
      </div>

      {error && <p>{error}</p>}

      <ErrorPopUp
        isOpen={error !== null}
        onRetry={() => setError(null)}
        onUndo={() => setError(null)}
      />
    </div>
  );
}
