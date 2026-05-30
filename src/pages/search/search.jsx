import { useEffect, useMemo, useState } from "react";
import { recipeService } from "../../services/recipeService";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/filter/filter";
import { useTheme } from "../../hooks/themeHook";
import styles from "./search.module.css";
import searchIcon from "../../assets/navIcons/søgInaktiv.svg";
import logo from "../../assets/logo.svg";
import ziggy from "../../assets/mascots/ziggy.svg";
import buzzy from "../../assets/mascots/buzzy.svg";
import cherry from "../../assets/mascots/cherry.svg";
import crispy from "../../assets/mascots/crispy.svg";
import clear from "../../assets/icons/exit.svg";

export default function Search() {
  const { crispyTheme, buzzyTheme, cherryTheme } = useTheme();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await recipeService.fetchAllRecipes();
        const baseRecipes = data || [];

        const recipesWithRelations = await Promise.all(
          baseRecipes.map(async (recipe) => {
            try {
              const fullRecipe = await recipeService.fetchRecipeById(recipe.id);

              return {
                ...recipe,
                ...fullRecipe,
                img: fullRecipe.img || recipe.img || "",
              };
            } catch {
              return {
                ...recipe,
                img: recipe.img || "",
                categories: recipe.categories || [],
              };
            }
          }),
        );

        setRecipes(recipesWithRelations);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const filteredRecipes = useMemo(() => {
    let next = recipes || [];
    const normalize = (value) =>
      String(value ?? "")
        .trim()
        .toLowerCase();

    if (searchTerm) {
      next = next.filter((r) =>
        (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (activeFilters.length > 0) {
      next = next.filter((r) => {
        const recipeFilters = r.categories || r.filters || r.tags || [];
        return activeFilters.every((f) =>
          recipeFilters.some(
            (rf) =>
              normalize(rf?.id ?? rf?.filter_id ?? rf) === normalize(f?.id) ||
              normalize(rf?.name ?? rf) === normalize(f?.name),
          ),
        );
      });
    }

    return next;
  }, [recipes, searchTerm, activeFilters]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleApplyFilter = (selected) => setActiveFilters(selected || []);
  const handleRemoveFilter = (id) =>
    setActiveFilters((cur) => cur.filter((f) => f.id !== id));
  const clearSearch = () => setSearchTerm("");
  const ziggyImage = crispyTheme
    ? crispy
    : buzzyTheme
      ? buzzy
      : cherryTheme
        ? cherry
        : ziggy;

  useEffect(() => {
    const onDocClick = (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (el.tagName === "BUTTON") {
          const text = (el.textContent || "").trim();
          const cls = (el.className || "").toString();
          if (/Ryd\s*filtre/i.test(text) || cls.includes("clearButton")) {
            setActiveFilters([]);
            return;
          }
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchTop}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.searchBar}>
        <img src={searchIcon} alt="Søg" className={styles.searchIcon} />
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Søg efter opskrifter..."
          className={styles.searchInput}
        />
        {searchTerm && (
          <button className={styles.clearButton} onClick={clearSearch}>
            <img src={clear} alt="clear" />
          </button>
        )}
      </div>

      <Filter onApplyFilter={handleApplyFilter} />

      <div className={styles.activeFilters}>
        {activeFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => handleRemoveFilter(f.id)}
            className={styles.activeFilterBtn}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className={styles.searchResults}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img
              src={recipe.img}
              alt={recipe.title}
              onClick={() => handleRecipeClick(recipe.id)}
            />
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className={styles.noResults}>
          <p className={styles.noResultsText}>
            Vi har ikke denne opskrift. Skal vi lave den først?
          </p>
          <img src={ziggyImage} alt="Ziggy" className={styles.ziggy} />
        </div>
      )}
    </div>
  );
}
