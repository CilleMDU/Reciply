import { useEffect, useState } from "react";
import styles from "./filter.module.css";
import { filterService } from "../../services/filterService";
import ErrorPopUp from "../errorPopUp/errorPopUp";
import backArrow from "../../assets/arrows/backFilter.svg";

export default function Filter({ onApplyFilter }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [filters, setFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [error, setError] = useState(null);
  const [categoriesWithFilters, setCategoriesWithFilters] = useState({});
  const [filtersByCategory, setFiltersByCategory] = useState({});

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
          const data =
            await filterService.fetchFiltersByCategory(selectedCategory);
          setFilters(data);
          const savedFilters = filtersByCategory[selectedCategory] || [];
          setSelectedFilters(savedFilters);
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
    const filterObject = filters.find((f) => f.id === filterId);

    setSelectedFilters((prev) => {
      const isSelected = prev.some((f) => f.id === filterId);
      const newFilters = isSelected
        ? prev.filter((f) => f.id !== filterId)
        : [...prev, filterObject];

      setFiltersByCategory((prevState) => ({
        ...prevState,
        [selectedCategory]: newFilters,
      }));

      setCategoriesWithFilters((prevState) => ({
        ...prevState,
        [selectedCategory]: newFilters.length > 0,
      }));

      return newFilters;
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    setFiltersByCategory({});
    setCategoriesWithFilters({});
  };

  const handleApplyFilters = () => {
    if (onApplyFilter) {
      const allFilters = Object.values(filtersByCategory).flat();
      onApplyFilter(allFilters);
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory("");
  };

  return (
    <div className={styles.filter}>
      {!selectedCategory ? (
        <>
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
                    <span
                      className={`${styles.categoryName} ${
                        categoriesWithFilters[category.id]
                          ? styles.categoryWithFilters
                          : ""
                      }`}
                    >
                      {category.title || category.name}
                    </span>
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
        </>
      ) : (
        <>
          <div className={styles.filterTop}>
            <button
              className={styles.backButton}
              onClick={handleBackToCategories}
            >
              <img
                src={backArrow}
                alt="Tilbage"
                className={styles.backFilter}
              />
            </button>
            <p>
              {categories.find((cat) => cat.id === selectedCategory)?.title ||
                categories.find((cat) => cat.id === selectedCategory)?.name}
            </p>
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
                      checked={selectedFilters.some((f) => f.id === filter.id)}
                      onChange={() => handleFilterToggle(filter.id)}
                    />
                    <span className={styles.filterName}>{filter.name}</span>
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
        </>
      )}

      {error && <p>{error}</p>}

      <ErrorPopUp
        isOpen={error !== null}
        onRetry={() => setError(null)}
        onUndo={() => setError(null)}
      />
    </div>
  );
}
