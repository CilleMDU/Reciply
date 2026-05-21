import Filter from "../../components/filter/filter";
import styles from "./filterPreview.module.css";

export default function FilterPreview() {
  const handleApplyFilter = (selectedFilters) => {
    console.log("Applied filters:", selectedFilters);
  };

  return (
    <div className={styles.previewContainer}>
      <h1>Filter Preview</h1>
      <Filter onApplyFilter={handleApplyFilter} />
    </div>
  );
}
